'use client'
import React from 'react'
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useCursor } from '@/contexts/CursorContext';

export default function Intro() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  const { language } = useLanguage();
  const { setCursorVariant } = useCursor()
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])


  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"])

  return (
    <div className='h-screen overflow-hidden'>
      <motion.div
        style={{ y }}
        className='flex flex-col items-center justify-center
                   relative h-full py-12 md:py-24 lg:py-32 xl:py-48
                   bg-[#FFF7F3] overflow-hidden'
        >
        {/* Brand-toned ambient light, offset for asymmetry rather than a centered glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_15%,rgba(249,168,212,0.38),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_8%_95%,rgba(255,240,236,0.9),transparent_70%)]" />
        {/* Subtle grain to keep the gradient from feeling flat/digital */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <p className='relative z-10 flex flex-col items-center gap-2 text-center'>
          <span className='text-4xl md:text-6xl font-semibold uppercase tracking-tight text-balance'>
            Stella&amp; Inc.
          </span>
          <span className='text-lg md:text-2xl font-light uppercase tracking-[0.35em] text-neutral-500'>
            Entertainment
          </span>
        </p>
        <div className='relative z-10 mt-6 text-center'>
          {
            language == 'ko' ?
              <p className='mx-auto max-w-md text-center text-[15px] leading-relaxed text-neutral-600 md:text-lg text-balance'>현실보다 더 특별한 순간을 선물합니다.<br />
                스텔라앤은 여러분의 콘텐츠 글로벌 파트너입니다.</p>
              : <p className='mx-auto max-w-md text-center text-[15px] leading-relaxed text-neutral-600 md:text-lg text-balance'>Beyond reality, into your story.<br />
                Your world, more extraordinary than ever.</p>
          }
        </div>
        <button className='relative z-10 mt-8 rounded-full bg-black px-10 py-2.5 text-[13px] uppercase tracking-wide text-white transition-all duration-300 ease-out hover:bg-white hover:text-black hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
          <Link
            href="/contact"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >Contact Us</Link>
        </button>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-neutral-500">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-black/40 to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}