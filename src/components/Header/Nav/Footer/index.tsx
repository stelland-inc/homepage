import styles from '@/components/Header/Nav/Footer/style.module.scss';
import { translate } from '@/components/Header/anim';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={styles.footer}>
            {/* <ul>
                <motion.li 
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <span className='hover:underline cursor-pointer transition-all duration-150'>Facebook</span>
                </motion.li>
            </ul> */}
            <ul>
                <motion.li  
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <Link href="https://stelland.medium.com" className='text-gray-600 hover:underline cursor-pointer transition-all duration-150'>Medium</Link>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <Link href="https://www.instagram.com/stelland_official" className='text-gray-600 hover:underline cursor-pointer transition-all duration-150'>Instagram</Link>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <Link href="https://blog.naver.com/stelland_official" className='text-gray-600 hover:underline cursor-pointer transition-all duration-150'>Naver Blog</Link>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <Link href="https://toonyz.com" className='text-gray-600 hover:underline cursor-pointer transition-all duration-150'>Toonyz</Link>
                </motion.li>
            </ul>
            
        </div>
    )
}