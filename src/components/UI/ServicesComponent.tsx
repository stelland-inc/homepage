import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Shield, Lock, Blocks } from "lucide-react";
import BusinessAchievementComponent from './BusinessAchievementComponent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ServicesComponent() {
    const container = useRef();
    const services = useRef();
    const { language } = useLanguage();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(services.current, 
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: services.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);
    

    const features = [
        {
            icon: Shield,
            title: "IP management",
            title_ko: "IP 매니지먼트",
            description: "글로벌 수퍼 오리지널 IP 수급과 매니지먼트를 위해 최적화된 프로세스를 제공합니다.",
        },
        {
            icon: Lock,
            title: "Content Platform",
            title_ko: "컨텐츠 플랫폼",
            description: "웹툰, 웹소설, 영상 등 다양한 컨텐츠를 플랫폼에 연동하여 소비자에게 제공합니다.",
        },
        {
            icon: Blocks,
            title: "Global Distribution & Localization",
            title_ko: "글로벌 유통 & 현지화",
            description: "글로벌 컨텐츠 유통 및 특화 번역 엔진 솔루션을 활용하여 원스탑으로 제공합니다.",
        },
        {
            icon: Blocks,
            title: "Creator Incubation",
            title_ko: "크리에이터 인큐베이션",
            description: "글로벌 크리에이터 인큐베이션 프로그램을 통해 크리에이터를 발굴하고 성장시킵니다.",
        },
    ]

    return (
        <>
            <div ref={services} className="md:max-w-screen-lg w-full mx-auto md:p-0 p-5">
                <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase md:mt-0 mt-40">
                    {language === 'en' ? <>SERVICE</> : <>서비스</>}
                </h2>
                <section className="md:max-w-screen-lg w-full mx-auto space-y-16">
                    <div className="grid gap-8 md:grid-cols-4 mt-10">
                        {features.map((feature) => (
                            <div key={feature.title} className="space-y-4 rounded-lg border p-6">
                                <div className="inline-flex rounded-full bg-[#FEF0EC] bg-primary/10 p-2 text-primary">
                                    <feature.icon size={20} className="" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    {language === 'en' ? feature.title : feature.title_ko}
                                </h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <div className="md:h-[50vh] h-[10vh]"></div>
            <div
                ref={container}
                className='relative w-full flex items-center justify-center h-fit overflow-hidden'
                style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
            >
                <div className='relative z-10 md:p-20 p-10 text-white mix-blend-difference 
                             w-full h-full flex flex-col justify-between'>
                    <div className="max-w-screen-lg mx-auto w-full text-start">
                        <p className='md:text-6xl text-lg font-bold mb-4 uppercase'>
                            {language === 'en' ? <>BY THE NUMBERS</> : <>성과</>}
                        </p>
                        <BusinessAchievementComponent />
                    </div>

                </div>
                <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
                    <motion.div style={{ y }} className='relative w-full h-full'>
                        <Image src='/images/header/about_us.jpg' fill alt="image" style={{ objectFit: "cover" }} />
                    </motion.div>
                </div>
            </div>
        </>
    )
}