'use client'

import { useLanguage } from '@/contexts/LanguageContext';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Word from '@/components/Mission/Word';
// import Character from '@/components/Mission/Character';

export default function Section() {
    const { language } = useLanguage();
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const paragraph = language == 'en' ? 
                    "We present a moment of joy, beyond the mundane, for a more special moment. Let's find euphoria together."
                  : "우리는 평범한 일상을 넘어, 즐거운 순간으로 더 특별한 순간을 선물합니다. 기쁨을 찾아가는 여정을 함께해요."

    return (
        <div
        ref={container} 
        className='relative flex items-center justify-center h-screen overflow-hidden'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
        <div className='relative z-10 md:p-20 p-5 text-white w-full h-full flex flex-col justify-between'>
            <div className='!md:text-2xl !text-lg self-end uppercase leading-relaxed'>
                 <Word paragraph={paragraph} />
            </div>
            <p className='md:text-[5vw] text-[30px] md:leading-relaxed leading-none uppercase font-bold mb-0 tracking-tight text-balance'>
                {language === 'en' ? 'Beyond reality, into your story' : '평범한 일상을 넘어, 특별한 순간으로'}
            </p>
        </div>
        <div className='fixed top-[-10vh] left-0 h-[120vh] w-full bg-[#f9a8d4]'>
            <motion.div
              style={{ y }}
              className='relative w-full h-full bg-[radial-gradient(ellipse_65%_55%_at_80%_10%,rgba(255,240,236,0.55),transparent_60%)]'
            />
        </div>
        </div>
    )
}