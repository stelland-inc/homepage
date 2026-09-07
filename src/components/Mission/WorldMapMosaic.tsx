'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Stella& brand palette, matching Hero/Intro.
const BRAND_NAVY = '#374b73'
const BRAND_PINK = '#FF8197'
const BRAND_PEACH = '#FFCFA4'

// Interpolates between two "#rrggbb" hex colors at t in [0,1] — used to
// give the land tiles a smooth gradient wash instead of flat per-region
// blocks of color.
function lerpHex(hexA: string, hexB: string, t: number) {
  const a = [1, 3, 5].map((i) => parseInt(hexA.slice(i, i + 2), 16))
  const b = [1, 3, 5].map((i) => parseInt(hexB.slice(i, i + 2), 16))
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t))
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

// A tiny deterministic PRNG (not Math.random) so tile size/opacity jitter
// is stable across re-renders.
function seededRandom(seed: number) {
  let t = seed
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const STEP = 1
const GRID_W = 160
const GRID_H = 60

type Tile = { key: number; x: number; y: number; size: number; opacity: number; fill: string }
type Dot = { key: number; x: number; y: number }

export default function WorldMapMosaic() {
  const [tiles, setTiles] = useState<Tile[] | null>(null)
  const [bgDots, setBgDots] = useState<Dot[] | null>(null)

  useEffect(() => {
    let cancelled = false
    // Rasterize the real world-map outline (CC-BY-SA, Al MacDonald /
    // Fritz Lekschas — github.com/flekschas/simple-world-map) onto an
    // offscreen canvas, then sample it into our dot grid. This replaces an
    // earlier hand-drawn ellipse approximation that didn't read as a real
    // map — actual country silhouettes now decide land vs. ocean.
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      const cw = 400
      const ch = Math.round((cw * img.height) / img.width)
      canvas.width = cw
      canvas.height = ch
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, cw, ch)
      const data = ctx.getImageData(0, 0, cw, ch).data

      const isLand = (px: number, py: number) => {
        const x = Math.min(cw - 1, Math.max(0, Math.round(px)))
        const y = Math.min(ch - 1, Math.max(0, Math.round(py)))
        return data[(y * cw + x) * 4 + 3] > 90
      }

      const rand = seededRandom(20260907)
      const nextTiles: Tile[] = []
      const nextDots: Dot[] = []
      let key = 0
      let bgKey = 0
      for (let gy = 0; gy <= GRID_H; gy += STEP) {
        for (let gx = 0; gx <= GRID_W; gx += STEP) {
          const px = (gx / GRID_W) * cw
          const py = (gy / GRID_H) * ch
          if (!isLand(px, py)) {
            nextDots.push({ key: bgKey++, x: gx, y: gy })
            continue
          }
          const t = (gx / GRID_W) * 0.7 + (gy / GRID_H) * 0.3
          nextTiles.push({
            key: key++,
            x: gx,
            y: gy,
            size: 0.42 + rand() * 0.14,
            opacity: 0.78 + rand() * 0.22,
            fill: lerpHex(BRAND_PEACH, lerpHex(BRAND_PINK, BRAND_NAVY, Math.max(0, (t - 0.45) * 1.8)), Math.min(1, t * 1.5)),
          })
        }
      }
      setTiles(nextTiles)
      setBgDots(nextDots)
    }
    img.src = '/world-map-source.svg'
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className="pointer-events-none absolute -right-[8%] top-1/2 w-[82%] -translate-y-1/2 overflow-hidden md:-right-[10%] md:w-[74%]"
      aria-hidden
      style={{
        // Match the box's aspect ratio to the viewBox (160:60) so "slice"
        // just fills it — a taller box with a mismatched ratio was forcing
        // a huge zoom-and-crop, which is why the dots looked oddly oversized.
        aspectRatio: '160 / 60',
        // A soft fade only right at this box's own left edge, so it blends
        // into the text column instead of a hard vertical cut.
        maskImage: 'linear-gradient(to right, transparent 0%, black 18%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%)',
      }}
    >
      <svg
        viewBox="0 0 160 60"
        preserveAspectRatio="xMaxYMid slice"
        className="h-full w-full overflow-visible"
      >
        {/* Faint static ocean grid — plain squares, cheap even by the
            thousand since none of them carry their own animation. */}
        {bgDots?.map((d) => (
          <rect key={`bg${d.key}`} x={d.x - 0.16} y={d.y - 0.16} width={0.32} height={0.32} fill={BRAND_NAVY} fillOpacity={0.08} />
        ))}
        {/* Land tiles: one shared reveal animation on the whole group instead
            of a separate viewport observer per dot, which is what made
            thousands of them expensive to mount. */}
        <motion.g
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '80px 30px' }}
        >
          {tiles?.map((t) => (
            <rect
              key={t.key}
              x={t.x - t.size / 2}
              y={t.y - t.size / 2}
              width={t.size}
              height={t.size}
              rx={0.06}
              fill={t.fill}
              fillOpacity={t.opacity}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  )
}
