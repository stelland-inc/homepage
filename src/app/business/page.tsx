'use client';
import { useState } from 'react';
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ChevronDown } from "lucide-react";


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `0px solid ${theme.palette.divider}`,
    padding: '10px',
    '&:not(:last-child)': {
      borderBottom: 1,
    },
    '&::before': {
      display: 'block',
    },
  }));
  
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ChevronDown size={20} className='text-gray-300' />}
      {...props}
    />
  ))(({ theme }) => ({
    padding: '10px',
    // backgroundColor: 'white',
    // flexDirection: 'row-reverse',
    // [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    //   {
    //     transform: 'rotate(90deg)',
    //   },
    // [`& .${accordionSummaryClasses.content}`]: {
    //   marginLeft: theme.spacing(1),
    // },
    // ...theme.applyStyles('dark', {
    //   backgroundColor: 'white',
    // }),
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  


export default function Business() {
    const { language } = useLanguage();

    const [expanded, setExpanded] = useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
        };
   
    return <div>
        <Hero />

        <div className={`max-w-screen-lg mx-auto md:p-0 p-5  `} >
            {/*  ref={mainRef} ${isVisible ? styles.fadeEffect : ''} */}

        <div className="relative -top-16 left-0 p-3 text-center inline-flex items-center justify-center w-32 h-32 mb-6 shadow-lg rounded-full bg-white">
        <Image src='/images/logo/Logo.png' alt="logo" width={80} height={80}/>
        </div>

            <div className="pt-0 text-left text-md text-black pb-10">
            {language === 'en' 
            ? <p className="md:text-xl text-md">
                We realize your global distribution and localization dreams. <br />
                We are your global partners, bringing your story beyond reality. <br /> 
                Your world, more extraordinary than ever. <br />
                We will become your global partners, enhancing the flavor of the original text.</p>
            : <p className="md:text-xl text-md">
                우리는 여러분의 콘텐츠를 글로벌화하는 파트너로서 함께합니다. <br />
                현실을 너머서 여러분의 이야기로 세상과 더 특별한 순간을 만들어냅니다. <br />
                귀사의 글로벌 도약을 실현하는 스텔라앤 엔터테인먼트와 함께라면, <br/> 
                콘텐츠가 전 세계로 더 많은 사람들에게 전달됩니다. <br /> 
                크리에이티브 컨텐츠 회사의 글로벌 파트너로서 여러분의 비즈니스의 성장을 돕겠습니다.</p>
            }
            </div>
        
        <div className="flex flex-col gap-5">
            <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase pt-20">
                {language === 'en' ? <>What We Do</> : <>비즈니스</>}
            </h2>

            <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{language === 'en' ? <p className="md:text-xl text-md">- Localization, Webnovels & Webtoons Production</p> 
                                       : <p className="md:text-xl text-md">- 번역, 웹소설 & 웹툰 제작</p> }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                {language === 'en' ? <>We translate your story into 24 languages and localize it.{' '}</> 
                                   : <>우리는 여러분의 이야기를 24개 언어로 번역하고 현지화합니다.{' '}</>}
                                   <br/>
                {language === 'en' ? 'We proceed with translation together with local native speakers.' 
                                   : '현지 특화 원어민과 함께 번역을 진행합니다.'}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <Typography>{language === 'en' ? <p className="md:text-xl text-md">- Originals Development & Production (IP management, webtoons, novels)</p> 
                                       : <p className="md:text-xl text-md">- 오리지널 개발 및 제작 (IP 관리, 웹툰, 소설)</p> }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                {language === 'en' ? 'We develop and produce original stories and provide the optimal platform for entering the global market.' 
                                   : '자체 IP 제작 관리와 글로벌 시장 진출을 위해 최적의 플랫폼을 제공하며, 웹툰 및 소설 제작을 진행합니다.'}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary  aria-controls="panel3d-content" id="panel3d-header">
                <Typography>{language === 'en' ? <p className="md:text-xl text-md">- Media, Licensing, Adaptations</p> 
                                       : <p className="md:text-xl text-md">- 미디어, 라이센싱, 적용</p> }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                {language === 'en' ? 'We proceed with media, licensing, and localization through a systematic process.' 
                                   : '체계적인 프로세스로 미디어, 라이센싱과 현지화 적용을 진행합니다.'}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary  aria-controls="panel4d-content" id="panel4d-header">
                <Typography>{language === 'en' ? <p className="md:text-xl text-md">- Toonyz Platform Development, Design, Operation, Marketing</p> 
                                       : <p className="md:text-xl text-md">- Toonyz 플랫폼 개발, 디자인, 운영, 마케팅</p> }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                {language === 'en' ? 'We provide Toonyz, the optimal platform for entering the global market.' 
                                  : '글로벌 스토리 플랫폼 투니즈 플랫폼을 통해 여러분의 글로벌 시장 진출을 위한 최적의 플랫폼을 제공합니다.'}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                <Typography>{language === 'en' ? <p className="md:text-xl text-md">- Global Partnerships & Marketing</p> 
                                       : <p className="md:text-xl text-md">- 해외 유통 및 글로벌 파트너십 & 마케팅</p> }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                {language === 'en' ? 'We expand our business to more than six foreign languages globally.' 
                                   : '해외 거점별 파이프 라인 보유와 6개 이상의 외국어 글로벌 배포 및 홍보를 진행합니다.'}
                </Typography>
                </AccordionDetails>
            </Accordion>
            </div>


            <div className="md:h-[10vh] h-0"></div>

            <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase md:mt-0 mt-40">
                {language === 'en' ? <>SERVICE</> : <>서비스</>}
            </h2>
                   <ul className="flex md:flex-row flex-col gap-5 justify-center items-center pt-10 text-xl">
                    <li className="flex flex-col gap-5 justify-center items-center md:w-60 w-48">
                    <Image src='/icons/business_01.png' alt='main icon 01' width={120} height={100} className="p-1 rounded-full border-gray-200 bg-gray-200" />
                    <p className="w-full h-10 text-center">{language === 'en' ? 'IP Management' : 'IP 매니지먼트'}</p>
                    </li>
                    <li className="flex flex-col gap-5 justify-center items-center md:w-60 w-48">
                    <Image src='/icons/business_04.png' alt='main icon 01' width={120} height={100} className="p-1 rounded-full border-gray-200 bg-gray-200"/>
                    <p className="w-full h-10 text-center">{language === 'en' ? 'Localization' : '현지화 번역'}</p>
                    </li>
                    <li className="flex flex-col gap-5 justify-center items-center  md:w-60 w-48">
                    <Image src='/icons/business_02.png' alt='main icon 01' width={120} height={100} className="p-1 rounded-full border-gray-200 bg-gray-200"/>
                    <p className="w-full h-10 text-center">{language === 'en' ? 'Media, Licensing, Adaptations' : '미디어, 라이센싱, 적용'}</p>
                    </li>
                    <li className="flex flex-col gap-5 justify-center items-center  md:w-60 w-48">
                    <Image src='/icons/business_03.png' alt='main icon 01' width={120} height={100} className="p-1 rounded-full border-gray-200 bg-gray-200"/>
                    <p className="w-full h-10 text-center">{language === 'en' ? 'Creator incubating' : '크리에이터 인큐베이팅'}</p>
                    </li>
                 </ul>

                 <div style={{ height: '10vh' }}></div>

            <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase">
                {language === 'en' ? <>PERFORMANCE</> : <>성과</>}
            </h2>

            <ul className="flex flex-col gap-5 pt-10">
                    <li className="text-lg flex md:flex-row flex-col gap-5"> 
                        <span className="text-5xl">+8,000</span>
                    <p className="text-md self-center">  📊 웹툰 현지화 회차 수
                    The total count of Webtoon localizations
                    </p>
                    </li>
                    <li className="text-lg flex md:flex-row flex-col gap-5"> 
                        <span className="text-5xl">+6,000</span>
                        <p className="text-md self-center"> 
                         📈 웹소설 현지화 회차 수
                        The total count of Webnovel localizations
                        </p>
                    </li>
                    <li className="text-lg flex md:flex-row flex-col gap-5"> 
                       <span className="text-5xl">+2,000</span>
                    <p className="text-md self-center"> 🪄 소속 현지 크리에이터 수
                    The pool of 2K creative talents
                    </p>
                    </li>
                    <li className="text-lg flex md:flex-row flex-col gap-5"> 
                        <span className="text-5xl">+20</span>
                    <p className="text-md self-center"> 🌏 국내외 IP 보유
                    Our talent acquisition in worldwide
                    </p>
                    </li>
                </ul>

                {/* Toonyz section */}

              <div className='flex flex-col justify-between items-center md:h-[650px] h-[100px] md:mb-0 mb-40 md:p-0 pt-[110px]'>
               <div className='flex flex-row justify-between items-center w-full pt-[50px]'>
                <div className='flex flex-col justify-start items-start gap-4'>

                    <Image src='/toonyzLogo.png' alt='toonyz' width={150} height={100}/>
                    <p className='md:text-2xl text-md font-bold'>Global story platform</p>
                    <p className='md:text-2xl text-md'>
                  { language === 'en' ? <>
                                        Explore a world of diverse genres and captivating stories with us. <br /> 
                                        Enjoy your favorite story universe, between us, on Toonyz!</>
                                      : <> 다양한 장르와 환상적인 이야기를 함께 즐기세요. <br /> 
                                        여러분이 좋아하는 이야기 세계로 떠나보세요.<br /> 우리와 투니즈에서 함께 하세요!</>
                  } <br/>
    
                    </p>
                    <button className='md:w-[250px] w-full bg-black text-white px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-black transition-all duration-300'>
                        <Link href='/business'>
                         {language === 'en' ? 'Go to Toonyz' : 'Toonyz 바로가기'}
                        </Link>
                    </button>
                </div>
                <div className='md:right-0 right-24 md:top-12 bottom-[0px] md:h-auto h-[300px] md:overflow-visible overflow-hidden'>
                    <Image 
                    src='/images/toonyz_screen.png' 
                    alt='toonyz screen' 
                    width={355} 
                    height={650}
                    objectFit=''
                    className='md:w-[355px] md:h-[650px] w-[200px] h-[360px] object-contain' 
                    />
                </div>
            </div>
        </div>


                <div className="md:h-[10vh] h-[50vh]"></div>
                <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase">
                {language === 'en' ? <>HOW IT WORKS</> : <>프로세스</>}
                </h2>

                    <div className='flex flex-col w-full justify-center items-center'>
                   {language === 'en' ? 
                    <Image src='/images/process_en.png' alt='process english 1443×906' width={900} height={300} className="md:w-[900px] md:h-auto w-[400px] h-auto" />
                   : <Image src='/images/process_ko.png' alt='process korean 1443×906' width={900} height={300} className="md:w-[900px] md:h-auto w-[400px] h-auto" />
                    }
                    </div>
        </div>
        </div>
        <div className='md:h-[20vh] h-[15vh]'></div>
        
        {/* <p className="text-center text-sm"> For media, press, interview requests, please email: hello@stelland.io </p>

        <p className="text-center text-sm pb-20"> For business inquiries, please email: lisa@stelland.io </p> */}
        <Footer />
    </div>
}