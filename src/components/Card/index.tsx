'use client'
import styles from '@/components/Card/style.module.scss';
import { motion } from 'framer-motion';
import { useRef } from 'react';


interface CardProps {
    i: number;
    progress: number;
    range: [number, number];
    children?: React.ReactNode;
    color: string;
  }

const Card: React.FC<CardProps> = ({ children, ...props }) => {

  const container = useRef(null);
 
  return (
    <div {...props} ref={container} className={`max-w-screen-xl mx-auto ${styles.cardContainer}`}>
      <motion.div 
        style={{backgroundColor: props.color, top:`calc(-5vh + ${props.i * 25}px)`}} 
        className={`${styles.card} w-full`}
      >
        <div className={`${styles.body} md:pb-0`}>
        {/* <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            <span>
              <a href={url} target="_blank">See more</a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black"/>
              </svg>
            </span>
          </div>

          <div className={styles.imageContainer}>
            <motion.div
              className={styles.inner}
              style={{scale: imageScale}}
            >
              <Image
                fill
                src={`/images/hero/${src}`}
                alt="image" 
              />
            </motion.div>
          </div>

        </div> */}

            {children}
        </div>
      </motion.div>
    </div>
  )
}

export default Card