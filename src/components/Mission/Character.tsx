'use client'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef } from 'react';
import styles from '@/components/Mission/style.module.scss';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Character() { 

  const { language } = useLanguage();
  const paragraph = language == 'en' ? 
                  "Our mission is that to be the realization of your own desires, unlimited growth together, make the dreams come true." 
                  : "우리는 기쁨을 찾아가는 여정, 평범한 일상을 넘어, 즐거운 순간으로 더 특별한 일상을 선물합니다. 여러분의 꿈을 이루어 보세요."

  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const words = paragraph.split(" ");
  return (
    <p 
      ref={container}         
      className={styles.paragraph}
    >
    {
      words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
      })
    }
    </p>
  )
}

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  const amount = range[1] - range[0];
  const step = amount / React.Children.toArray(children).length;
  return (
    <span className={styles.word}>
      {
        React.Children.toArray(children).map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step);
          return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>;
        })
      }
    </span>
  )
}

const Char = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <>
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </>
  )
}
