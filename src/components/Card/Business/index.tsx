import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Business() {
    const { language } = useLanguage();

    return (
    <div className='flex md:flex-row flex-col justify-center items-center max-w-screen-xl mx-auto md:h-[600px] h-[900px] md:pb-0 md:pt-0 pt-[500px] pb-[900px]'>
        <Image src='/stelland_square.png' alt='business image' width={350} height={350} className='md:hidden block rounded-full md:-mt-0 -mt-96 md:w-1/2 w-1/2 md:mb-0 mb-10' />
{/* stelland_square */}
    <div className='w-[250px] md:w-[40%] lg:w-4/12 px-12 md:px-0 mr-auto ml-auto md:-mt-90 md:block hidden'>
        <div className="relative flex flex-col min-w-0 break-word md:mb-6 shadow-lg bg-white rounded-md">
             <Image alt="business image" src="/stelland_square.png" width={400} height={400} className=" rounded-md" />
             <div className="relative p-8 mb-4">
                 <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block h-[95px] -top-[94px]">
                <polygon points="-30,95 583,95 583,65" className="text-white fill-current">
                </polygon>        {/* [#304F72] */}
         
                </svg>
                <h4 className="md:text-xl text-[10px] font-bold text-black">
                   {language === 'ko' ? '여러분의 글로벌 진출을 도와드려요.' : 'We help your global expansion'}
                 </h4>
                <p className="md:text-base text-[10px] font-light mt-2 text-black">
                    {language === 'ko' ? '스텔라앤 AI 번역/현지화 솔루션으로 웹툰 현지화 작업이 더욱 간편하고 효율적으로 여러분의 비즈니스를 도와드립니다.' 
                                       : 'With our AI webtoon localization solution, experience a more convenient and efficient way to grow your business.'}
                </p>
            </div>
        </div>
    </div>
    
    <div className="flex flex-col gap-4 w-full md:w-1/2 md:p-0 p-0">
        <h1 className='md:text-4xl text-3xl uppercase font-bold mb-5 text-black'>Services</h1>
    <ul className='grid grid-cols-2 gap-2 '>
        <li className='flex flex-col gap-4 md:w-1/2 w-full'>
        <Image src='/icons/business_01.png' alt='main icon 01' width={100} height={100} className="p-1 rounded-full border-gray-200 bg-gray-200" />
            <p className='font-bold uppercase text-black md:text-xl text-sm'>{language === 'ko' ? 'IP 관리' : 'IP management'}</p>
            <p className='font-bold uppercase text-black md:text-sm text-sm'>{language === 'ko' ? '체계적인 콘텐츠와 IP 생산 및 제작' : 'Systematic content IP production'}</p>
        </li>
        <li className='flex flex-col gap-4 md:w-1/2 w-full'>
        <Image src='/icons/business_04.png' alt='main icon 02' width={100} height={100} className="p-1 rounded-full border-gray-200 bg-gray-200" />
            <p className='font-bold uppercase text-black md:text-xl text-sm'>{language === 'ko' ? '콘텐츠 현지화' : 'Localization'}</p>
            <p className='font-bold uppercase text-black md:text-sm text-sm'>{language === 'ko' ? '24+ 언어 번역 및 디자인 현지화' : 'Translation into 24+ languages and Design Localization'}</p>
        </li>
        <li className='flex flex-col gap-4 md:w-1/2 w-full'>
        <Image src='/icons/business_05.png' alt='main icon 03' width={100} height={100} className="p-1 rounded-full border-gray-200 bg-gray-200" />
            <p className='font-bold uppercase text-black md:text-xl text-sm'>{language === 'ko' ? '글로벌 유통' : 'Global Distribution'}</p>
            <p className='font-bold uppercase text-black md:text-sm text-sm'>{language === 'ko' ? <>글로벌 유통 및 <br/>  판매</> : 'Global Distribution and Sales'}</p>
        </li>
        <li className='flex flex-col gap-4 md:w-1/2 w-full'>
        <Image src='/icons/business_03.png' alt='main icon 01' width={100} height={100} className="p-1 rounded-full border-gray-200 bg-gray-200" />
            <p className='font-bold uppercase text-black md:text-xl text-sm'>{language === 'ko' ? '크리에이터 육성' : 'Incubating creators'}</p>
            <p className='font-bold uppercase text-black md:text-sm text-sm'>{language === 'ko' ? <>콘텐츠 제작 및 <br/> 크리에이터 육성</> : 'Content Production and Creator Incubation'}</p>
        </li>
    </ul>
 </div>
</div>
    )
}