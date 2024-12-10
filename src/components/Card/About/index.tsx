'use client'
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
export default function About() {
    const { language } = useLanguage();

    return (
        <div className='flex flex-col md:h-[650px] h-[1400px] w-full md:pb-0 pb-[500px] '>

            <div className='flex flex-col gap-5 w-full pb-10'>
                {/* md:text-4xl text-3xl uppercase */}
                <p className='md:text-4xl text-3xl font-bold uppercase text-left md:mt-10 mt-28 md:pt-0 pt-10' >
                    About
                </p>
                {/* <hr className='w-full bg-black text-black' /> */}
            <p className='text-md'>
            <span className='font-bold text-red-400'>[Philosophy]</span>
            {language === 'ko' ? <>{' '}우리는 여러분의 콘텐츠를 글로벌화하는 파트너로서 함께합니다. 현실을 너머서 여러분의 이야기로 세상과 더 특별한 순간을 만들어냅니다.</>
            : <>{' '}Stella & is your global content partner for content globalization. </>}
            </p>
            <p className='text-md'>
            <span className='font-bold text-red-400'>[Mission]</span> 
            {language === 'ko' ? <>{' '}현실보다 더 특별한 순간을 선물합니다, 평범한 일상을 넘어, 특별한 순간으로.</>
            : <>{' '}Beyond reality, into your story, our world, more extraordinary than ever</>}
            </p>

                <button className='bg-black text-white px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-black transition-all duration-300 md:hidden block'>
                    <Link href='/about'> 
                        {language === 'en' ? 'Learn more' : '더 알아 보기'}
                    </Link>
                </button>
            </div>
          
            <ul className='list-none md:flex md:flex-row flex-col justify-center md:gap-14 text-md hidden'>
                <li className='flex flex-col gap-4 md:w-[300px]   w-full justify-center items-center mt-10 md:mb-0 mb-10'>
                    <p className='font-bold'>
                        {language === 'en' ? 'Brand Logo' : '브랜드 로고'}
                        </p>
                    <div className='flex flex-col gap-4 md:h-[330px] '>
                    <Image src='/images/logo/Logo.png' alt="logo" width={100} height={100}/> <br />
                    <Image src='/stelland_logo_black.svg' alt="logo" width={100} height={100} className=''/>
                    </div>
                </li>
                <li className='flex flex-col gap-4 justify-center items-center md:mb-0 mb-10'>
                    <p className='font-bold'>
                        {language === 'en' ? 'Brand Character' : '브랜드 캐릭터'}
                        </p>
                    <Image src='/images/character/stelli_02.png' alt="logo" width={300} height={300}/>
                </li>
                <li className='flex flex-col gap-4 md:w-[300px] w-full justify-center items-center '>
                    <p className='font-bold'>
                        {language === 'en' ? 'Mission' : '미션'}
                        </p>
                    <div className='md:h-[300px] h-[100px] text-md text-center '>
                        {language === 'en' ? '"Beyond reality, into your story, your world, more extraordinary than ever"'
                                           : '현실보다 더 특별한 순간을 선물합니다. 평범한 일상을 넘어, 특별한 순간으로.'}
                       
                    </div>
                </li>
            </ul>


        </div>
    )
}   