'use client'
import { motion } from "framer-motion"
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

const FeaturesWrapper = () => {
    const { dictionary, language } = useLanguage()

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
                    {language === 'ko' ? '귀사의 글로벌 도약을 실현하는 콘텐츠 크리에이티브 파트너 스텔라앤과 함께라면, 여러분의 이야기가 전 세계로 더 많은 사람들에게 전달됩니다.'
                                       : 'With Stella&, experience translations that bring your content to 24 languages and localized designs, the ineffable feel of the original intact.'}
                </p>
            </motion.div>
            {/* Mobile: a tight 2-column grid with trimmed cards (no
                description, smaller icon) so all 5 fit on one screen
                without scrolling — sm/md/lg keep the original spacious
                card. The lone 5th card gets centered under the 2x2
                above it instead of stretching full-width. */}
            {/* One row of 5 narrow, portrait cards (icon + short title, no
                description) at every breakpoint — was a 2x3 grid on
                desktop, but the user asked for the same 5-across layout
                used on mobile to carry up to web too. */}
            <div className="mx-auto grid grid-cols-5 gap-1.5 sm:max-w-3xl sm:gap-4 lg:max-w-5xl lg:gap-8">
                {features.map((feature, index) => {
                    const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length]
                    const isDarkBadge = badgeColor === '#374b73'
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 32, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{
                                y: -6,
                                transition: { duration: 0.3 },
                            }}
                            className="relative overflow-hidden rounded-xl border p-1.5 transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(255,129,151,0.35)] sm:rounded-2xl sm:p-2"
                            style={{ borderColor: 'rgba(55,75,115,0.1)', backgroundColor: '#FDFCFB' }}
                        >
                            <div className="flex h-[150px] flex-col items-center justify-start gap-2 rounded-md p-1.5 text-center sm:h-[300px] sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:p-6 sm:text-left">
                                <motion.span
                                    className="flex h-7 w-7 flex-none items-center justify-center rounded-lg sm:h-14 sm:w-14 sm:rounded-2xl"
                                    style={{ backgroundColor: isDarkBadge ? badgeColor : `${badgeColor}` }}
                                    initial={{ scale: 0, rotate: -25 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 + 0.25, type: 'spring', stiffness: 220, damping: 14 }}
                                    whileHover={{ rotate: 8, scale: 1.08 }}
                                >
                                    <feature.icon className="h-3.5 w-3.5 sm:h-7 sm:w-7" style={{ color: isDarkBadge ? '#FDFCFB' : '#374b73' }} />
                                </motion.span>
                                <div className="space-y-1 sm:mt-2 sm:space-y-2">
                                    <h3 className="text-[10px] font-bold leading-tight sm:text-base" style={{ color: '#374b73' }}>{ language === 'ko' ? feature.title_ko : feature.title}</h3>
                                    <p className="hidden text-sm sm:block" style={{ color: '#374b73', opacity: 0.6 }}>{language === 'ko' ? feature.description_ko : feature.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
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