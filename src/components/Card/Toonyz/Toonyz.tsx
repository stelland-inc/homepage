'use client'

import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import Ticker from './Ticker';


export default function ToonyzWrapper() {
    return (
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 opacity-20 md:h-full min-h-[20vh]">
            <Ticker direction="up" />
            <Ticker direction="down" />
            <Ticker direction="up" className="md:inline-grid hidden" />
            <Ticker direction="down" className="md:inline-grid hidden" />
            <Ticker direction="down" className="md:inline-grid hidden" />
        </div>
    )
}

export function Toonyz() {
    const { language } = useLanguage();

    return (
        <div className='max-w-screen-lg mx-auto flex flex-col justify-center items-center '>
            <div className='flex md:flex-row flex-col justify-center items-center h-screen'>
                <div className='md:order-1 order-2 flex flex-col justify-start items-start gap-4 w-full md:w-1/2 md:p-0 p-3'>
                    <Image src='/toonyzLogo.png' alt='toonyz' width={150} height={100} />
                    <p className='md:text-2xl text-md font-bold'>Global story platform</p>
                    <p className='md:text-lg text-md'>
                        {language === 'en' ? <p>
                            Explore a world of diverse genres and captivating stories with us. <br />
                            Come find your favorite story universe on Toonyz!</p>
                            : <p> 다양한 장르와 환상적인 이야기를 함께 즐기세요. <br />
                                여러분이 좋아하는 이야기 세계로 떠나보세요.<br /> 우리와 투니즈에서 함께 하세요!</p>
                        } 
                    </p>
                    <button className='md:w-[250px] w-full bg-black text-white px-10 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300'>
                        <Link href='https://toonyz.com'>
                            {language === 'en' ? 'Go to Toonyz' : '투니즈 바로가기'}
                        </Link>
                    </button>
                </div>

                <div className="md:order-2 order-1 relative md:w-[30vw] w-full flex items-center justify-center">
                    <div className="relative aspect-square max-h-screen mx-auto md:scale-110 lg:scale-125">
                        <Image
                            src="/images/toonyz_screen.svg"
                            alt="Toonyz mobile screenshot"
                            width={200}
                            height={300}
                            className="object-contain transform hover:scale-110 transition-transform duration-500"
                            priority
                        />
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-1/4 -right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 -left-1/4 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />

                    {/* Product badges */}
                    <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                        <span className="md:text-base text-sm font-medium">Global Story Platform</span>
                    </div>
                    <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                        <span className="md:text-base text-sm font-medium">Visualizing Web Novels</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
