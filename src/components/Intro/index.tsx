'use client'
import React from 'react'
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Image from 'next/image';
import Background from '/public/images/hero/img1.png';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function Intro() {
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end start']
    })

    const { language } = useLanguage();

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
        <motion.div style={{y}} className='relative h-full flex flex-col items-center justify-center'>
          <Image src={Background} fill alt="image" style={{objectFit: "cover"}}/>
           <p className='z-50 md:text-6xl font-medium text-4xl uppercase text-center '>
           <span className=''>Stella& Inc.</span> Entertainment
          </p>
          <div className='z-50 md:text-xl text-xl mt-5 text-center'>
            {  
            language == 'ko' ? 
                              <p className='text-center md:text-2xl text-[18px]'>현실보다 더 특별한 순간을 선물합니다.<br/>
                              스텔라앤은 여러분의 콘텐츠 글로벌 파트너입니다. </p> 
                            : <p className='text-center md:text-2xl text-[18px]'> Beyond reality, into your story. <br /> 
                              Your world, more extraordinary than ever.</p> 
            }
          </div>       
          <button className='z-50 md:text-[14px] text-[14px] bg-black text-white px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-black transition-all duration-300 uppercase'>
            <Link href="/contact">Contact Us</Link>
          </button> 
        </motion.div>
      </div>
    )
}