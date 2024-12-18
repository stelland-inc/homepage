'use client';
import styles from '@/components/Hero/style.module.scss'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
    floating1, 
    floating2, 
    floating3, 
    floating4, 
    floating5, 
    floating6, 
    floating7, 
    floating8
} from '@/components/Hero/data'
import { useLanguage } from '@/contexts/LanguageContext';


export default function Hero() {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e: MouseEvent) => {
    const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start: number, target: number, amount: number) => start * (1 - amount) +target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`})

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;
    
    if(xForce != 0 || yForce != 0){
      requestAnimationFrame(animate);
    }
    else{
      cancelAnimationFrame(requestAnimationFrameId as number)
      requestAnimationFrameId = null;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is a common mobile breakpoint
    };
    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main onMouseMove={(e) => {manageMouseMove(e as unknown as MouseEvent)}} className={styles.main}>
      <div ref={plane1} className={styles.plane}>
          <Image 
            src={floating1}
            alt='image'
            width={isMobile ? 200 : 500}
          />
           <Image 
            src={floating2}
            alt='image'
            width={isMobile ? 250 : 500}
          />
          <Image 
            src={floating7}
            alt='image'
            width={isMobile ? 250 : 500}
          />
      </div>
      <div ref={plane2} className={styles.plane}>
          <Image 
            src={floating4}
            alt='image'
            width={isMobile ? 250 : 500}
          />
           <Image 
            src={floating6}
            alt='image'
            width={isMobile ? 250 : 500}
          />
          <Image 
            src={floating8}
            alt='image'
            width={isMobile ? 250 : 500}
          />
      </div>
      <div ref={plane3} className={styles.plane}>
          <Image 
            src={floating3}
            alt='image'
            width={isMobile ? 250 : 500}
          />
           <Image 
            src={floating5}
            alt='image'
            width={isMobile ? 250 : 500}
          />
      </div>
      <div className={`max-w-screen-xl mx-auto z-[99] absolute top-1/2 md:left-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
        {/* ${styles.title}  */}
        <h1 className='text-white md:text-[100px] text-6xl font-bold md:leading-relaxed'>
           Your Ideas, <br/> 
           Our Work 
        </h1>
        {/* text-white text-left text-2xl font-bold pt-80 */}
        <p className='text-white md:text-2xl text-md font-bold'> 
         {language === 'en' ? <>Your Ideas + Our Work = Amplified Value</>
                            : <>여러분의 아이디어, 우리는 확대된 가치로 작품을 만들어 드립니다.</>}
        </p>
      </div>
    </main>
  )
}