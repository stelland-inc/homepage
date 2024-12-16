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
                  "Our mission is that to be the realization of your own desires, unlimited growth together, make the dreams come true." 
                  : "우리는 기쁨을 찾아가는 여정, 평범한 일상을 넘어, 즐거운 순간으로 더 특별한 순간을 선물합니다. 여러분의 꿈을 이루어 보세요."

    return (
        <div
        ref={container} 
        className='relative flex items-center justify-center h-screen overflow-hidden'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
        <div className='relative z-10 md:p-20 p-5 text-white w-full h-full flex flex-col justify-between'>
            <div className='!md:text-2xl !text-lg self-end uppercase leading-relaxed'>
                {/*  mix-blend-difference */}
                {/* {language === 'en' ?
                         <>Creative and quality need the right time to be conceived and 
                         realised even in a world that is in too much of a hurry.</> 
                        : <>콘텐츠 크리에이티브와 품질은 적절한 시간에 구상되고 실현되어야 합니다. 당신의 세상에서도 마찬가지입니다.</>} */}

                 <Word paragraph={paragraph} />
            </div>
            <p className='md:text-[5vw] text-[30px] md:leading-relaxed leading-none uppercase font-bold mb-0'> 
                {language === 'en' ? 'REALIZE YOUR DREAM' : '평범한 일상을 넘어, 특별한 순간으로'}
            </p>
        </div>
        <div className='fixed top-[-10vh] left-0 h-[120vh] w-full bg-red-200'>
            {/* bg-red-200  bg-[#f9a8d4] */}
            {/* f9a8d4  */}
            <motion.div style={{y}} className='relative w-full h-full'>
            {/* <Image src={Background} fill alt="image" style={{objectFit: "cover"}}/> */}
            </motion.div>
        </div>
        </div>
    )
}