'use client'

import { useLanguage } from '@/contexts/LanguageContext';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Word from '@/components/Mission/Word';
// import Character from '@/components/Mission/Character';
import styles from '@/components/Intro/style.module.scss';

// Lucide's generic Instagram/Youtube/X icons don't read as the actual
// brand marks — draw the real logos by hand instead (same treatment for
// all three so the row feels like one consistent set).
function InstagramLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className={className} aria-hidden>
            <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
        </svg>
    );
}

function XLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function YoutubeLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

const SOCIAL_LINKS = [
    { href: 'https://www.instagram.com/stelland_official', label: 'Instagram', Icon: InstagramLogo },
    { href: 'https://x.com/stelland_hello', label: 'X', Icon: XLogo },
    { href: 'https://www.youtube.com/channel/UCh8c9JWrTbH4EZbelOdTusA', label: 'YouTube', Icon: YoutubeLogo },
];

export default function Section() {
    const { language } = useLanguage();
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const koreanLines = [
        "우리는 평범한 일상을 넘어,",
        "더 특별한 순간을 선물합니다.",
        "기쁨을 찾아가는 여정을 함께해요",
    ]
    const paragraph = "We present a moment of joy, beyond the mundane, for a more special moment. Let's find euphoria together."

    return (
        <div
        ref={container} 
        className='relative flex items-center justify-center h-screen overflow-hidden'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
        <div className='relative z-10 md:p-20 p-5 w-full h-full flex flex-col justify-between'>
            {/* Glossy liquid-blob — moved down from the hero to anchor this
                closing section instead; a main shape plus two smaller
                echoes of it scattered nearby (different sizes/positions,
                offset animation timing so they don't move in lockstep),
                desktop only. */}
            <div className="pointer-events-none absolute right-[-6%] top-1/2 z-[1] hidden h-[36vw] max-h-[480px] w-[36vw] max-w-[480px] -translate-y-1/2 opacity-85 md:block">
                <div className={styles.heroBlobBounceWrap}>
                    <div className={styles.heroBlob} />
                    <div className={styles.heroBlobShine} />
                </div>
            </div>
            <div className="pointer-events-none absolute right-[22%] top-[12%] z-[1] hidden h-[15vw] max-h-[190px] w-[15vw] max-w-[190px] opacity-75 md:block">
                <div className={styles.heroBlobBounceWrap} style={{ animationDelay: '-1.1s' }}>
                    <div className={`${styles.heroBlob} ${styles.heroBlobNavy}`} style={{ animationDelay: '-5s' }} />
                    <div className={styles.heroBlobShine} style={{ animationDelay: '-3s' }} />
                </div>
            </div>
            <div className="pointer-events-none absolute right-[2%] top-[80%] z-[1] hidden h-[10vw] max-h-[130px] w-[10vw] max-w-[130px] opacity-70 md:block">
                <div className={styles.heroBlobBounceWrap} style={{ animationDelay: '-2.3s' }}>
                    <div className={`${styles.heroBlob} ${styles.heroBlobPeach}`} style={{ animationDelay: '-10s' }} />
                    <div className={styles.heroBlobShine} style={{ animationDelay: '-6s' }} />
                </div>
            </div>

            <div className='relative z-10 md:!text-2xl !text-lg w-full max-w-6xl self-start text-left uppercase leading-relaxed text-white mt-40'>
                {language === 'ko'
                    ? koreanLines.map((line, i) => (
                        <Word key={i} paragraph={line} thin revealOnScroll={false} style={{ padding: '4px 0' }} />
                    ))
                    : <Word paragraph={paragraph} thin revealOnScroll={false} />}
            </div>
            <p className='relative z-10 md:text-[3.6vw] text-[24px] md:leading-relaxed leading-none uppercase font-bold tracking-tight mb-0 text-[#374B73]'>
                {language === 'en' ? 'Beyond reality, into your story' : '평범한 일상을 넘어, 특별한 순간으로'}
            </p>
            <div className='relative z-10 flex items-center gap-5 self-end'>
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    href ? (
                        <Link
                            key={label}
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={label}
                            className='opacity-80 transition-opacity hover:opacity-100'
                        >
                            <Icon className='h-7 w-7 md:h-9 md:w-9' />
                        </Link>
                    ) : null
                ))}
            </div>
        </div>
        <div
            className='fixed top-[-10vh] left-0 h-[120vh] w-full overflow-hidden'
            style={{ backgroundColor: '#FECACA' }}
        >
            {/* oevra.com's material, rebuilt in our own palette: the SAME
                base pink as the footer right below it (not a separate
                #FF8197 slab), with soft blurred shapes drifting slowly
                behind the copy — a navy pool for the white text top-right,
                a warmer peach wash for the navy headline lower-left — plus
                a grain layer, instead of oevra's static green vignette. */}
            {/* Both the blobs and the grain fade out toward the bottom of
                this fixed layer, right where the footer (same flat
                #FECACA, no texture) scrolls up to cover it — so the
                textured surface eases into a plain one instead of the
                footer cutting across it with a hard seam. The fade ends
                at ~92%, not 100%: this box runs -10vh to 110vh, and the
                footer actually starts covering it at the 100vh mark. */}
            <div
                className='absolute inset-0'
                style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 92%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 92%)',
                }}
            >
                <motion.div style={{ y }} className='relative w-full h-full'>
                    <motion.div
                        className='absolute rounded-full blur-3xl'
                        style={{ width: '55%', height: '55%', top: '2%', left: '55%', background: '#374B73', opacity: 0.6 }}
                        animate={{ x: [0, 40, -20, 0], y: [0, -30, 15, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className='absolute rounded-full blur-3xl'
                        style={{ width: '50%', height: '50%', top: '48%', left: '5%', background: '#FFCFA4', opacity: 0.6 }}
                        animate={{ x: [0, -30, 20, 0], y: [0, 20, -25, 0] }}
                        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className='absolute rounded-full blur-3xl'
                        style={{ width: '42%', height: '42%', top: '68%', left: '48%', background: '#374B73', opacity: 0.3 }}
                        animate={{ x: [0, 25, -15, 0], y: [0, -15, 10, 0] }}
                        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
                {/* Film-grain texture — a flat gradient blob reads as a solid
                    color fill; a contrast-boosted noise layer (not just raw
                    turbulence, which stays a muddy gray fog at low opacity)
                    gives it the grainy, slightly-analog surface quality of an
                    actual photographed/filmed gradient instead. */}
                <div
                    className='pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay'
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.05' numOctaves='3' stitchTiles='stitch' result='noise'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='2.6' intercept='-0.8'/%3E%3CfeFuncG type='linear' slope='2.6' intercept='-0.8'/%3E%3CfeFuncB type='linear' slope='2.6' intercept='-0.8'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />
            </div>
        </div>
        </div>
    )
}