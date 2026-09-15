'use client';
import styles from '@/components/Header/style.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from '@/components/Header/Nav';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
// import { Language } from '@/components/Types';

export default function Header() {
    const [isActive, setIsActive] = useState(false);
    const { language, setLanguage } = useLanguage();
    const pathname = usePathname();
    const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
    // The homepage hero is a dark video background — everything in the
    // header needs to flip to white there, unlike every other page's
    // light background. But that's only true for the hero itself: once
    // you scroll past it into the (light-background) sections below, the
    // header needs to go back to navy just like every other page.
    const isHome = pathname === '/';
    const [pastHero, setPastHero] = useState(false);

    useEffect(() => {
        if (!isHome) return;
        const handleScroll = () => {
            setPastHero(window.scrollY > window.innerHeight * 0.85);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    const showWhite = isHome && !pastHero;

    const handleLanguageChange = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault(); 
        const newLanguage = language === "en" ? "ko" : "en";
        setLanguage(newLanguage);
    }

    return (
        <div className={`${styles.header} sticky top-0 z-50 w-full bg-transparent backdrop-blur-lg supports-[backdrop-filter]:bg-transparent`}>
            {/* [#FFF0EC] */}
            <div className={`${styles.bar} max-w-screen-xl mx-auto md:pb-5 `}>
                <Link href="/">
                    <Image
                        src={showWhite ? "/stelland_logo_white_text.svg" : "/stelland_logo_black.svg"}
                        alt="logo" 
                        width={160} 
                        height={30} 
                        quality={100}
                        priority
                        // ▼ 수정됨: 높이 고정(h-[16px]) 제거하고 w-28 / md:w-40으로 확대 + h-auto 적용
                        className="w-28 md:w-40 h-auto self-center md:mt-0 mt-1" 
                        />
                </Link>
                  
                <div
                    onClick={() => {setIsActive(!isActive)}}
                    className={`lg:hidden ${styles.el}`}
                    style={showWhite ? ({ '--menu-color': '#FFFFFF' } as CSSProperties) : undefined}
                >
                    <div className={`lg:hidden ${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    <div className={`lg:hidden ${styles.label}`}>
                        <motion.p variants={opacity} animate={!isActive ? "open" : "closed"} className='lg:hidden flex'>Menu</motion.p>
                        <motion.p variants={opacity} animate={isActive ? "open" : "closed"} className='lg:hidden flex'>Close</motion.p>
                    </div>
                </div>

                {/* Desktop only now (see .languageContainer's own media
                    query) — moved into the mobile menu's Footer, since this
                    pill's height didn't fit the mobile bar. */}
                <motion.div variants={opacity} animate={!isActive ? "open" : "closed"} className={styles.languageContainer}>
                    {/* <div className='flex flex-row items-center gap-2 uppercase text-red'> */}
                        <Link
                        href='/'
                        onClick={handleLanguageChange}
                        className='relative flex flex-row items-center justify-center rounded-full bg-white/40 px-8 py-3 shadow-[0_8px_30px_rgba(55,75,115,0.18)] backdrop-blur-md'>
                          <Image
                            src='/globe.svg'
                            height={20}
                            width={20}
                            alt='globe icon'
                            // globe.svg is a fixed gray (#666) fill baked into the
                            // file, so a CSS filter is what flips it to white on
                            // the homepage instead of needing a second asset.
                            className={`absolute left-3 w-4 h-4 md:w-5 md:h-5 ${showWhite ? 'brightness-0 invert' : ''}`}
                            />
                           <p style={{ marginLeft: '14px', color: showWhite ? '#FFFFFF' : '#374B73' }}> {language === "en" ? "ENG" : "KR"} </p>
                        </Link>
                    {/* </div> */}
                </motion.div>
             
            </div>
            <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>
            <AnimatePresence mode="wait">
                {isActive && <Nav closeMenu={() => setIsActive(false)}/>}
            </AnimatePresence>

        <div className='max-w-screen-xl mx-auto lg:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <ul className={`flex flex-row items-center gap-10 uppercase rounded-full bg-white/40 px-10 py-3 shadow-[0_8px_30px_rgba(55,75,115,0.18)] backdrop-blur-md ${showWhite ? 'text-white' : 'text-[#374B73]'}`}>
                        <li>
                            <Link href="/about" className={`transition-colors hover:text-[#FF8197] ${isCurrent('/about') ? 'text-[#FF8197] font-bold' : ''}`}>About</Link>
                        </li>
                        <li>
                            <Link href="/business" className={`transition-colors hover:text-[#FF8197] ${isCurrent('/business') ? 'text-[#FF8197] font-bold' : ''}`}>Business</Link>
                        </li>
                        <li>
                            <Link href="/news" className={`transition-colors hover:text-[#FF8197] ${isCurrent('/news') ? 'text-[#FF8197] font-bold' : ''}`}>News</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`transition-colors hover:text-[#FF8197] ${isCurrent('/contact') ? 'text-[#FF8197] font-bold' : ''}`}>Contact</Link>
                        </li>
                </ul>
            </div>
        </div>
    )
}