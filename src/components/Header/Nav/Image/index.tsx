import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/components/Header/Nav/Image/style.module.scss';
import { opacity } from '@/components/Header/anim';

export default function Index({src, isActive, alt}: {src: string, isActive: boolean, alt: string}) {
  return (
    <motion.div variants={opacity} initial="initial" animate={isActive ? "open" : "closed"} className={styles.imageContainer}>
        <Image 
        src={`/images/header/${src}`}
        fill={true}
        alt={alt}
        />
    </motion.div>
  )
}