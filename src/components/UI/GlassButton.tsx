'use client'

import { ReactNode, RefObject, useEffect, useId, useRef, useState } from 'react';

const PAD = 20; // sampling margin around the button so the edge displacement has real pixels to pull from, not empty space
const BOOST = 0.8;

function clamp255(v: number) {
    return v < 0 ? 0 : v > 255 ? 255 : v;
}

// Builds a signed-distance-field displacement map for a rounded-rect glass
// lens: the edge bends the image inward with a soft falloff while the
// centre stays flat — the actual shape a real glass bevel refracts light
// into, not the generic wavy noise a feTurbulence map gives you. Ported
// from the SDF-lens technique at https://aave.com/design/building-glass-for-the-web,
// scaled down to button size (no drag/orb/live-tuning — we only rebuild it
// on resize).
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
            amt = amt * amt * amt * (amt * (amt * 6 - 15) + 10); // smootherstep
            amt = Math.pow(amt, curve);
            const i = (y * mapW + x) * 4;
            px[i] = clamp255(Math.round(127.5 - nx * amt * 127 * BOOST));
            px[i + 1] = clamp255(Math.round(127.5 - ny * amt * 127 * BOOST));
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
    boxW: number;
    boxH: number;
    offsetX: number;
    offsetY: number;
    mediaW: number;
    mediaH: number;
};

/**
 * Apple-style Liquid Glass button.
 *
 * Refracts a real crop of the page's own background video through an SDF
 * lens filter, instead of approximating glass with a blurred/tinted
 * overlay. `filter: url(#id)` (not `backdrop-filter`) is what makes this
 * work in Safari, which silently drops an SVG reference inside
 * backdrop-filter — so a clone of the video is positioned behind the
 * button and filtered directly, the same workaround the Aave team used
 * (https://aave.com/design/building-glass-for-the-web), with a fresh
 * filter id on every rebuild to dodge Safari's per-id filter cache.
 *
 * Without `videoRef` (or before its geometry is measured) this falls back
 * to a plain frosted-glass look — no crash, just no refraction.
 */
export default function GlassButton({
    children,
    onClick,
    className = '',
    videoRef,
    videoSrc,
}: {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    /** Ref to the page's background <video> to refract. */
    videoRef?: RefObject<HTMLVideoElement | null>;
    /** Its source — kept separate from the ref since a second, independent
     * <video> element is what actually gets filtered. */
    videoSrc?: string;
}) {
    const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const versionRef = useRef(0);
    const [geo, setGeo] = useState<Geometry | null>(null);
    const [filterId, setFilterId] = useState('');

    useEffect(() => {
        const btn = btnRef.current;
        const media = videoRef?.current;
        if (!btn || !media || !videoSrc) return;

        const rebuild = () => {
            const bRect = btn.getBoundingClientRect();
            const mRect = media.getBoundingClientRect();
            if (bRect.width === 0 || bRect.height === 0) return;

            const boxW = bRect.width, boxH = bRect.height;
            const radius = boxH / 2; // matches rounded-full
            const rim = 3;
            const feather = Math.min(22, Math.max(8, boxH * 0.32));
            const curve = 1.8;
            const scale = Math.min(46, Math.max(18, boxH * 0.85));
            const mapW = Math.round(boxW + PAD * 2);
            const mapH = Math.round(boxH + PAD * 2);
            const mapUrl = buildLensMap(mapW, mapH, boxW, boxH, radius, rim, curve, feather);
            if (!mapUrl) return;

            versionRef.current += 1;
            setFilterId(`glass-lens-${uid}-${versionRef.current}`);
            setGeo({
                mapUrl,
                mapW,
                mapH,
                scale,
                boxW,
                boxH,
                offsetX: bRect.left - mRect.left,
                offsetY: bRect.top - mRect.top,
                mediaW: mRect.width,
                mediaH: mRect.height,
            });
        };

        rebuild();
        const ro = new ResizeObserver(rebuild);
        ro.observe(btn);
        ro.observe(media);
        window.addEventListener('resize', rebuild);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', rebuild);
        };
    }, [videoRef, videoSrc, uid]);

    const hasRefraction = !!(geo && filterId);

    return (
        <>
            <style>{`
                .glass-btn-shine {
                    position: absolute;
                    inset: -40% -20%;
                    background: linear-gradient(75deg, transparent 40%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.55) 52%, transparent 60%);
                    transform: translateX(-140%);
                    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
                    pointer-events: none;
                }
                .glass-btn:hover .glass-btn-shine { transform: translateX(140%); }
            `}</style>

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

            <button
                ref={btnRef}
                type="button"
                onClick={onClick}
                className={`glass-btn group relative isolate overflow-hidden rounded-full px-14 py-4 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] ${className}`}
                style={{
                    // Neutral black/white shadow values — a navy-tinted
                    // shadow (rgba(10,20,35,*), rgba(20,40,60,*)) casts a
                    // navy tint on the whole button regardless of what's
                    // refracting behind it, which reads as a color bug
                    // rather than glass.
                    boxShadow:
                        'inset 0 1.5px 2px rgba(255,255,255,0.95), inset 0 -1px 1px rgba(0,0,0,0.22), inset 0 -16px 22px -6px rgba(0,0,0,0.16), inset 0 14px 20px -8px rgba(255,255,255,0.35), 0 14px 36px rgba(0,0,0,0.28)',
                }}
            >
                {hasRefraction ? (
                    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                        {/* Blur lives on this wrapper, separate from the url()
                            filter below — Safari over-blurs a chained
                            blur+displacement in one filter string. */}
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
                            {/* The actual filtered element: a small padded
                                window, not the whole video, so the SVG
                                filter region stays button-sized. */}
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ filter: `url(#${filterId})` }}
                            >
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    src={videoSrc}
                                    className="absolute pointer-events-none object-cover"
                                    style={{
                                        width: geo.mediaW,
                                        height: geo.mediaH,
                                        left: -(geo.offsetX - PAD),
                                        top: -(geo.offsetY - PAD),
                                    }}
                                />
                            </div>
                        </div>
                        {/* Glass colour — the button can land anywhere on
                            the video (here, a dark navy jacket), and
                            refracting that footage untouched just makes the
                            glass as dark as whatever's behind it. A real
                            frosted pane pushes back toward white regardless
                            of the scene, so this brightens the refraction
                            rather than tinting it toward the backdrop. */}
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{ background: 'rgba(255,255,255,0.34)', mixBlendMode: 'normal' }}
                        />
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{ background: 'rgba(255,255,255,0.1)', mixBlendMode: 'screen' }}
                        />
                    </div>
                ) : (
                    // No measured geometry yet (or no videoRef supplied) —
                    // plain frosted glass, no refraction, so the button
                    // never renders broken.
                    <div
                        className="absolute inset-0 backdrop-blur-md"
                        style={{ background: 'linear-gradient(165deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)' }}
                    />
                )}

                {/* Specular bevel — a light source from the top-left, same
                    idea as Aave's .lens-glint but as an inset box-shadow. */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{ boxShadow: 'inset 1.5px 1.5px 4px rgba(255,255,255,0.75), inset -2px -2px 5px rgba(0,0,0,0.18)' }}
                />
                {/* Big soft highlight — the curved top surface catching
                    ambient light, like the inside of a glass dome. */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute -top-2 left-1/2 h-10 w-[85%] -translate-x-1/2 rounded-full opacity-80 blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.85), transparent 75%)' }}
                />
                {/* Small hot-spot — a tighter, brighter glint near the
                    upper-left, the way a single light source reflects off
                    a curved rim rather than washing the whole surface. */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute left-[14%] top-[10%] h-3 w-8 rounded-full opacity-90 blur-[3px]"
                    style={{ background: 'rgba(255,255,255,0.95)' }}
                />
                {/* Diagonal shimmer that sweeps across on hover — the one
                    moving highlight, not a static gradient, so it reads as
                    an actual reflective surface rather than a paint job. */}
                <span aria-hidden className="glass-btn-shine" />
                <span
                    className="relative z-10 whitespace-nowrap text-base font-semibold uppercase tracking-wide text-white"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}
                >
                    {children}
                </span>
            </button>
        </>
    );
}
