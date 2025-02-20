'use client'
import gsap from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';
import { applyTypingAnimation } from '@/utils/typingAnimation';
import { initTextAnimation } from '@/utils/randomTextAnimation';
const BusinessAchievementComponent = () => {
    const { language } = useLanguage();
    const textRef = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        tl.fromTo(container.current, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.5
        }).to(container.current, {
            y: -50,
            opacity: 0,
            duration: 0.5
        });
    }, [container]);

    useEffect(() => {
        const numberElements = document.querySelectorAll('[data-number]');
        numberElements.forEach((element, index) => {
            initTextAnimation(`[data-number]:nth-of-type(${index + 1})`, 
                [element.textContent || '', element.textContent || '', element.textContent || '', element.textContent || ''], 
                {
                    chars: '!@#$%^',
                    delay: 5000 + (index * 200), 
                }
            );
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div ref={container}>
                <div ref={textRef} className=' grid grid-cols-4 gap-1 '>
                <span data-number className="effect text-9xl">+8,000</span>
                <span className="col-span-3 text-5xl md:self-center md:text-right">
                    {language === 'ko' ? <>웹툰 현지화 회차 수</> : <>Total count of our webtoon localizations</>}
                </span>
                <span data-number className="effect text-9xl">+6,000</span>
                <span className="col-span-3 text-5xl md:self-center md:text-right">
                    {language === 'ko' ? <>웹소설 현지화 회차 수</> : <>Total count of our webnovel localizations</>}
                </span>
                <span data-number className="effect text-9xl">+2,000</span>
                <span className="col-span-3 text-5xl md:self-center md:text-right">
                    {language === 'ko' ? <>소속 현지 크리에이터 수</> : <>Our pool of talented creators</>}
                </span>
                <span data-number className="effect text-9xl">+20</span>
                <span className="col-span-3 text-5xl md:self-center md:text-right">
                    {language === 'ko' ? <>국내외 IP 보유</> : <>Size of our IP portfolio</>}
                </span>
                </div>
            </div>
        </div>
    );
};

export default BusinessAchievementComponent;