'use client'
import Image from 'next/image'
import styles from './page.module.scss'

import Roadmap from '@/components/Card/History/Roadmap';
import { useLanguage } from '@/contexts/LanguageContext';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer/Footer';
// import SlidingText from '@/components/SlidingText/SlidingText';
import Timeline from '@/components/Timeline';
import dynamic from 'next/dynamic'

// For components that use browser-only APIs
const SlidingText = dynamic(() => import('@/components/SlidingText/SlidingText'), {
  ssr: false
})

export default function AboutView() {
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
  ];

  return <>
    <SlidingText />
    <div
      className="w-full"
      style={{
        backgroundColor: '#FFF8F3',
        backgroundImage: 'radial-gradient(rgba(55,75,115,0.08) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
    <div className="max-w-screen-xl mx-auto pt-20 px-6 xl:px-0 ">
      <div className="flex flex-col justify-center items-center md:items-start gap-5 md:pt-20 my-24">
        <div className="flex flex-col md:text-left text-center md:text-4xl text-xl font-bold w-full">
          <p className='text-[#FF8197] text-lg tracking-[0.3em]'>
            01.
          </p>
          <h1> About Us</h1>
          <div className='hidden md:block w-16 h-[3px] bg-[#FF8197] mt-4 rounded-full' />
        </div>

        <div className="flex flex-col gap-10 w-full">
          <div className='md:text-left text-center text-md pb-10'>
            {language === 'ko' ? <p className='text-2xl'> 스텔라앤은 콘텐츠 글로벌화를 위한 여러분의 콘텐츠 글로벌 파트너입니다.</p>
              : <p className='text-2xl'> Stella& is your content globalization partner.</p>}

          </div>

          <ul className='list-none grid md:grid-cols-3 grid-cols-1 gap-8 text-md'>
            <li className='flex flex-col items-center gap-4 rounded-2xl bg-white/70 shadow-[0_8px_24px_rgba(55,75,115,0.08)] px-8 py-14 min-h-[340px]'>
              <p className='font-bold'>Brand Logo</p>
              <div className='flex flex-1 flex-col items-center justify-center gap-6'>
                <Image src='/images/logo/Logo.png' alt="Stella&Inc. emblem" width={130} height={130} />
                <Image src='/stelland_logo_black.svg' alt="Stella&Inc. wordmark" width={240} height={240} className='w-[220px] h-auto' />
              </div>
            </li>
            <li className='flex flex-col items-center gap-4 rounded-2xl bg-white/70 shadow-[0_8px_24px_rgba(55,75,115,0.08)] px-8 py-14 min-h-[340px]'>
              <p className='font-bold'>Brand Character</p>
              <div className='flex flex-1 items-center justify-center'>
                <Image src='/images/character/byeolsu.png' alt="Byeolsu, the Stella&Inc. brand mascot holding its signature star" width={280} height={314} />
              </div>
            </li>
            <li className='flex flex-col items-center gap-4 rounded-2xl bg-white/70 shadow-[0_8px_24px_rgba(55,75,115,0.08)] px-8 py-14 min-h-[340px]'>
              <p className='font-bold'>Mission</p>
              <div className='flex flex-1 items-center justify-center text-center'>
                {language === 'ko' ? <p className='text-xl'>현실보다 더 특별한 순간을 선물합니다. 평범한 일상을 넘어, 특별한 순간으로.</p>
                  : <p className='text-xl'>Beyond reality, into your story. Your world, more extraordinary than ever.</p>}
              </div>
            </li>
          </ul>

        </div>

      </div>

      <div className="flex md:flex-row flex-col md:gap-0 gap-10 pt-20 pb-20 my-24">
        <div className="md:text-left text-center md:text-4xl text-xl font-bold md:w-2/3 w-full">
          <span className='text-[#FF8197] text-lg tracking-[0.3em]'>
            02.
          </span>
          <h2> Philosophy</h2>
          <div className='hidden md:block w-16 h-[3px] bg-[#FF8197] mt-4 rounded-full' />
        </div>
        <div className="md:text-left text-center text-md self-end md:w-[90%] w-full">
          {language === 'ko' ? <p className='text-2xl'>우리는 여러분의 콘텐츠를 글로벌화하는 파트너로서 함께합니다. <br />
            현실을 너머서 여러분의 이야기로 세상과 더 특별한 순간을 만들어냅니다.</p>
            : <p className='text-2xl'>As your content globalization partner,<br />
              we join realities beyond language barriers.</p>}
        </div>
      </div>

      <div className="flex flex-col md:gap-0 gap-10 pt-20 pb-20">
        <div className="md:text-left text-center md:text-4xl text-xl font-bold md:w-2/3 w-full">
          <span className='text-[#FF8197] text-lg tracking-[0.3em]'>
            03.
          </span>
          <h2> History</h2>
          <div className='hidden md:block w-16 h-[3px] bg-[#FF8197] mt-4 rounded-full' />
        </div>
      </div>
    </div>
    </div>
    {/* <div className="md:text-left text-md md:w-[90%] w-full"> */}
    {/* <History className='md:ml-10' progress={0} range={[0, 10]} i={1}/> */}
    {/* <Roadmap data={roadmapData} className='md:ml-0 ml-20'/> */}
    <Timeline />
    {/* </div> */}

    <div className="max-w-screen-xl mx-auto pt-20 px-6 xl:px-0 ">
      {/* Was a plain centered heading with an invalid `w-34` class (not a
          real Tailwind size — did nothing) — restyled to match the
          numbered 01./02./03. pattern used by every section above it. */}
      <div className="md:text-left text-center md:text-4xl text-xl font-bold w-full pt-20">
        <span className='text-[#FF8197] text-lg tracking-[0.3em]'>
          04.
        </span>
        <h2>{language === 'en' ? 'Trusted by' : '고객사'}</h2>
        <div className='hidden md:block w-16 h-[3px] bg-[#FF8197] mt-4 rounded-full' />
      </div>
      <Slider />
      <div className='h-[30vh]'></div>
    </div>
    <Footer />
  </>
}
