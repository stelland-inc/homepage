'use client'
import React from 'react'
import Image from 'next/image'
import { Settings, CircleArrowOutUpRight, MessagesSquare, Earth, FileUser, Cog } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
export default function Description() {

    const { language } = useLanguage();
    return (
        <div className='flex flex-col justify-center items-center max-w-screen-xl mx-auto'>
        <div className="flex flex-wrap items-center md:h-[600px] h-auto">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto order-2 hidden md:block ">
            <div className="justify-center flex flex-wrap relative">
                <div className="my-4 md:w-full lg:w-6/12 px-4">
                    <div className="bg-red-200 shadow-lg rounded-lg text-center p-8">
                        <Settings size={75} className='shadow-md rounded-lg  mx-auto px-2 bg-white text-red-200' />
                        <p className="md:text-xl text-[14px] text-white mt-4 font-semibold">
                            {language === 'ko' ? <>체계적 인큐베이팅<br/> 시스템</> : 'Systematic incubation'}
                        </p>
                    </div>

                    <div className="bg-[#8A2BE2] shadow-lg rounded-lg text-center p-8 mt-8">
                        <MessagesSquare size={75} className='shadow-md rounded-lg mx-auto px-3 bg-white text-[#8A2BE2]' />
                        <p className="md:text-xl text-[14px] text-white mt-4 font-semibold">
                            {language === 'ko' ? '컨설팅 제공' : 'Consulting'}
                        </p>
                    </div>

                    <div className="bg-[#FFD09C] shadow-lg rounded-lg text-center p-8 mt-8">                  
                            <Earth size={80} className='shadow-md rounded-lg mx-auto px-3 bg-white text-[#FFD09C]' />
                        <p className="md:text-xl text-[14px] text-white mt-4 font-semibold">
                            {language === 'ko' ? '글로벌 시장 진출' : 'Global Market Entry'}
                        </p>
                    </div>
                  </div>

                    <div className="my-4 md:w-full lg:w-6/12 px-4 md:pt-8 pt-0">
                    <div className="bg-[#304F72] shadow-lg rounded-lg text-center p-8">
                            <CircleArrowOutUpRight size={75} className='shadow-md rounded-lg mx-auto px-3 bg-white text-[#304F72]' />
                        <p className="md:text-xl text-[14px] text-white mt-4 font-semibold">
                            {language === 'ko' ? '작가 교육 제공' : 'Creator Training'}
                        </p>
                    </div>
                        <div className="bg-pink-300 shadow-lg rounded-lg text-center p-8 mt-8">
                           
                                <Cog size={75} className='shadow-md rounded-lg mx-auto px-3 bg-white text-pink-300' />
                            <p className="md:text-xl text-[14px] text-white mt-4 font-semibold">
                                {language === 'ko' ? '고품질 현지화 서비스 제공' : 'High-quality localization services'}
                            </p>
                            </div>
                        
                            <div className="bg-pink-500 shadow-lg rounded-lg text-center p-8 mt-8">
                             
                                    <FileUser size={75} className='shadow-md rounded-lg mx-auto px-3 bg-white text-pink-500' />
                                <p className="md:text-lg text-[14px] text-white mt-4 font-semibold">
                                    {language === 'ko' ? '맞춤형 피드백' : 'Customized feedback'}
                                </p>
                                </div>
                                </div>

                                </div>
                         </div>
                                <div className="w-full md:w-4/12 md:px-12 px-2 ml-auto mr-auto md:mt-0 mt-10 order-1">
                                <div className="p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-6 shadow-lg rounded-full bg-white">
                                    <Image src='/images/logo/Logo.png' alt="logo" width={80} height={80}/>
                                    </div>
                                    <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                       {language === 'ko' ? '함께하면 더 많은 것을 이룰 수 있습니다' : 'Together, We Achieve More'}
                                    </h3>
                                    <p className="text-xl font-light leading-relaxed mt-4 mb-4 text-gray-600">
                                        {language === 'ko' ? '귀사의 글로벌 도약을 실현하는 콘텐츠 크리에이티브 파트너 스텔라앤과 함께라면, 여러분의 이야기가 전 세계로 더 많은 사람들에게 전달됩니다.' 
                                        : 'With Stella&Inc, experience translations that bring your content to 24 languages and localized designs, preserving the original feel.'}
                                    </p>
                                    <p className="text-xl font-light leading-relaxed mt-4 mb-4 text-gray-600">
                                        {language === 'ko' ? '스텔라앤은 콘텐츠 글로벌화를 위한 파트너로 함께합니다.' : 
                                        'Stella&Inc is your content globalization partner.'}
                                    </p>
                                    <button className='bg-black text-white px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-black transition-all duration-300 md:hidden block w-full'>
                                        <Link href='/about'> 
                                            {language === 'en' ? 'Learn more' : '더 알아 보기'}
                                        </Link>
                                    </button>
                                    <div className="md:block hidden pb-6">
                                        <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full text-gray-500 border border-red-100 uppercase last:mr-0 mr-2 mt-2">
                                            {language === 'ko' ? 'IP 관리' : 'IP Management'}
                                        </span>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full text-gray-500 border border-red-100 bg-white uppercase last:mr-0 mr-2 mt-2">
                                                {language === 'ko' ? '현지화' : 'Localization'}
                                        </span>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full text-gray-500 border border-red-100 uppercase last:mr-0 mr-2 mt-2">
                                                {language === 'ko' ? '인큐베이팅' : 'Incubation'}
                                        </span>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full text-gray-500 border border-red-100 uppercase last:mr-0 mr-2 mt-2">
                                                {language === 'ko' ? '글로벌스토리플랫폼' : 'Global Story Platform'}
                                        </span>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full text-gray-500 border border-red-100 uppercase last:mr-0 mr-2 mt-2">
                                                {language === 'ko' ? '마케팅' : 'Marketing'}
                                        </span>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full text-gray-500 border border-red-100 uppercase last:mr-0 mr-2 mt-2">
                                                {language === 'ko' ? '컨설팅' : 'Consulting'}
                                        </span>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full text-gray-500 border border-red-100 uppercase last:mr-0 mr-2 mt-2">
                                                {language === 'ko' ? '웹툰화' : 'Webtoonization'}
                                        </span>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full text-gray-500 border border-red-100 uppercase last:mr-0 mr-2 mt-2">
                                                {language === 'ko' ? '컨텐츠 글로벌화' : 'Content Globalization'}
                                        </span>
                                    </div>
                                       
                                    </div>
                        </div>


        </div>
    )
}