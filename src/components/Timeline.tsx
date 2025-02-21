"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useLanguage } from '@/contexts/LanguageContext';
import Image from "next/image";

const timelineEvents = [
    {
        year: 2021,
        title: "레진코믹스 지정 현지화 업체",
        title_en: 'Designated Localization Company for Lezhin Comics',
        description: "비브로스팀 지정 현지화 업체",
        details:
            "Designated Localization Company for VBros Team",
    },
    {
        year: 2022,
        title: "스텔라앤 설립",
        title_en: 'Stella& Inc. Established',
        description: "고렘 팩토리 지정 현지화 업체, 브리드 컴퍼니 지정 현지화 업체, 락킨 코리아 지정 현지화 업체",
        details:
            "Designated Localization Company for Golem Factory, Designated Localization Company for Breed Company, Designated Localization Company for Rockin Korea",
    },
    {
        year: 2023,
        title: "해외 유통 사업 개시",
        title_en: 'Global Distribution Business Started',
        description: "케나즈 지정 현지화 업체, 카카오 지정 현지화 업체, AI 현지화 솔루션 개발, 웹툰화 사업 개시, IP 개발 사업 개시",
        details:
            "Designated Localization Company for KENAS, Designated Localization Company for Kakao, AI Localization Solution Development, Webtoon Business Started, IP Development Business Started",
    },
    {
        year: 2024,
        title: "해외 파트너사 확대",
        title_en: 'Global Partner Expansion',
        description: "아마존 재팬 지정 현지화 업체, 카카오 태국법인 지정 현지화 업체, 메디방, 라쿠텐 일본 사업 채결",
        details:
            "Designated Localization Company for Amazon Japan, Designated Localization Company for Kakao Thailand, MediBang, Rakuten Japan Business Settlement",
    },
    {
        year: 2025,
        title: "글로벌 스토리 플랫폼 투니즈 런칭",
        title_en: 'Global Story Platform Tonnyz Launch',
        description: "K-웹소설, K-웹툰 숏폼 컨텐츠 글로벌 사업 확대",
        details:
            "K-Web Novel, K-Webtoon Short Form Content Global Business Expansion",
    },
    {
        year: 2026,
        title: "문화 콘텐츠 현지화 사업 확대",
        title_en: 'Cultural Content Localization Business Expansion',
        description: "K-웹소설, K-웹툰 숏폼 컨텐츠 글로벌-월드와이드 현지화 사업 확대",
        details:
            "K-Web Novel, K-Webtoon Short Form Content Global-Wide Localization Business Expansion",
    },
]

// const FlowerIcon = ({ progress }: { progress: number }) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-96 h-96"
//     style={{ transform: `scale(${progress})` }}
//   >
//     <path
//       d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//       stroke="currentColor"
//       strokeWidth="2"
//     />
//     <path
//       d="M12 8C12 8 14 10 14 12C14 14 12 16 12 16C12 16 10 14 10 12C10 10 12 8 12 8Z"
//       stroke="currentColor"
//       strokeWidth="2"
//     />
//   </svg>
// )

export default function Timeline() {
    const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { language } = useLanguage();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <section ref={containerRef} className="py-20 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{language === 'ko' ? '우리의 여정' : 'Our Journey'}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {language === 'ko' ? '스텔라앤의 역사' : 'The evolution of Flowers & Saints through the years'}
          </p> */}
                </motion.div>

                <div className="relative">
                    {/* Vertical line */}
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-black/20"
                        style={{ scaleY: scaleX }}
                    />
                    {/* Logo */}
                
                    <motion.div
                        className="absolute top-96 md:-right-[60%] -right-[70%] transform -z-50 text-black/20"
                        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
                    >
                        <Image 
                            src="/images/logo/Logo.png" 
                            alt="stelland logo" 
                            width={550} 
                            height={550} 
                            className="rounded-full opacity-10"
                            // style={{ transform: useTransform(scrollYProgress, [0, 1], [0.5, 1]) as any }}
                        />
                    </motion.div>
                    

                    {timelineEvents.map((event, index) => (
                        <TimelineEvent
                            key={event.year}
                            event={event}
                            index={index}
                            isExpanded={expandedEvent === index}
                            onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TimelineEvent({
    event,
    index,
    isExpanded,
    onToggle,
}: {
    event: (typeof timelineEvents)[0]
    index: number
    isExpanded: boolean
    onToggle: () => void
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    return (
        <motion.div
            ref={ref}
            className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            <div className="w-5/12" />
            <div className="z-20">
                <div className="flex items-center justify-center w-8 h-8 bg-pink-400  rounded-full">
                    <div className="w-3 h-3 bg-white rounded-full" />
                </div>
            </div>
            <motion.div
                className="w-5/12 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggle}
            >
                <div className="p-4 bg-background rounded-lg shadow-md border border-gray-500/10">
                    <span className="font-bold text-primary">{event.year}</span>
                    <h3 className="md:text-lg text-sm font-semibold mb-1">{event.title}</h3>
                    <p className="md:text-sm text-xs text-muted-foreground">{event.description}</p>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-2 text-sm text-muted-foreground">{event.details}</p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

