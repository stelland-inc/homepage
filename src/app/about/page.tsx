'use client'
import Image from 'next/image'
import styles from './page.module.scss'

import Roadmap from '@/components/Card/History/Roadmap';
import { useLanguage } from '@/contexts/LanguageContext';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
// import SlidingText from '@/components/SlidingText/SlidingText';
import dynamic from 'next/dynamic'

// For components that use browser-only APIs
const SlidingText = dynamic(() => import('@/components/SlidingText/SlidingText'), {
  ssr: false
})

export default function About() { 
  const { language } = useLanguage();
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
      title_en: 'Stella& Inc. Established',
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
        <SlidingText />

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
                                      : <p className='text-2xl'> Stella& is your content globalization partner.</p> }
            
                </div>

                <ul className='list-none flex md:flex-row flex-col md:gap-14 text-md'>
                    <li className='flex flex-col gap-4 md:w-[200px] w-full justify-center items-center md:mb-0 mb-10'>
                        <p className='font-bold'>Brand Logo</p>
                        <div className='flex flex-col gap-4 md:h-[300px] '>
                        <Image src='/images/logo/Logo.png' alt="logo" width={100} height={100}/> <br />
                        <Image src='/stelland_logo_black.svg' alt="logo" width={100} height={100} className='md:pb-0 pb-5'/>
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
                                        : <p className='text-2xl'>Beyond reality, into your story. Your world, more extraordinary than ever.</p> }
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
                                : <p className='text-2xl'>As your content globalization partner,<br/> 
                                   we join realities beyond language barriers.</p> }
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
          {language === 'en' ? <p> Trusted by</p>
                             : <p> 고객사</p> }
        </div>
                <Slider/> 
                <div className='h-[30vh]'></div>
                <Footer/>  
      </div>
    </>
}