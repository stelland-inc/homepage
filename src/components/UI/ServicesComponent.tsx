import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import BusinessAchievementComponent from './BusinessAchievementComponent';

export default function ServicesComponent() {
    const container = useRef();
    const { language } = useLanguage();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={container}
            className='relative w-full flex items-center justify-center h-screen overflow-hidden'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='relative z-10 p-20 text-white mix-blend-difference 
                             w-full h-full flex flex-col justify-between'>
                <div className="max-w-screen-lg mx-auto w-full text-start">
                    <p className='md:text-6xl text-4xl font-bold mb-4 uppercase'>
                        {language === 'en' ? <>BY THE NUMBERS</> : <>성과</>}
                    </p>
                    <BusinessAchievementComponent />
                </div>
                {/* <p className='w-[50vw] text-[2vw] self-end uppercase mix-blend-difference'>Beauty and quality need the right time to be conceived and realised even in a world that is in too much of a hurry.</p> */}
                {/* <p className='text-[5vw] uppercase mix-blend-difference'>Background Parallax</p> */}
            </div>
            <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
                <motion.div style={{ y }} className='relative w-full h-full'>
                    <Image src='/images/header/about_us.jpg' fill alt="image" style={{ objectFit: "cover" }} />
                </motion.div>
            </div>
        </div>
    )
}