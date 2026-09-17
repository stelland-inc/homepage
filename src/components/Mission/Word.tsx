'use client'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import React, { useRef } from 'react';
import styles from '@/components/Mission/style.module.scss';

export default function Paragraph({paragraph, thin, revealOnScroll = true, style}: {paragraph: string; thin?: boolean; revealOnScroll?: boolean; style?: React.CSSProperties}) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  })

  const words = paragraph.split(" ")
  return (
    <p
      ref={container}
      className={`md:text-xl !text-md ${styles.paragraph} ${thin ? styles.thin : ''}`}
      style={style}
    >
    {
      words.map( (word, i) => {
        // The scroll-linked fade-in reads great inside a normal document
        // flow (the homepage Mission section), but the closing section is
        // a short, fixed-position screen — there isn't enough scroll
        // travel through it for the words to ever reach full opacity, so
        // they sit stuck half-dim. Render those callers as plain,
        // fully-opaque text instead of wiring up the same effect.
        if (!revealOnScroll) {
          return <span key={i} className={styles.word}>{word}</span>
        }
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })
    }
    </p>
  )
}

const Word = ({children, progress, range}: {children: string, progress: MotionValue<number>, range: [number, number]}) => {
  const opacity = useTransform(progress, range, [0, 1])
  return <span className={styles.word}>
    <span className={styles.shadow}>{children}</span>
    <motion.span style={{opacity: opacity}}>{children}</motion.span>
  </span>
}