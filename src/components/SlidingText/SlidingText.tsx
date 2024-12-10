import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './style.module.scss';

const SlidingText = () => {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    const directionRef = useRef(-1);
    const { language } = useLanguage();
  
    const xPercentRef = useRef(0); // Using useRef to store xPercent
  
    // Wrap the animate function in useCallback
    const animate = useCallback(() => {
      if (xPercentRef.current < -100) {
        xPercentRef.current = 0;
      } else if (xPercentRef.current > 0) {
        xPercentRef.current = -100;
      }
      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercentRef.current });
        gsap.set(secondText.current, { xPercent: xPercentRef.current });
      }
      requestAnimationFrame(animate);
      xPercentRef.current += 0.1 * directionRef.current;
    }, []); // Empty dependency array ensures this function is only created once
  
    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      if (slider.current) {
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
                onUpdate: e => directionRef.current = e.direction * -1
            },
            x: "-500px",
        });
      }
      requestAnimationFrame(animate);
    }, [animate]);
  
    return (
        <main className={styles.main}>
            <div className='bg-red-200 w-full h-full'>
                <div className='flex flex-col justify-start items-start h-full max-w-screen-xl mx-auto'>
                    <div className='text-white text-left text-2xl font-bold mt-[35vh]'>
                        {language === 'en' ? 
                            <p className='md:pl-0 pl-10'>We are your content globalization partner.</p> 
                            : 
                            <p className='md:pl-0 pl-10'>스텔라앤은 여러분의 콘텐츠 글로벌화 여정을 함께 합니다.</p>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.sliderContainer}>
                <div ref={slider} className={styles.slider}>
                    <p ref={firstText}>Your Story, Our Craft</p>
                    <p ref={secondText}>Your Story, Our Craft</p>
                </div>
            </div>
        </main>
    )
}

export default SlidingText;
