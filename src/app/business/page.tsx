'use client';
import { useEffect, useState } from 'react';
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from 'next/link';
import './page.module.scss';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDown } from "lucide-react";
import FlowDiagram from '@/components/FlowChart/FlowDiagram';
import ServicesComponent from '@/components/UI/ServicesComponent';
import AboutToonyzWrapper from '@/components/UI/AboutToonyzWrapper';
import CustomCursor from '@/components/UI/CustomCursor';
import { useCursor } from '@/contexts/CursorContext';
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
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Business() {
    const { language } = useLanguage();
    const [expanded, setExpanded] = useState<string | false>('panel1');
    const { cursorVariant } = useCursor()

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <CustomCursor variant={cursorVariant} />
            <Hero />
            <div className={`max-w-screen-lg mx-auto md:p-0 p-5 `} >
                <div className="relative -top-16 left-0 p-3 text-center inline-flex items-center justify-center w-32 h-32 mb-6 shadow-lg rounded-full bg-white">
                    <Image src='/images/logo/Logo.png' alt="logo" width={80} height={80} />
                </div>

                <div className="pt-0 text-left text-md text-black pb-10">
                    {language === 'en'
                        ? <p className="md:text-xl text-md">
                            We realize your global distribution and localization dreams. <br />
                            We are your global partners, bringing your story beyond reality. <br />
                            We are your global partners, delivering the ineffable feel of the original text.</p>
                        : <p className="md:text-xl text-md">
                            우리는 여러분의 콘텐츠를 글로벌화하는 파트너로서 함께합니다. <br />
                            현실을 너머서 여러분의 이야기로 세상과 더 특별한 순간을 만들어냅니다. <br />
                            귀사의 글로벌 도약을 실현하는 스텔라앤 엔터테인먼트와 함께라면, <br />
                            콘텐츠가 전 세계로 더 많은 사람들에게 전달됩니다. <br />
                            크리에이티브 컨텐츠 회사의 글로벌 파트너로서 여러분의 비즈니스의 성장을 돕겠습니다.</p>
                    }
                </div>

                <div className="flex flex-col gap-5">
                    <h2 className="md:text-6xl text-4xl font-bold mb-4 uppercase pt-20">
                        {language === 'en' ? <>What We Do</> : <>비즈니스</>}
                    </h2>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <>{language === 'en' ? <span className="md:text-xl text-md font-semibold ">- 
Content Localization (web novels, webtoons, comics, animation)</span>
                                : <span className="md:text-xl text-md font-semibold ">- 콘텐츠 현지화(웹소설, 웹툰, 만화, 애니메이션)</span>}
                            </>
                        </AccordionSummary>
                        <AccordionDetails>
                            <>
                                {language === 'en' ? <>We translate and localize your stories into 24 languages.{' '}</>
                                    : <>우리는 여러분의 이야기를 자체 솔루션을 활용하여 24개 언어로 현지화합니다.{' '}</>}
                                <br />
                                {language === 'en' ? 'We proceed with translation together with local native speakers.'
                                    : '현지 특화 원어민과 함께 모든 프로세스를 진행합니다.'}
                            </>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <>{language === 'en' ? <span className="md:text-xl text-md font-semibold ">- Global Distribution</span>
                                : <span className="md:text-xl text-md font-semibold ">- 글로벌 유통</span>}
                            </>
                        </AccordionSummary>
                        <AccordionDetails>
                            <>
                                {language === 'en' ? 'We distribute and manage content worldwide through pipelines tailored to each regional hub.'
                                    : '해외 거점별 파이프라인을 통해 유통 및 관리를 진행합니다.'}
                            </>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <>{language === 'en' ? <span className="md:text-xl text-md font-semibold ">- Operation of Global Story Entertainment Platform "Toonyz" </span>
                                : <span className="md:text-xl text-md font-semibold ">- 글로벌 스토리 엔터테인먼트 플랫폼 "투니즈" 운영</span>}</>
                        </AccordionSummary>
                        <AccordionDetails>
                            <>
                                {language === 'en' ? 'A <Link href="https://toonyz.com" className='text-red-400 underline'>global story entertainment platform</Link> where users can watch short-form animations that fully capture the emotions of web novels.'
                                    : '웹소설의 감정을 그대로 담은 숏폼 애니메이션을 감상할 수 있는 <Link href="https://toonyz.com" className='text-red-400 underline'>글로벌 스토리 엔터테인먼트 플랫폼</Link>입니다.'}
                            </>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                            <>{language === 'en' ? <span className="md:text-xl text-md font-semibold ">- Operation of a Short-form Animation Production Studio</span>
                                : <span className="md:text-xl text-md font-semibold ">- 숏폼 애니메이션 제작 스튜디오 운영</span>}
                            </>
                        </AccordionSummary>
                        <AccordionDetails>
                            <>
                                {language === 'en' ? <span>We operate an in-house studio that reinterprets and produces web novels and webtoons as short-form animations.</span>
                                    : <span>웹소설, 웹툰 기반으로 숏폼 애니메이션으로 재해석·제작하는 인하우스 스튜디오를 운영하고 있습니다.</span>}
                            </>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <div className="md:h-[20vh] h-0"></div>
            {/* Toonyz section */}
            <AboutToonyzWrapper />
            <div className='md:h-[20vh] h-0'></div>
            {/* Features & achievement Section */}
            <ServicesComponent />
            <div className='md:h-[20vh] h-[15vh]'></div>
            <Footer />
        </div>
    );
}
