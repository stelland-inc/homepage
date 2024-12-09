'use client';
// import { useLayoutEffect, useRef, useState } from 'react';
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

import Link from 'next/link';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import styles from './page.module.scss';
// import { useGSAP } from '@gsap/react';

// gsap.registerPlugin(ScrollTrigger);

export default function Business() {
    const { language } = useLanguage();
    // const [isVisible, setIsVisible] = useState(false);

    // const mainRef = useRef(null);

    // useLayoutEffect(() => {
    //     setIsVisible(true);
    //     return () => setIsVisible(false);
    //   }, []);
      
    //   useGSAP(() => {
    //     if (mainRef.current) {
    //       gsap.fromTo(mainRef.current, 
    //         { opacity: 0, y: 50 },
    //         {
    //           opacity: 1,
    //           y: 0,
    //           ease: 'power3.inOut',
    //           duration: 1,
    //           scrollTrigger: {
    //             trigger: mainRef.current,
    //             start: 'top top+=10',
    //             end: 'top top+=200',
    //             scrub: true,
    //             markers: true, // Remove this in production
    //           },
    //         }
    //       );
    //     }
    //   }, { scope: mainRef });
  


    return <div>
        <Hero />

        <div className={`max-w-screen-lg mx-auto md:p-0 p-5  `} >
            {/*  ref={mainRef} ${isVisible ? styles.fadeEffect : ''} */}

        <div className="relative -top-16 left-0 p-3 text-center inline-flex items-center justify-center w-32 h-32 mb-6 shadow-lg rounded-full bg-white">
        <Image src='/images/logo/Logo.png' alt="logo" width={80} height={80}/>
        </div>

            <div className="pt-0 text-left text-md text-black pb-10">
            {language === 'en' 
            ? <p className="text-lg">+24 languages translation and localization experience. <br />
               Stella&Inc.’s global partners will help you out the flavor of the original text.</p>
            : <p className="text-lg">+24 개 언어 번역 및 디자인 현지화 경험은 여러분의 글로벌화 비즈니스에 도움을 드립니다. <br /> 
                크리에이티브 컨텐츠 회사의 글로벌 파트너가 되어 여러분의 비즈니스의 성장을 돕겠습니다.</p>
            }
            </div>
        
        <div className="flex flex-col gap-5">
            <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase pt-20">
                {language === 'en' ? <>What We Do</> : <>비즈니스</>}

            </h2>
            <ul className="flex flex-col gap-1 pt-5 pb-20">
                <li>{language === 'en' ? <p className="text-lg">- Localization, Webnovels & Webtoons Production</p> 
                                       : <p className="text-lg">- 번역, 웹소설 & 웹툰 제작</p> }
                </li>
                <li>{language === 'en' ? <p className="text-lg">- Originals Development & Production (IP management, webtoons, novels)</p> 
                                       : <p className="text-lg">- 오리지널 개발 및 제작 (IP 관리, 웹툰, 소설)</p> }
                </li>
                <li>{language === 'en' ? <p className="text-lg">- Media, Licensing, Adaptations</p> 
                                       : <p className="text-lg">- 미디어, 라이센싱, 적용</p> }
                </li>
                <li>{language === 'en' ? <p className="text-lg">- Global Partnerships & Marketing</p> 
                                       : <p className="text-lg">- 글로벌 파트너십 & 마케팅</p> }
                </li>
                <li>{language === 'en' ? <p className="text-lg">- Toonyz Platform Development, Design, Operation, Marketing</p> 
                                       : <p className="text-lg">- Toonyz 플랫폼 개발, 디자인, 운영, 마케팅</p> }
                </li>
            </ul>

            <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase">
                {language === 'en' ? <>PERFORMANCE</> : <>성과</>}
            </h2>

            <ul className="flex flex-col gap-5 pt-10">
                    <li className="text-lg flex md:flex-row flex-col gap-5"> 
                        <span className="text-5xl">+8,000</span>
                    <p className="text-md self-center">  📊 웹툰 현지화 회차 수
                    The total count of Webtoon localizations
                    </p>
                    </li>
                    <li className="text-lg flex md:flex-row flex-col gap-5"> 
                        <span className="text-5xl">+6,000</span>
                        <p className="text-md self-center"> 
                         📈 웹소설 현지화 회차 수
                        The total count of Webnovel localizations
                        </p>
                    </li>
                    <li className="text-lg flex md:flex-row flex-col gap-5"> 
                       <span className="text-5xl">+2,000</span>
                    <p className="text-md self-center"> 🪄 소속 현지 크리에이터 수
                    The pool of 2K creative talents
                    </p>
                    </li>
                    <li className="text-lg flex md:flex-row flex-col gap-5"> 
                        <span className="text-5xl">+20</span>
                    <p className="text-md self-center"> 🌏 국내외 IP 보유
                    Our talent acquisition in worldwide
                    </p>
                    </li>
                </ul>

                {/* Toonyz section */}

              <div className='flex flex-col justify-between items-center md:h-[650px] h-[100px] md:mb-0 mb-40 md:p-0 pt-[110px]'>
               <div className='flex flex-row justify-between items-center w-full pt-[50px]'>
                <div className='flex flex-col justify-start items-start gap-4'>

                    <Image src='/toonyzLogo.png' alt='toonyz' width={150} height={100}/>
                    <p className='text-md font-bold'>Global story platform</p>
                    <p>
                  { language === 'en' ? <>
                                        Explore a world of diverse genres and captivating stories with us. <br /> 
                                        Enjoy your favorite story universe, between us, on Toonyz!</>
                                      : <> 다양한 장르와 환상적인 이야기를 함께 즐겨주세요. <br /> 
                                        좋아하는 이야기 세계를 즐겨주세요, 우리와 함께 투니즈에서!</>
                  } <br/>
    
                    </p>
                    <button className='md:w-[250px] w-full bg-black text-white px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-black transition-all duration-300'>
                        <Link href='/business'>
                         {language === 'en' ? 'Go to Toonyz' : 'Toonyz 바로가기'}
                        </Link>
                    </button>
                </div>
                <div className='md:right-0 right-24 md:top-12 bottom-[0px] md:h-auto h-[300px] md:overflow-visible overflow-hidden'>
                    <Image 
                    src='/images/toonyz_screen.png' 
                    alt='toonyz screen' 
                    width={355} 
                    height={650}
                    objectFit=''
                    className='md:w-[355px] md:h-[650px] w-[200px] h-[360px] object-contain' 
                    />
                </div>
            </div>
        </div>

            <div style={{ height: '10vh' }}></div>
            <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase md:mt-0 mt-40">
                {language === 'en' ? <>SERVICE</> : <>서비스</>}
            </h2>
                   <ul className="flex md:flex-row flex-col gap-5 justify-center items-center pt-10">
                    <li className="flex flex-col gap-5 justify-center items-center w-48">
                    <Image src='/icons/main-img01.png' alt='main icon 01' width={80} height={80} className="p-5 rounded-full border-gray-200 bg-gray-200" />
                    <p className="w-full h-10 text-center">{language === 'en' ? 'IP Management' : 'IP 매니지먼트'}</p>
                    </li>
                    <li className="flex flex-col gap-5 justify-center items-center w-48">
                    <Image src='/icons/main-img02.png' alt='main icon 01' width={80} height={80} className="p-5 rounded-full border-gray-200 bg-gray-200"/>
                    <p className="w-full h-10 text-center">{language === 'en' ? 'Localization' : '현지화 번역'}</p>
                    </li>
                    <li className="flex flex-col gap-5 justify-center items-center w-48">
                    <Image src='/icons/main-img03.png' alt='main icon 01' width={80} height={80} className="p-5 rounded-full border-gray-200 bg-gray-200"/>
                    <p className="w-full h-10 text-center">{language === 'en' ? 'Media, Licensing, Adaptations' : '미디어, 라이센싱, 적용'}</p>
                    </li>
                    <li className="flex flex-col gap-5 justify-center items-center w-48">
                    <Image src='/icons/main-img04.png' alt='main icon 01' width={80} height={80} className="p-5 rounded-full border-gray-200 bg-gray-200"/>
                    <p className="w-full h-10 text-center">{language === 'en' ? 'Creator incubating' : '크리에이터 인큐베이팅'}</p>
                    </li>
                 </ul>

          

                <div style={{ height: '10vh' }}></div>
                <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase">
                {language === 'en' ? <>HOW IT WORKS</> : <>프로세스</>}
                </h2>
                    
                <div className="flex md:flex-row flex-col gap-10 text-lg pt-10">

                    <div className='flex flex-col w-full'>
                        
                     <h1 className="pb-10 font-bold uppercase">Localization</h1>
                     <p className="pb-5">1. Planning & Preparing</p>
                     <p className="border-b border-black">
                        {language === 'en' ? <>We translate your webtoon into <br/> 24 languages and localize it.</> 
                                           : <>우리는 여러분의 웹툰을 <br/> 24개 언어로 번역하고 현지화합니다.</>}
                     </p>
                     
                     <p className="pt-10">2. Translation</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We proceed with translation together with local native speakers.' : '현지 특화 원어민과 함께 번역을 진행합니다.'}
                     </p>
                     
                     <p className="pt-10">3. Quality inspection </p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We conduct quality inspections together with native speakers.' : '원어민과 함께 품질 검사를 진행합니다.'}
                     </p>
                     
                     <p className="pt-10">4. Typesetting </p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We perform proofreading together with language experts and natives.' : '언어 전문가와 네이티브와 함께 검수를 진행합니다.'}
                     </p>
                    
                     <p className="pt-10">5. Finalization </p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We carry out the final inspection/check customized for each language.' : '언어별 맞춤 전문 최종 검수/검사를 진행합니다.'}
                     </p>

                    </div>

                    <div className='flex flex-col w-full'>

                    <h1 className="pb-10 font-bold uppercase">Global Distribution</h1>
                     <p className="pb-5">1. Preparing localization</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We prepare localization with experts specialized in the target language.' 
                                           : '현지화 언어에 특화된 전문가들과 함께 현지화 준비를 진행합니다.'}
                     </p>

                     <p className="pt-10">2. Submission of a work</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We submit the work to local/international media.' 
                                           : '작품을 현지 미디어에 투고합니다.'}
                     </p>

                     <p className="pt-10">3. Entering the global market</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We provide the optimal platform for entering the global market.' 
                                           : '글로벌 시장 진출을 위해 최적의 플랫폼을 제공합니다.'}
                     </p>

                     <p className="pt-10">4. Design & Marketing</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We market with designs tailored to local characteristics.' 
                                           : '현지 특색화 된 디자인으로 마케팅합니다.'}
                     </p>

                     <p className="pt-10">5. Strategic Marketing & Promotion</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We strategically market and promote your work.' 
                                          : '여러분의 작품을 전략적으로 마케팅하고 홍보합니다.'}
                     </p>

                    </div>
                    <div className='flex flex-col w-full'>
                        
                    <h1 className="pb-10 font-bold uppercase">IP Management</h1>
                     <p className="pb-5">1. Incubate creators</p>
                     <p className="border-b border-black">
                        {language === 'en' ? <>We discover new writers through a systematic incubation system.</> 
                                           : <>체계적 인큐베이팅 시스템으로 신진 작가를 발굴합니다.</>}
                     </p>

                     <p className="pt-10">2. Plan contents and feedback</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We provide customized content planning and feedback.' 
                        : '콘텐츠 기획 및 피드백을 맞춤 제공합니다.'}
                     </p>
                     <p className="pt-10">3. Global distribution & promotion</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We distribute and promote in more than six foreign languages globally.' 
                                           : '6개 이상의 외국어 글로벌 배포 및 홍보를 진행합니다.'}
                     </p>
                     <p className="pt-10">4. Webtoonification </p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We proceed with Webtoonification through a systematic process.' : '체계적인 프로세스로 웹툰화를 진행합니다.'}
                     </p>
                     <p className="pt-10">5. Personalized Feedback & Marketing</p>
                     <p className="border-b border-black">
                        {language === 'en' ? 'We offer personalized feedback and marketing.' : '맞춤형 피드백 및 마케팅을 제공합니다.'}
                     </p>

                    </div>

                </div>

        </div>

        </div>

        <div className='h-[50vh]'></div>
        <Footer />
    </div>
}