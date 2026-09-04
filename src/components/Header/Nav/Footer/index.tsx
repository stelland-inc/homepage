import styles from '@/components/Header/Nav/Footer/style.module.scss';
import { translate } from '@/components/Header/anim';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
                    <Link href="https://stelland.medium.com" className='flex flex-row items-center text-gray-600 hover:underline cursor-pointer transition-all duration-150'>
                    <Image
                        src="/images/logo/medium_logo.png"
                        alt="Medium Logo"
                        width={0}
                        height={0}
                        sizes="100vh"
                        style={{
                            height: '20px',
                            width: '20px',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderRadius: '25%',
                            border: '1px solid #eee',
                            marginRight: '5px',
                            backgroundColor: 'black'
                        }}
                    />
                    Medium
                    </Link>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <Link href="https://www.instagram.com/stelland_official" className='flex flex-row items-center text-gray-600 hover:underline cursor-pointer transition-all duration-150'>
                    <Image
                        src="/images/logo/instagram_black_logo.png"
                        alt="Instagram Logo"
                        width={0}
                        height={0}
                        sizes="100vh"
                        style={{
                            height: '20px',
                            width: '20px',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderRadius: '25%',
                            border: '1px solid #eee',
                            marginRight: '5px',
                            backgroundColor: 'white'
                        }}
                    />
                    Instagram
                    </Link>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <Link href="https://blog.naver.com/stelland_official" className='flex flex-row items-center text-gray-600 hover:underline cursor-pointer transition-all duration-150'>
                    <Image
                        src="/images/logo/naver_blog_logo.png"
                        alt="Naver Logo"
                        width={0}
                        height={0}
                        sizes="100vh"
                        style={{
                            height: '20px',
                            width: '20px',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderRadius: '25%',
                            border: '1px solid #eee',
                            marginRight: '5px',
                            backgroundColor: 'white'
                        }}
                    />
                    
                    Naver Blog
                    
                    </Link>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <Link href="https://www.linkedin.com/company/stellandio" className='flex flex-row items-center text-gray-600 hover:underline cursor-pointer transition-all duration-150'>
                    <Image
                        src="/images/logo/LinkedIn_logo.png"
                        alt="LinkedIn Logo"
                        width={0}
                        height={0}
                        sizes="100vh"
                        style={{
                            height: '20px',
                            width: '20px',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderRadius: '25%',
                            border: '1px solid #eee',
                            marginRight: '5px',
                            backgroundColor: 'black'
                        }}
                    />
                    
                    LinkedIn
                    
                    </Link>
                </motion.li>
            </ul>

        </div>
    )
}