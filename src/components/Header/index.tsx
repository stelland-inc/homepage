'use client';
import styles from '@/components/Header/style.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from '@/components/Header/Nav';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
// import { Language } from '@/components/Types';

export default function Header() {
    const [isActive, setIsActive] = useState(false);
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault(); 
        const newLanguage = language === "en" ? "ko" : "en";
        setLanguage(newLanguage);
        console.log("Language changed to", newLanguage);
    }

    return (
        <div className={`${styles.header} sticky top-0 z-50 w-full bg-transparent backdrop-blur-lg supports-[backdrop-filter]:bg-transparent`}>
            {/* [#FFF0EC] */}
            <div className={`${styles.bar} max-w-screen-xl mx-auto md:pb-5 `}>
                <Link href="/">
                    <Image 
                        src="/stelland_logo_black.svg" 
                        alt="logo" 
                        width={128} 
                        height={16} 
                        quality={100}
                        priority
                        className="w-20 h-auto md:w-[100px] md:h-[16px] self-center md:mt-0 mt-1" 
                        />
                </Link>
                  
                <div onClick={() => {setIsActive(!isActive)}} className={`md:hidden ${styles.el}`}>
                    <div className={`md:hidden ${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    <div className={`md:hidden ${styles.label}`}>
                        <motion.p variants={opacity} animate={!isActive ? "open" : "closed"} className='md:hidden flex'>Menu</motion.p>
                        <motion.p variants={opacity} animate={isActive ? "open" : "closed"} className='md:hidden flex'>Close</motion.p>
                    </div>
                </div>

                <motion.div variants={opacity} animate={!isActive ? "open" : "closed"} className={styles.languageContainer}>
                    {/* <div className='flex flex-row items-center gap-2 uppercase text-red'> */}
                        <Link 
                        href='/' 
                        onClick={handleLanguageChange} 
                        className='flex flex-row items-center gap-2'>
                          <Image 
                            src='/globe.svg' 
                            height={20} 
                            width={20} 
                            alt='globe icon' 
                            className='w-4 h-4 md:w-5 md:h-5'
                            />
                           <p> {language === "en" ? "ENG" : "KOR"} </p>
                        </Link> 
                    {/* </div> */}
                </motion.div>
             
            </div>
            <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>
            <AnimatePresence mode="wait">
                {isActive && <Nav closeMenu={() => setIsActive(false)}/>}
            </AnimatePresence>

        <div className='max-w-screen-xl mx-auto md:block hidden absolute top-4 left-1/2 transform -translate-x-1/2'>
            <ul className={`flex flex-row items-center gap-10 uppercase  `}>
                        <li>
                            <Link href="/about" className='hover:opacity-50'>About</Link>
                        </li>
                        <li>
                            <Link href="/business" className='hover:opacity-50'>Business</Link>
                        </li>
                        <li>
                            <Link href="/news" className='hover:opacity-50'>News</Link>
                        </li>
                        <li>
                            <Link href="/contact" className='hover:opacity-50'>Contact</Link>
                        </li>
                </ul>
            </div>
        </div>
    )
}