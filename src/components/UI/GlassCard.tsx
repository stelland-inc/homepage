'use client'

import { ReactNode, RefObject, useEffect, useId, useRef, useState } from 'react';

const PAD = 24; // sampling margin around the card so edge displacement has real pixels to pull from

function clamp255(v: number) {
    return v < 0 ? 0 : v > 255 ? 255 : v;
}

// Same SDF-lens displacement map as GlassButton (see that file for the full
// writeup) — a rounded-rect glass bevel that bends the edge inward with a
// soft falloff while the centre stays flat.
function buildLensMap(mapW: number, mapH: number, lensW: number, lensH: number, radius: number, rim: number, curve: number, feather: number) {
    const canvas = document.createElement('canvas');
    canvas.width = mapW;
    canvas.height = mapH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const img = ctx.createImageData(mapW, mapH);
    const px = img.data;
    const hx = lensW / 2, hy = lensH / 2;
    const sdf = (x: number, y: number) => {
        const qx = Math.abs(x - mapW / 2) - (hx - radius);
        const qy = Math.abs(y - mapH / 2) - (hy - radius);
        const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
        return Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - radius;
    };
    for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            const cx = x + 0.5, cy = y + 0.5;
            const s = sdf(cx, cy);
            const gx = sdf(cx + 1, cy) - sdf(cx - 1, cy);
            const gy = sdf(cx, cy + 1) - sdf(cx, cy - 1);
            const len = Math.hypot(gx, gy) || 1;
            const nx = gx / len, ny = gy / len;
            const span = s < 0 ? rim + feather : rim;
            let amt = Math.max(0, 1 - Math.abs(s) / span);
            amt = amt * amt * amt * (amt * (amt * 6 - 15) + 10);
            amt = Math.pow(amt, curve);
            const i = (y * mapW + x) * 4;
            px[i] = clamp255(Math.round(127.5 - nx * amt * 127 * 0.8));
            px[i + 1] = clamp255(Math.round(127.5 - ny * amt * 127 * 0.8));
            px[i + 2] = 128;
            px[i + 3] = 255;
        }
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL('image/png');
}

type Geometry = {
    mapUrl: string;
    mapW: number;
    mapH: number;
    scale: number;
    offsetX: number;
    offsetY: number;
    sourceW: number;
    sourceH: number;
};

/**
 * A glassmorphism card using the same SDF-lens refraction as GlassButton,
 * but bending a plain CSS-gradient element instead of video — no media
 * asset needed, and much lighter than an autoplaying video for a page
 * where load performance matters (the homepage hero).
 *
 * `sourceRef` should point to the decorative gradient div sitting behind
 * the card; this component measures it, crops a card-sized window aligned
 * to its own position, and refracts that through the lens filter. Without
 * a measured source it falls back to plain frosted glass — same
 * fail-safe as GlassButton.
 */
export default function GlassCard({
    children,
    className = '',
    sourceRef,
}: {
    children: ReactNode;
    className?: string;
    /** Ref to the decorative background element to refract. Omit to always
     * use the plain frosted-glass fallback (e.g. floating over a video or
     * WebGL canvas, which this component can't sample as a CSS background). */
    sourceRef?: RefObject<HTMLDivElement | null>;
}) {
    const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
    const cardRef = useRef<HTMLDivElement | null>(null);
    const versionRef = useRef(0);
    const [geo, setGeo] = useState<Geometry | null>(null);
    const [filterId, setFilterId] = useState('');

    useEffect(() => {
        const card = cardRef.current;
        const source = sourceRef?.current;
        if (!card || !source) return;

        const rebuild = () => {
            const cRect = card.getBoundingClientRect();
            const sRect = source.getBoundingClientRect();
            if (cRect.width === 0 || cRect.height === 0) return;

            const boxW = cRect.width, boxH = cRect.height;
            const radius = 28;
            const rim = 4;
            const feather = Math.min(28, Math.max(10, boxH * 0.22));
            const scale = Math.min(60, Math.max(24, boxH * 0.5));
            const mapW = Math.round(boxW + PAD * 2);
            const mapH = Math.round(boxH + PAD * 2);
            const mapUrl = buildLensMap(mapW, mapH, boxW, boxH, radius, rim, 1.8, feather);
            if (!mapUrl) return;

            versionRef.current += 1;
            setFilterId(`glass-card-${uid}-${versionRef.current}`);
            setGeo({
                mapUrl,
                mapW,
                mapH,
                scale,
                offsetX: cRect.left - sRect.left,
                offsetY: cRect.top - sRect.top,
                sourceW: sRect.width,
                sourceH: sRect.height,
            });
        };

        rebuild();
        const ro = new ResizeObserver(rebuild);
        ro.observe(card);
        ro.observe(source);
        window.addEventListener('resize', rebuild);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', rebuild);
        };
    }, [sourceRef, uid]);

    const hasRefraction = !!(geo && filterId);
    const sourceBg = sourceRef?.current?.style.backgroundImage;

    return (
        <>
            {hasRefraction && (
                <svg width="0" height="0" className="absolute" aria-hidden>
                    <defs>
                        <filter
                            id={filterId}
                            x="0" y="0" width="100%" height="100%"
                            filterUnits="objectBoundingBox"
                            colorInterpolationFilters="sRGB"
                        >
                            <feImage href={geo.mapUrl} x="0" y="0" width={geo.mapW} height={geo.mapH} preserveAspectRatio="none" result="map" />
                            <feDisplacementMap in="SourceGraphic" in2="map" scale={geo.scale} xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </defs>
                </svg>
            )}

            <div
                ref={cardRef}
                className={`relative isolate overflow-hidden rounded-[28px] ${className}`}
                style={{
                    boxShadow:
                        'inset 0 1.5px 2px rgba(255,255,255,0.9), inset 0 -1px 1px rgba(0,0,0,0.12), inset 0 -16px 26px -10px rgba(0,0,0,0.1), inset 0 14px 22px -10px rgba(255,255,255,0.4), 0 20px 44px rgba(55,75,115,0.18)',
                }}
            >
                {hasRefraction ? (
                    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                        <div
                            className="absolute"
                            style={{
                                width: geo.mapW,
                                height: geo.mapH,
                                left: -PAD,
                                top: -PAD,
                                filter: 'blur(1.5px)',
                            }}
                        >
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ filter: `url(#${filterId})` }}
                            >
                                <div
                                    className="absolute pointer-events-none"
                                    style={{
                                        width: geo.sourceW,
                                        height: geo.sourceH,
                                        left: -(geo.offsetX - PAD),
                                        top: -(geo.offsetY - PAD),
                                        backgroundImage: sourceBg,
                                        backgroundSize: 'cover',
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{ background: 'rgba(255,255,255,0.4)', mixBlendMode: 'normal' }}
                        />
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{ background: 'rgba(255,255,255,0.08)', mixBlendMode: 'screen' }}
                        />
                    </div>
                ) : (
                    <div
                        className="absolute inset-0 backdrop-blur-md"
                        style={{ background: 'linear-gradient(165deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.3) 100%)' }}
                    />
                )}

                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{ boxShadow: 'inset 1.5px 1.5px 4px rgba(255,255,255,0.8), inset -2px -2px 6px rgba(0,0,0,0.1)' }}
                />
                <span
                    aria-hidden
                    className="pointer-events-none absolute -top-3 left-1/2 h-14 w-[85%] -translate-x-1/2 rounded-full opacity-70 blur-[3px]"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.9), transparent 75%)' }}
                />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </>
    );
}
