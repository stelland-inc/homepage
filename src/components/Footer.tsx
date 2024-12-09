'use client'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function Footer(){
    const {language} = useLanguage()

    return (
        <div className=' h-[30vh] bg-white'>
            <div className='max-w-screen-xl mx-auto flex flex-col items-center justify-center'>
            
            <div className='flex flex-col items-center justify-center w-full'>
                <hr className='w-screen border-t border-gray-300 my-4' />
                <div className='bg-white px-4 absolute'>
                    <Image 
                        src="/stelland_logo_black.svg" 
                        alt="logo" 
                        width={128} 
                        height={16} 
                        quality={100}
                        className="w-20 md:w-[100px] md:h-[16px] self-center md:mt-0 mt-1" 
                    />
                </div>
            </div>
            
        
            <div className='flex flex-col text-[12px] self-center gap-4 pt-4'> 
             <ul className='flex flex-row gap-4 text-gray-500'>
                <li>
                <Link href='https://www.facebook.com/stelland.co.kr'>Facebook</Link>   
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
                <li>
                <Link href='https://toonyz.com'>Toonyz</Link>
                </li>
             </ul>
               <p className='self-center text-gray-500'>  
                { language == 'en' ? 'ⓒStella&Inc. All Rights Reserved' : 'ⓒ주식회사 스텔라앤 코리아' }
              </p>
            </div>
            </div>
        </div>
    )
}