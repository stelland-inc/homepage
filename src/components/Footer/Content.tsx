'use client'
import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
// import { ChevronDown } from 'lucide-react';

export default function Content() {
    const { language } = useLanguage();
 
   return (
    <div className='bg-red-200  py-8 px-12 h-full w-full flex flex-col justify-between '>
        {/*  bg-red-200  bg-[#f9a8d4]  FFF0EC*/  }
            <Section1 language={language} />
        <div className=''>
            <Section2 language={language} />
        </div>
    </div>
  )
}

const Section1 = ({ language }: {language: string}) => {
    return (
        <div>
            <Nav language={language} />
        </div>
    )
}

const Section2 = ({ language }: {language: string}) => {
    return (
        <div className='max-w-screen-xl mx-auto flex justify-between md:gap-0 gap-8 items-end text-black'>
            <Image 
                src="/stelland_logo_star.png" 
                alt="logo" 
                width={128} 
                height={16} 
                quality={100}
                className="w-20 md:w-[100px] md:h-[16px] self-center md:mt-0 mt-1" 
            />
            
            {/* <h1 className='text-[10vw] leading-[0.8] mt-10 text-black '>Stelland</h1> */}
            <div className='flex flex-row text-[12px] self-center'> 
               <p className='self-center'>  { language == 'en' ? 'ⓒStella&Inc. All Rights Reserved' : 'ⓒStella&Inc. All Rights Reserved' } </p>
            
{/* 
            <button className='border border-black rounded-sm px-10 py-1 ml-1'>
                <Link href='' onClick={(e) => {e.preventDefault()}} className='flex flex-row justify-between items-start gap-1'>   
                    <p>{language == 'en' ? 'Site map' : '사이트맵'}</p> <ChevronDown size={12} className='self-center' />
                </Link>
            </button> */}

            </div>
            
        </div>
    )
}

const Nav = ({ language }: {language: string}) => {

    return (
        <div className='max-w-screen-xl mx-auto flex justify-start items-start gap-20'>
            <div className='flex flex-col gap-2 text-black md:text-base text-[12px] '>
                <h3 className='mb-2 uppercase text-black font-bold md:text-2xl text-xl'>About</h3>
                <Link href='/'>Home</Link>
                <Link href='/about'>About</Link>
                <Link href='/business'>Business</Link>
                <Link href='/contact'>Contact Us</Link>
            </div>
            <div className='flex flex-col gap-2 text-black md:text-base text-[12px]'>
                <h3 className='mb-2 uppercase text-black font-bold md:text-2xl text-xl'>Let&apos;s Talk</h3>
                { language == 'en' ? <>
                {/* 1111B S Governors Ave #23452 Dover, DE 19904, USA */}
                <p>1111B S Governors Ave</p>
                <p>#23452 Dover, DE 19904</p>
                </> : <>
                <p>6 테헤란로 79길, 강남구</p>
                <p>서울 대한민국</p>
                </> }
                { language == 'en' ? <>
                <p>Business Registration</p>
                <p>No. 221-88-02281</p>
                </> : <>
                <p>사업자등록번호</p>
                <p>221-88-02281</p>
                </> }
            </div>
        </div>
    )
}