'use client'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function Footer() {
  const { language } = useLanguage()

  return (
    <div className='h-[30vh] bg-white w-full flex flex-col justify-center'>
      <div className='max-w-screen-xl w-full mx-auto flex flex-col items-center gap-6'>
        
        {/* 1. 로고 & 라인 섹션 (개선된 구조) */}
        {/* relative 부모 안에 absolute 선과 relative 로고를 겹칩니다 */}
        <div className='relative w-full flex items-center justify-center'>
          {/* 배경 선: w-full로 부모 너비에 맞춤 (w-screen은 스크롤 발생 위험 있음) */}
          <div className='absolute w-full border-t border-gray-300 top-1/2 left-0 -z-0'></div>
          
          {/* 로고: bg-white와 px-6으로 선을 자연스럽게 가림 */}
          <div className='relative z-10 bg-white px-6'>
            <Image
              src="/stelland_logo_black.svg"
              alt="logo"
              width={160}
              height={30}
              quality={100}
              // h-[16px] 고정을 풀고 h-auto로 설정하여 비율 유지하며 커지게 함
              className="w-28 md:w-40 h-auto"
            />
          </div>
        </div>

        {/* 2. 링크 & 카피라이트 섹션 */}
        <div className='flex flex-col items-center gap-4 text-[12px] text-gray-500'>
          <ul className='flex flex-row gap-4 cursor-pointer flex-wrap justify-center'>
            <li>
              <Link href='https://www.linkedin.com/company/stellandio'>LinkedIn</Link>
            </li>
            <li>
              <Link href='https://stelland.medium.com'>Medium</Link>
            </li>
            <li>
              <Link href='https://www.instagram.com/stelland_official'>Instagram</Link>
            </li>
            <li>
              <Link href='https://blog.naver.com/stelland_official'>Naver Blog</Link>
            </li>
          </ul>
          <p>
            {language == 'en' ? 'ⓒStella&Inc. All Rights Reserved' : 'ⓒ주식회사 스텔라앤 코리아'}
          </p>
        </div>

      </div>
    </div>
  )
}