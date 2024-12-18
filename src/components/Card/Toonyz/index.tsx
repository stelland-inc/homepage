'use client'

import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Toonyz() {
    const { language } = useLanguage();
    
    return (
        <div className='max-w-screen-lg mx-auto flex flex-col justify-between items-center '>
            <div className='flex flex-row justify-between items-center pt-[50px]'>
                <div className='flex flex-col justify-start items-start gap-4 w-full'>
                    {/* <h2>{language === 'en' ? 'Toonyz' : '투니즈'}</h2> */}
                    <Image src='/toonyzLogo.png' alt='toonyz' width={150} height={100}/>
                    <p className='md:text-2xl text-md font-bold'>Global story platform</p>
                    <p className='md:text-2xl text-md'>
                  { language === 'en' ? <>
                                        Explore a world of diverse genres and captivating stories with us. <br /> 
                                        Come find your favorite story universe on Toonyz!</>
                                      : <> 다양한 장르와 환상적인 이야기를 함께 즐기세요. <br /> 
                                        여러분이 좋아하는 이야기 세계로 떠나보세요.<br /> 우리와 투니즈에서 함께 하세요!</>
                  } <br/>
    
                    </p>
                    <button className='md:w-[250px] w-full bg-black text-white px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-black transition-all duration-300'>
                        <Link href='/business'>
                         {language === 'en' ? 'Learn more' : '더 보기'}
                        </Link>
                    </button>
                </div>
                <div className='h-[650px] md:overflow-visible overflow-hidden'>
                    <Image 
                    src='/images/toonyz_screen.png' 
                    alt='toonyz screen' 
                    width={355} 
                    height={650}
                    objectFit=''
                    className='md:w-[355px] md:h-[650px] w-[300px] h-[650px] object-contain' 
                    />
                </div>
            </div>
        </div>
    )
}
