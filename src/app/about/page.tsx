'use client'
import Image from 'next/image'
import styles from './page.module.scss'
import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Roadmap from '@/components/Card/History/Roadmap';
import { useLanguage } from '@/contexts/LanguageContext';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';

export default function About() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const directionRef = useRef(-1);
  const { language } = useLanguage();

  const xPercentRef = useRef(0); // Using useRef to store xPercent

  // Wrap the animate function in useCallback
  const animate = useCallback(() => {
    if (xPercentRef.current < -100) {
      xPercentRef.current = 0;
    } else if (xPercentRef.current > 0) {
      xPercentRef.current = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercentRef.current });
    gsap.set(secondText.current, { xPercent: xPercentRef.current });
    requestAnimationFrame(animate);
    xPercentRef.current += 0.1 * directionRef.current;
  }, []); // Empty dependency array ensures this function is only created once

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
        scrollTrigger: {
            trigger: document.documentElement,
            scrub: 0.25,
            start: 0,
            end: window.innerHeight,
            onUpdate: e => directionRef.current = e.direction * -1
        },
        x: "-500px",
    });
    requestAnimationFrame(animate);
  }, [animate]);

  const roadmapData = [
    {
      title: '레진코믹스 지정 현지화 업체',
      title_en: 'Designated Localization Company for Lezhin Comics',
      description: '비브로스팀 지정 현지화 업체',
      description_en: 'Designated Localization Company for VBros Team',
      date: '2021'
    },
    {
      title: '스텔라앤 설립',
      title_en: 'Stella & Inc. Established',
      description: '고렘 팩토리 지정 현지화 업체, 브리드 컴퍼니 지정 현지화 업체, 락킨 코리아 지정 현지화 업체',
      description_en: 'Designated Localization Company for Golem Factory, Designated Localization Company for Breed Company, Designated Localization Company for Rockin Korea',
      date: '2022'
    },
    {
      title: '해외 유통 사업 개시',
      title_en: 'Global Distribution Business Started',
      description: '케나즈 지정 현지화 업체, 카카오 지정 현지화 업체, AI 현지화 솔루션 개발, 웹툰화 사업 개시, IP 개발 사업 개시',
      description_en: 'Designated Localization Company for KENAS, Designated Localization Company for Kakao, AI Localization Solution Development, Webtoon Business Started, IP Development Business Started',
      date: '2023'
    },
    {
      title: '해외 파트너사 확대',
      title_en: 'Global Partner Expansion',
      description: '아마존 재팬 지정 현지화 업체, 카카오 태국법인 지정 현지화 업체, 메디방, 라쿠텐 일본 사업 채결',
      description_en: 'Designated Localization Company for Amazon Japan, Designated Localization Company for Kakao Thailand, MediBang, Rakuten Japan Business Settlement',
      date: '2024'
    },
    {
      title: '글로벌 스토리 플랫폼 투니즈 런칭',
      title_en: 'Global Story Platform Tonnyz Launch',
      description: '웹툰 현지화 사업 확대',
      description_en: 'Webtoon Localization Business Expansion',
      date: '2025'
    },
  
  ];

    return <>
        <main className={styles.main}>
            {/* <Image 
                src="/images/about-bg.jpg"
                fill={true}
                alt="background image by Austin Distel, unsplash"
                className='bg-red-200'
            /> */}
            <div className='bg-red-200 w-full h-full'>

                <div className='flex flex-col justify-start items-start h-full max-w-screen-xl mx-auto'>
                        <div className='text-white text-left text-2xl font-bold mt-[35vh]'>
                        {language === 'en' ? <p className='md:pl-0 pl-10'>We are your content globalization partner.</p> 
                                           : <p className='md:pl-0 pl-10'>스텔라앤은 여러분의 콘텐츠 글로벌화 여정을 함께 합니다.</p>}
                        </div>
                </div>

            </div>
            {/* Photo by <a href="https://unsplash.com/@austindistel?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Austin Distel</a> on <a href="https://unsplash.com/photos/person-reading-book-during-daytime-Ej_GTF0JPss?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
       */}
            <div className={styles.sliderContainer}>
                <div ref={slider} className={styles.slider}>
                    <p ref={firstText}>Your Story, Our Craft</p>
                    <p ref={secondText}>Your Story, Our Craft</p>
                </div>
            </div>
            </main>

        <div className="max-w-screen-xl mx-auto pt-20 md:p-0 p-5 ">
        <div className="flex md:flex-row flex-col justify-center md:items-start items-center md:gap-0 gap-5 md:pt-20 my-24">
        <div className="flex flex-col md:text-left text-center md:text-6xl text-2xl font-bold md:w-2/3 w-full">
            <p className='text-red-200 text-lg'>
                01.
            </p>
           <h1> About Us</h1> 
         </div>          
            
            <div className="flex flex-col gap-10 md:w-[90%] w-full">
                <div className='md:text-left text-center text-md pb-10'>
                  { language === 'ko' ? <p className='text-2xl'> 스텔라앤은 콘텐츠 글로벌화를 위한 여러분의 콘텐츠 글로벌 파트너입니다.</p> 
                                      : <p className='text-2xl'>Stella & is your content global partner for globalizing content.</p> }
            
                </div>

                <ul className='list-none flex md:flex-row flex-col md:gap-14 text-md'>
                    <li className='flex flex-col gap-4 md:w-[200px] w-full justify-center items-center md:mb-0 mb-10'>
                        <p className='font-bold'>Brand Logo</p>
                        <div className='flex flex-col gap-4 md:h-[300px] '>
                        <Image src='/images/logo/Logo.png' alt="logo" width={100} height={100}/>
                        </div>
                    </li>
                    <li className='flex flex-col gap-4 mx-auto md:justify-start md:items-start justify-center items-center md:mb-0 mb-10 w-[200px]'>
                        <p className='font-bold  mx-auto'>Brand Character</p>
                        <Image src='/images/character/stelli_02.png' alt="logo" width={300} height={300}/>
                    </li>
                    <li className='flex flex-col gap-4 md:w-[200px] w-full justify-center items-center '>
                        <p className='font-bold'>Mission</p>
                        <div className='md:h-[300px] h-[100px] text-md self-center text-center'>
                    { language === 'ko' ? <p className='text-2xl'>현실보다 더 특별한 순간을 선물합니다. 평범한 일상을 넘어, 특별한 순간으로.</p> 
                                        : <p className='text-2xl'>Beyond reality, into your story, your world, more extraordinary than ever</p> }
                        </div>
                    </li>
                </ul>

        </div>

        </div>

        <div className="flex md:flex-row flex-col md:gap-0 gap-10 pt-20 pb-20 my-24">
            <div className="md:text-left text-center md:text-6xl text-2xl font-bold md:w-2/3 w-full">
                <span className='text-red-200 text-lg'>
                    02.
                </span>
               <h1> Philosophy</h1>
            </div>
            <div className="md:text-left text-center text-md self-end md:w-[90%] w-full">
            { language === 'ko' ? <p className='text-2xl'>우리는 여러분의 콘텐츠를 글로벌화하는 파트너로서 함께합니다. <br/>
                                    현실을 너머서 여러분의 이야기로 세상과 더 특별한 순간을 만들어냅니다.</p> 
                                : <p className='text-2xl'>We are your content global partner<br/> 
                                   Beyond reality, into your story, your world, more extraordinary than ever</p> }
            </div>
        </div>

        <div className="flex md:flex-row flex-col md:gap-0 gap-10 pt-20 pb-20">
            <div className="md:text-left text-center md:text-6xl text-2xl font-bold md:w-2/3 w-full">
                <span className='text-red-200 text-lg'>
                    03.
                </span>
               <h1> History</h1>
            </div>
            <div className="md:text-left text-md md:w-[90%] w-full">
             {/* <History className='md:ml-10' progress={0} range={[0, 10]} i={1}/> */}
             <Roadmap data={roadmapData} className='md:ml-0 ml-20'/>
            </div>
        </div>


        <div className='text-center md:text-4xl text-2xl font-bold w-34 pt-20'>
          {language === 'en' ? <p> We are trusted by our clients</p>
                             : <p> 우리는 고객에게 신뢰를 받습니다.</p> }
        </div>
                <Slider/> 
                <div className='h-[30vh]'></div>
                <Footer/>  
      </div>
    </>
}