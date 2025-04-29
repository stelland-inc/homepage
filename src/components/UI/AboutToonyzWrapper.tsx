import { Button } from "@mui/material"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutToonyzWrapper() {
    return (
        <section className="relative overflow-hidden bg-[#FAF6F3]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent" />

            <div className="container mx-auto px-4 pt-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10 space-y-8">
                        <div className="inline-block bg-pink-200/20 px-4 py-2 rounded-full">
                            <span className="text-primary font-medium tracking-wider text-sm">
                            스토리 플랫폼, 새로운 아이디어
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900">
                            <span className="block">상상속의 웹소설을 </span>
                            <span className="text-primary">경험한다,</span>
                            <span className="">Toonyz</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                        웹소설로 숏폼 애니메이션을
                        만들고 공유하는 AI 기능과
                       
                            <span className="block mt-2">
                            전세계로 글로벌 독자를 확보하는  새로운 형태의 웹소설 플랫폼
                            </span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-4">
                            <Button
                             size="large" 
                             variant="text"
                             sx={{
                                padding: '8px 20px',
                                borderRadius: '25px',
                                color: '#fff',
                                backgroundColor: '#000',
                                '&:hover': {
                                    backgroundColor: '#000',
                                },
                             }}
                             className="rounded-full bg-black hover:bg-black/90 text-white px-8">
                                투니즈 더 알아보기
                                <ArrowRight className="ml-2 h-4 w-4 " />
                            </Button>
                            <Button
                                size="large"
                                variant="text"
                                sx={{
                                    color: '#000',
                                    padding: '8px 20px',
                                    borderRadius: '25px',
                                    border: '1px solid #000',
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: '#eee',
                                    },
                                 }}
                                className="border border-black text-black hover:text-black rounded-full"
                            >
                                <Link href="https://toonyz.com">
                                    바로가기
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8">
                            <div>
                                <div className="text-3xl font-bold text-primary mb-2">96%</div>
                                <p className="text-sm text-gray-600 leading-snug">알파 테스터 만족도</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                                <p className="text-sm text-gray-600 leading-snug">현지화 번역엔진 품질</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-2">89%</div>
                                <p className="text-sm text-gray-600 leading-snug">IP 라이센싱 확보</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative aspect-square max-w-md mx-auto">
                            <Image
                                src="/images/toonyz_screen.svg"
                                alt="Toonyz mobile screenshot"
                                fill
                                className="object-contain transform hover:scale-105 transition-transform duration-500"
                                priority
                                quality={100}
                            />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-1/4 -right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-1/4 -left-1/4 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />

                        {/* Product badges */}
                        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                            <span className="text-primary font-medium">Global Story Platform</span>
                        </div>
                        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                            <span className="text-primary font-medium">Visualizing Web Novels</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:h-[10vh] h-0"></div>
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-gray-600">Scroll</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-black/50 to-transparent" />
                </div>
            </div>

        </section>
    )
}

