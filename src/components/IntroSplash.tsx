'use client'

import { useEffect, useRef, useState } from 'react';

// stelland_logo_black.svg has 13 letterform/mark paths as direct children
// of the root <svg>, but NOT split into a first-N / last-M block — the
// star is drawn first (2 stacked shapes for its two-tone fill) and again
// at the end (4 more small accent shapes), with the 7 wordmark letters
// sandwiched in between. Verified by rendering each path in an isolated
// color and reading getBBox() — don't re-guess this from translate() X
// offsets alone, it's misleading (two star paths sit at translate x=420,
// which looks letter-ish next to the star's other translate values).
const STAR_PATH_INDICES = [0, 1, 9, 10, 11, 12];
const WORDMARK_PATH_INDICES = [2, 3, 4, 5, 6, 7, 8];
const PATH_COUNT = STAR_PATH_INDICES.length + WORDMARK_PATH_INDICES.length;
const LOGO_VIEWBOX_W = 2457;
const LOGO_VIEWBOX_H = 504;
// Shown once per browser session — set the moment the exit finishes, not
// on mount, so a refresh mid-animation still shows it again.
const SESSION_KEY = 'stelland_intro_shown';

const DRAW_DURATION = 1300;
const STAGGER = 55;
const HOLD = 350;
// Star cutout + zoom exit: the star's interior turns transparent — a
// window onto the real page — and that window grows until it swallows
// the screen. The growth is animated on the cutout shape itself (inside
// the mask), not via a CSS transform on the masked element — a transform
// on the masked element does NOT scale an already-applied mask's
// geometry, it only moves/scales the already-composited (torn) result,
// which left the hole stuck at its original size no matter the scale.
const EXIT = 950;
const STAR_GROW_SCALE = 40;

// A plain <style> tag (not styled-jsx) — styled-jsx's scoped :global()
// selectors don't reliably attach to markup injected via
// dangerouslySetInnerHTML across re-renders, which silently dropped the
// stroke-draw animation. Plain CSS text sidesteps that.
const INTRO_CSS = `
  .intro-logo svg { width: 100%; height: auto; overflow: visible; }
  .intro-logo path {
    fill: none;
    stroke: #ffffff;
    stroke-width: 12;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 8000;
    stroke-dashoffset: 8000;
    animation: intro-draw ${DRAW_DURATION}ms ease-out forwards;
  }
  ${Array.from({ length: PATH_COUNT })
    .map((_, i) => `.intro-logo path:nth-child(${i + 1}) { animation-delay: ${i * STAGGER}ms; }`)
    .join('\n  ')}
  /* Wordmark letters also wash in a soft fill behind the drawn outline —
     the star mark stays outline-only. */
  ${WORDMARK_PATH_INDICES
    .map(
      (i) =>
        `.intro-logo path:nth-child(${i + 1}) { fill: #ffffff; animation-name: intro-draw, intro-fill; animation-duration: ${DRAW_DURATION}ms, ${DRAW_DURATION + 500}ms; }`
    )
    .join('\n  ')}
  /* The star's accent shapes are much smaller than the wordmark, so the
     wordmark's stroke width would visually swallow them and read as a
     solid fill even though fill stays none — give the star a thinner
     outline of its own. */
  ${STAR_PATH_INDICES.map((i) => `.intro-logo path:nth-child(${i + 1}) { stroke-width: 7; }`).join('\n  ')}
  @keyframes intro-draw {
    to { stroke-dashoffset: 0; }
  }
  @keyframes intro-fill {
    0%, 55% { fill-opacity: 0; }
    100% { fill-opacity: 1; }
  }
`;

// Matches the grain on zero.university: a small canvas of random
// per-pixel gray static at low, near-uniform alpha, upscaled with
// image-rendering:pixelated for a chunky film-grain look, blended with
// color-dodge so it brightens the base color instead of just dulling it
// like a flat opacity overlay would.
function paintNoise(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width, height } = canvas;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 255;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 22;
  }
  ctx.putImageData(imageData, 0, 0);
}

export default function IntroSplash() {
  const [svgMarkup, setSvgMarkup] = useState('');
  const [starPathsMarkup, setStarPathsMarkup] = useState('');
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [starRect, setStarRect] = useState<{ x: number; y: number; scale: number } | null>(null);
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current) paintNoise(canvasRef.current);
  }, [visible]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let cancelled = false;
    fetch('/stelland_logo_black.svg')
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        // The source file has no viewBox, just fixed width/height — add one
        // so the logo scales with CSS instead of clipping at native size.
        const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
        const svgEl = doc.documentElement;
        svgEl.setAttribute('viewBox', `0 0 ${LOGO_VIEWBOX_W} ${LOGO_VIEWBOX_H}`);
        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');
        setSvgMarkup(new XMLSerializer().serializeToString(svgEl));

        // Duplicate just the star's paths, filled solid black, as the
        // cutout shape for the exit mask.
        const allPaths = Array.from(svgEl.querySelectorAll('path'));
        const starMarkup = STAR_PATH_INDICES.map((i) => {
          const p = allPaths[i];
          const d = p.getAttribute('d');
          const transform = p.getAttribute('transform');
          return `<path d="${d}" transform="${transform ?? ''}" fill="#000"/>`;
        }).join('');
        setStarPathsMarkup(starMarkup);

        setVisible(true);
        document.body.style.overflow = 'hidden';
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Once the logo box has actually been laid out, measure where it sits
  // on screen so the star cutout mask (built in raw pixels, not relative
  // units) lines up with the drawn star exactly.
  useEffect(() => {
    if (!visible || !logoRef.current) return;
    const measure = () => {
      const rect = logoRef.current?.getBoundingClientRect();
      if (!rect) return;
      setStarRect({ x: rect.left, y: rect.top, scale: rect.width / LOGO_VIEWBOX_W });
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const totalDraw = DRAW_DURATION + PATH_COUNT * STAGGER;
    const exitTimer = setTimeout(() => setExiting(true), totalDraw + HOLD);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      sessionStorage.setItem(SESSION_KEY, '1');
    }, totalDraw + HOLD + EXIT);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  if (!visible) return null;

  const maskReady = starRect && viewport;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#FFAFBD]"
      style={maskReady ? { maskImage: 'url(#intro-star-hole)', WebkitMaskImage: 'url(#intro-star-hole)' } : undefined}
      aria-hidden
    >
      <style dangerouslySetInnerHTML={{ __html: INTRO_CSS }} />
      {maskReady && (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            {/* maskUnits="userSpaceOnUse" needs real pixel numbers here —
                percentages resolve against this host <svg>'s own 0x0
                viewport (there's no viewBox), which silently zeroes out
                the whole mask region and drops the cutout entirely. */}
            <mask id="intro-star-hole" maskUnits="userSpaceOnUse" x="0" y="0" width={viewport.w} height={viewport.h}>
              <rect x="0" y="0" width={viewport.w} height={viewport.h} fill="#fff" />
              <g transform={`translate(${starRect.x} ${starRect.y}) scale(${starRect.scale})`}>
                <g
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    transform: exiting ? `scale(${STAR_GROW_SCALE})` : 'scale(1)',
                    transition: `transform ${EXIT}ms ease-in`,
                  }}
                  dangerouslySetInnerHTML={{ __html: starPathsMarkup }}
                />
              </g>
            </mask>
          </defs>
        </svg>
      )}
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ imageRendering: 'pixelated', mixBlendMode: 'color-dodge' }}
      />
      <div
        ref={logoRef}
        className="intro-logo relative w-[54vw] max-w-[480px] min-w-[220px] transition-opacity"
        style={{ opacity: exiting ? 0 : 1, transitionDuration: `${EXIT}ms` }}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    </div>
  );
}
