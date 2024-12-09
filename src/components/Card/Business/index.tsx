import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Business() {
    const { language } = useLanguage();

    return (
    <div className='flex md:flex-row flex-col justify-center items-center max-w-screen-xl mx-auto md:h-[600px] h-[900px] md:pb-0 md:pt-0 pt-[500px] pb-[900px]'>
        <Image src='/images/header/about_us.png' alt='business image' width={300} height={300} className='md:hidden block' />

    <div className='w-[250px] md:w-6/12 lg:w-4/12 px-12 md:px-0 mr-auto ml-auto md:-mt-90 md:block hidden'>
        <div className="relative flex flex-col min-w-0 break-word w-full md:mb-6 shadow-lg bg-gray-200 rounded-md">
             <Image alt="business image" src="/images/header/about_us.png" width={300} height={300} className="self-center" />
             <div className="relative p-8 mb-4">
                 <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block h-[95px] -top-[94px]">
                <polygon points="-30,95 583,95 583,65" className="text-gray-200 fill-current">
                </polygon>        {/* [#304F72] */}
         
                </svg>
                <h4 className="md:text-xl text-[10px] font-bold text-black">
                   {language === 'ko' ? '여러분의 글로벌 진출을 도와드려요.' : 'Great for your awesome project'}
                 </h4>
                <p className="md:text-base text-[10px] font-light mt-2 text-black">
                    {language === 'ko' ? '스텔라앤 AI 번역/현지화 솔루션으로 웹툰 현지화 작업이 더욱 간편하고 효율적으로 여러분의 비즈니스를 도와드립니다.' 
                                       : 'AI content localization solution for webtoon localization work is more convenient and efficient to help your business.'}
                </p>
            </div>
        </div>
    </div>
    
    <div className="flex flex-col gap-4 w-full md:w-1/2 md:p-0 p-0">
        <h1 className='md:text-4xl text-3xl font-bold mb-5'>Services</h1>
    <ul className='grid grid-cols-2 gap-4'>
        <li className='flex flex-col gap-4 md:w-1/2'>
        <Image src='/icons/main-img01.png' alt='main icon 01' width={80} height={80} className="p-5 rounded-full border-gray-200 bg-gray-200" />
            <p className='font-bold uppercase'>{language === 'ko' ? 'IP 관리' : 'IP management'}</p>
            <p>{language === 'ko' ? '체계적인 콘텐츠와 IP 생산 및 제작' : 'Systematic content IP production'}</p>
        </li>
        <li className='flex flex-col gap-4 md:w-1/2'>
        <Image src='/icons/main-img02.png' alt='main icon 02' width={80} height={80} className="p-5 rounded-full border-gray-200 bg-gray-200" />
            <p className='font-bold uppercase'>{language === 'ko' ? '현지화' : 'Localization'}</p>
            <p>{language === 'ko' ? '+24 언어 번역 및 디자인 현지화' : '+24 Language Translation and Design Localization'}</p>
        </li>
        <li className='flex flex-col gap-4 md:w-1/2'>
        <Image src='/icons/main-img03.png' alt='main icon 03' width={80} height={80} className="p-5 rounded-full border-gray-200 bg-gray-200" />
            <p className='font-bold uppercase'>{language === 'ko' ? '웹툰화' : 'Webtoonification'}</p>
            <p>{language === 'ko' ? '웹툰 제작 및 편집' : 'Webtoon Production and Editing'}</p>
        </li>
        <li className='flex flex-col gap-4 md:w-1/2'>
        <Image src='/icons/main-img04.png' alt='main icon 01' width={80} height={80} className="p-5 rounded-full border-gray-200 bg-gray-200" />
            <p className='font-bold uppercase'>{language === 'ko' ? '크리에이터 육성' : 'Incubating creators'}</p>
            <p>{language === 'ko' ? '콘텐츠 제작 및 크리에이터 육성' : 'Content Production and Creator Incubation'}</p>
        </li>
    </ul>
 </div>
</div>
    )
}