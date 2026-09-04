'use client'
import React from 'react'
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Image from 'next/image';
import Background from '/public/images/hero/img1.png';
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
        // className='relative h-full flex flex-col items-center justify-center'
        className='flex flex-col items-center justify-center 
                   relative h-full py-12 md:py-24 lg:py-32 xl:py-48 
                   bg-gradient-to-br from-blue-100 via-white to-purple-100'
        >
        {/* <Image src={Background} fill alt="image" style={{ objectFit: "cover" }} /> */}

        {/* Brand star mark, abstracted large as the hero's ambient visual anchor */}
        <motion.svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -right-[8%] top-[8%] z-0 h-[55vw] w-[55vw] max-h-[620px] max-w-[620px] opacity-70 blur-[2px] md:opacity-90"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        >
          <path
            d="M50 0 C53 32 68 47 100 50 C68 53 53 68 50 100 C47 68 32 53 0 50 C32 47 47 32 50 0 Z"
            fill="#FFCFA4"
            transform="rotate(20 50 50)"
          />
          <path
            d="M50 0 C53 32 68 47 100 50 C68 53 53 68 50 100 C47 68 32 53 0 50 C32 47 47 32 50 0 Z"
            fill="#FF8197"
          />
        </motion.svg>
        <motion.svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute left-[10%] bottom-[18%] z-0 h-16 w-16 opacity-60 md:h-24 md:w-24"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          <path
            d="M50 0 C53 32 68 47 100 50 C68 53 53 68 50 100 C47 68 32 53 0 50 C32 47 47 32 50 0 Z"
            fill="#FF8197"
          />
        </motion.svg>
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute right-[22%] bottom-[10%] z-0 h-9 w-9 opacity-50 md:h-12 md:w-12">
          <path
            d="M50 0 C53 32 68 47 100 50 C68 53 53 68 50 100 C47 68 32 53 0 50 C32 47 47 32 50 0 Z"
            fill="#FFCFA4"
          />
        </svg>

        <p className='z-50 md:text-6xl font-medium text-4xl uppercase text-center '>
          <span className=''>Stella& Inc.</span> Entertainment
        </p>
        <div className='z-50 md:text-xl text-xl mt-5 text-center'>
          {
            language == 'ko' ?
              <p className='text-center md:text-2xl text-[18px]'>현실보다 더 특별한 순간을 선물합니다.<br />
                스텔라앤은 여러분의 콘텐츠 글로벌 파트너입니다. </p>
              : <p className='text-center md:text-2xl text-[18px]'> Beyond reality, into your story. <br />
                Your world, more extraordinary than ever.</p>
          }
        </div>
        <button className='z-50 md:text-[14px] text-[14px] bg-black text-white px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-black transition-all duration-300 uppercase'>
          <Link
            href="/contact"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >Contact Us</Link>
        </button>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-black/50 to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}