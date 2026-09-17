'use client'
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { Zap, Command, Scale, Bot, Sparkles } from "lucide-react"

const features = [
    {
        title: "Global IP Management & Licensing",
        title_ko: "글로벌 IP 관리 & 라이센싱",
        description: "Get your systematic licensing up and incubation for your content.",
        description_ko: "체계적인 라이센싱과 인큐베이팅을 통해 여러분의 콘텐츠를 더 많은 사람들에게 전달할 수 있습니다.",
        icon: Zap,
    },
    {
        title: "Localization",
        title_ko: "현지화, 번역 & 통역",
        description: "We offer high-quality localization services for your content. We provide own native's proofreading and i18n Ai.",
        description_ko: "여러분의 콘텐츠에 대한 고품질 현지화 서비스를 제공합니다. 자체 원어민 검수와 i18n 번역 엔진을 통해 지역화합니다.",
        icon: Command,
    },
    {
        title: "Global Distribution",
        title_ko: "글로벌 유통",
        description: "Distribute your content to millions of users and messages with our global distribution platform.",
        description_ko: "해외 거점별 파이프 라인과 글로벌 유통 플랫폼을 통해 여러분의 콘텐츠를 더 많은 사람들에게 전달할 수 있습니다.",
        icon: Scale,
    },
    {
        title: "Content Globalization",
        title_ko: "콘텐츠 글로벌화",
        description: "Leverage artificial intelligence to create a high-quality content.",
        description_ko: "스텔라앤의 웹소설 특화 번역 엔진 AI를 활용하여 더욱 고품질의 콘텐츠를 만듭니다. 웹소설 기반 영상 제작 기술을 활용합니다.",
        icon: Bot,
    },
    {
        title: "AI-Short form content",
        title_ko: "영상화 숏폼 콘텐츠 제작",
        description: "Build custom features of animation in a minute without touching any short form content.",
        description_ko: "웹소설 기반 영상화 숏폼 콘텐츠를 제작하고 플랫폼에 배포합니다. 특허 출헌중인 웹소설 기반 영상화 숏폼 콘텐츠 제작 기술을 활용합니다.",
        icon: Sparkles,
    },
] as const

const BADGE_COLORS = ['#FFD0A5', '#FF8197', '#374b73'] as const
const COUNT = features.length
const AUTO_ADVANCE_MS = 3200

// Shortest signed distance from `active` to `index` around the 5-card
// loop (e.g. index 4 sits at -1 from active 0, not +4) — this is what
// lets a card exit to one side while the next slides in from the other,
// instead of every card just snapping across the full width.
const loopOffset = (index: number, active: number) => {
    let diff = index - active
    if (diff > COUNT / 2) diff -= COUNT
    if (diff < -COUNT / 2) diff += COUNT
    return diff
}

const FeaturesWrapper = () => {
    const { language } = useLanguage()
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const timer = setInterval(() => {
            setActive((current) => (current + 1) % COUNT)
        }, AUTO_ADVANCE_MS)
        return () => clearInterval(timer)
    }, [paused])

    return (
        <section className="container space-y-6 py-6 md:px-0 px-2 md:space-y-12 md:py-24 lg:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-2 text-center md:gap-4"
            >
                <h2 className="text-xl font-bold leading-[1.1] sm:text-3xl md:text-5xl" style={{ color: '#374b73' }}>
                    {language === 'ko' ? '함께하면 더 많은 것을 이룰 수 있습니다'
                                       : 'Together, We Achieve More'}
                </h2>
                <p className="max-w-[85%] text-xs leading-normal sm:text-lg sm:leading-7" style={{ color: '#374b73', opacity: 0.65 }}>
                    {language === 'ko'
                        ? <>귀사의 글로벌 도약을 실현하는 콘텐츠 크리에이티브 파트너 스텔라앤과 함께라면,<br />여러분의 이야기가 전 세계로 더 많은 사람들에게 전달됩니다.</>
                        : 'With Stella&, experience translations that bring your content to 24 languages and localized designs, the ineffable feel of the original intact.'}
                </p>
            </motion.div>

            {/* A perspective carousel, not a static grid — one wide card sits
                front-and-center while the rest fan out to either side at a
                reduced scale/opacity, like a gallery wall receding away
                from the viewer. Auto-advances on a timer; each step moves
                the active card out to one side and rotates the next one
                in from the other, rather than everything just crossfading
                in place. */}
            <div
                className="relative mx-auto h-[220px] w-full max-w-5xl sm:h-[280px] md:h-[320px]"
                style={{ perspective: '1400px' }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {features.map((feature, index) => {
                    const offset = loopOffset(index, active)
                    const absOffset = Math.abs(offset)
                    const sign = Math.sign(offset)
                    const isActive = offset === 0
                    const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length]
                    const isDarkBadge = badgeColor === '#374b73'

                    // Cards more than 2 steps away from center sit fully
                    // hidden off to the side instead of stacking visibly.
                    const hidden = absOffset > 2

                    return (
                        <motion.div
                            key={index}
                            className="absolute left-1/2 top-1/2 w-[78%] max-w-[560px] cursor-pointer overflow-hidden rounded-2xl border sm:w-[62%]"
                            style={{
                                borderColor: 'rgba(55,75,115,0.1)',
                                backgroundColor: '#FDFCFB',
                                transformStyle: 'preserve-3d',
                            }}
                            initial={false}
                            animate={{
                                x: hidden ? `${sign * 90}%` : `calc(-50% + ${offset * 46}%)`,
                                y: '-50%',
                                scale: isActive ? 1 : absOffset === 1 ? 0.82 : 0.66,
                                rotateY: hidden ? 0 : -offset * 22,
                                opacity: hidden ? 0 : isActive ? 1 : absOffset === 1 ? 0.55 : 0.28,
                                zIndex: 10 - absOffset,
                            }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => setActive(index)}
                            whileHover={isActive ? { y: '-52%' } : undefined}
                        >
                            <div className="flex h-[220px] flex-row items-center gap-4 p-5 text-left sm:h-[280px] sm:gap-6 sm:p-8 md:h-[320px]">
                                <motion.span
                                    className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl sm:h-16 sm:w-16"
                                    style={{ backgroundColor: badgeColor }}
                                    animate={{ rotate: isActive ? 0 : -12, scale: isActive ? 1 : 0.9 }}
                                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                                >
                                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: isDarkBadge ? '#FDFCFB' : '#374b73' }} />
                                </motion.span>
                                <div className="space-y-2 sm:space-y-3">
                                    <h3 className="text-base font-bold leading-tight sm:text-xl md:text-2xl" style={{ color: '#374b73' }}>
                                        {language === 'ko' ? feature.title_ko : feature.title}
                                    </h3>
                                    <p className="hidden text-sm sm:block sm:text-base" style={{ color: '#374b73', opacity: 0.6 }}>
                                        {language === 'ko' ? feature.description_ko : feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Progress dots double as direct jump targets. */}
            <div className="flex items-center justify-center gap-2">
                {features.map((_, index) => (
                    <button
                        key={index}
                        aria-label={`${index + 1}`}
                        onClick={() => setActive(index)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                            width: index === active ? '24px' : '6px',
                            backgroundColor: index === active ? '#FF8197' : 'rgba(55,75,115,0.2)',
                        }}
                    />
                ))}
            </div>

            <style jsx global>{`
                 .lucide {
                    stroke-width: 1px;
                }
            `}</style>
        </section>
    )
}

export default FeaturesWrapper
