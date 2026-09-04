'use client'
import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function Content() {
    const { language } = useLanguage();

   return (
    <div className='bg-[#f9a8d4] py-8 px-12 h-full w-full flex flex-col justify-between '>
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
                src="/stelland_logo_black.svg"
                alt="logo" 
                width={160} 
                height={30} 
                quality={100}
                className="w-28 md:w-40 h-auto self-center md:mt-0 mt-1" 
            />
            
            <div className='flex flex-row text-[12px] self-center'>
               <p className='self-center'>{ language == 'en' ? 'ⓒStella&Inc. All Rights Reserved' : 'ⓒStella&Inc. All Rights Reserved' }</p>
            </div>
        </div>
    )
}

const Nav = ({ language }: {language: string}) => {

    return (
        <div className='max-w-screen-xl mx-auto flex justify-start items-start gap-20'>
            <div className='flex flex-col gap-2 text-black md:text-base text-[12px] '>
                <h3 className='mb-2 uppercase text-black font-bold md:text-2xl text-xl'>About</h3>
                <Link href='/' className='w-fit transition-opacity hover:opacity-60'>Home</Link>
                <Link href='/about' className='w-fit transition-opacity hover:opacity-60'>About</Link>
                <Link href='/business' className='w-fit transition-opacity hover:opacity-60'>Business</Link>
                <Link href='/contact' className='w-fit transition-opacity hover:opacity-60'>Contact Us</Link>
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
                <p>No. 221-88-02281</p>
                <p>+82 02-6952-7933</p>
                </> }
            </div>
        </div>
    )
}