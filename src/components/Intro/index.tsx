'use client'
import React from 'react'
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useCursor } from '@/contexts/CursorContext';

// Stella& brand palette, sampled from public/images/logo/Logo.png
const BRAND_NAVY = '#374b73';
const BRAND_PINK = '#FF8197';

const easeOut = [0.16, 1, 0.3, 1] as const;
const revealAt = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: easeOut },
});

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
  // As the hero scrolls away it fades, like the page is drawing focus
  // toward whatever comes next. (It used to also scale down, but that
  // shrank the gradient background away from its own edges — since the
  // background lives inside this same scaled box, that left a visible gap
  // around the hero showing whatever color sits behind it instead.)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0]);

  return (
    <div className='relative -mt-[48px] h-[calc(100vh+48px)] overflow-hidden md:-mt-[60px] md:h-[calc(100vh+60px)]'>
      <motion.div
        style={{ y, opacity: heroOpacity }}
        className='relative flex h-full flex-col items-center justify-center overflow-hidden px-6 md:items-start md:justify-center md:px-16 lg:px-24'
        >
        {/* Own footage as the hero background — trimmed from 1920x1080 at
            12.1Mbps down to 1600px/~1.4Mbps (no audio track needed for a
            muted loop), since the original file was far heavier than a
            page-load-sensitive homepage hero should carry. A navy overlay
            on top (not flat black) keeps the tint on-brand while still
            giving the white headline enough contrast to read. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/videos/hero.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: BRAND_NAVY, opacity: 0.5 }}
        />

        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center md:items-start md:text-left">
          {/* The page's one real <h1> — it was a <p>, while two unrelated
              sub-widgets further down the page (Services, History) used
              <h1> instead. That left the homepage with no true top-level
              heading and two competing ones in the wrong place. */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 56, scale: 0.9, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: easeOut }}
          >
            {/* Once the entrance settles, a slow continuous drift keeps the
                headline from going static — the one persistent motion in
                the hero, not another one-shot effect. */}
            <motion.h1
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1.2 }}
              className="w-full text-[clamp(2.5rem,9vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-tight"
              style={{ color: '#FFFFFF', fontFamily: "'Paperlogy', 'Pretendard', sans-serif" }}
            >
              Stella& Inc.<br />Entertainment
            </motion.h1>
          </motion.div>

          <motion.div {...revealAt(0.12)} className="mt-6 max-w-xl md:mt-8">
            {
              language == 'ko' ?
                <p className='text-lg md:text-xl' style={{ color: '#FFFFFF', opacity: 0.85 }}>현실보다 더 특별한 순간을 선물합니다.<br />
                  스텔라앤은 여러분의 콘텐츠 글로벌 파트너입니다.</p>
                : <p className='text-lg md:text-xl' style={{ color: '#FFFFFF', opacity: 0.85 }}>Beyond reality, into your story.<br />
                  Your world, more extraordinary than ever.</p>
            }
          </motion.div>

          <motion.button
            {...revealAt(0.24)}
            className='mt-8 rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 md:mt-10'
            style={{ backgroundColor: BRAND_PINK, color: '#FDFCFB' }}
            whileHover={{ backgroundColor: BRAND_NAVY, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/contact"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >Contact Us</Link>
          </motion.button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest" style={{ color: BRAND_NAVY, opacity: 0.5 }}>Scroll</span>
            <motion.div
              className="h-8 w-px"
              style={{ background: `linear-gradient(to bottom, ${BRAND_NAVY}80, transparent)` }}
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
