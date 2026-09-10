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
    <div
      className='h-screen overflow-hidden p-3 md:p-5'
      style={{
        backgroundColor: '#FFF8F3',
        backgroundImage: 'radial-gradient(rgba(55,75,115,0.10) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      <motion.div
        style={{ y, opacity: heroOpacity }}
        className='relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[1.75rem] px-6 md:items-start md:justify-center md:rounded-[2.5rem] md:px-16 lg:px-24'
        >
        {/* nicepay.webflow.io's hero background, in our own colors: a pale
            dotted grid with a few soft, blurred color blobs glowing over it
            — rebuilt with plain CSS gradients (not their actual image
            assets) since it's their look we're borrowing, not their file. */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: '#FFF8F3',
            backgroundImage: `
              radial-gradient(rgba(55,75,115,0.10) 1px, transparent 1px),
              radial-gradient(ellipse 55% 45% at 78% 20%, rgba(255,129,151,0.4), transparent 70%),
              radial-gradient(ellipse 50% 42% at 22% 82%, rgba(255,207,164,0.45), transparent 70%),
              radial-gradient(ellipse 42% 36% at 62% 88%, rgba(255,129,151,0.25), transparent 70%)
            `,
            backgroundSize: '18px 18px, cover, cover, cover',
            backgroundRepeat: 'repeat, no-repeat, no-repeat, no-repeat',
          }}
        />

        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center md:items-start md:text-left">
          {/* The page's one real <h1> — it was a <p>, while two unrelated
              sub-widgets further down the page (Services, History) used
              <h1> instead. That left the homepage with no true top-level
              heading and two competing ones in the wrong place. */}
          <motion.h1
            {...revealAt(0)}
            className="w-full text-[clamp(2rem,7.5vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-tight"
            style={{ color: BRAND_NAVY }}
          >
            Stella& Inc.<br />Entertainment
          </motion.h1>

          <motion.div {...revealAt(0.12)} className="mt-6 max-w-xl md:mt-8">
            {
              language == 'ko' ?
                <p className='text-lg md:text-xl' style={{ color: BRAND_NAVY, opacity: 0.75 }}>현실보다 더 특별한 순간을 선물합니다.<br />
                  스텔라앤은 여러분의 콘텐츠 글로벌 파트너입니다.</p>
                : <p className='text-lg md:text-xl' style={{ color: BRAND_NAVY, opacity: 0.75 }}>Beyond reality, into your story.<br />
                  Your world, more extraordinary than ever.</p>
            }
          </motion.div>

          <motion.button
            {...revealAt(0.24)}
            className='mt-8 rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 md:mt-10'
            style={{ backgroundColor: BRAND_NAVY, color: '#FDFCFB' }}
            whileHover={{ backgroundColor: BRAND_PINK, scale: 1.04 }}
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
