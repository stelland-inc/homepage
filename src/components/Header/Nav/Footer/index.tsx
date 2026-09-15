import styles from '@/components/Header/Nav/Footer/style.module.scss';
import { translate } from '@/components/Header/anim';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className={styles.footer}>
            {/* Moved in from the header bar — on mobile that pill's
                fixed vertical-centering offset was tuned for its desktop
                size and pushed it half off the top of the screen at the
                bar's shorter mobile height. Living here avoids that
                entirely and keeps the cramped bar to just logo + burger. */}
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate} initial="initial"
                    animate="enter"
                    exit="exit">
                    <button
                        type="button"
                        onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
                        className='flex flex-row items-center text-gray-600 hover:underline cursor-pointer transition-all duration-150'>
                    <Image
                        src="/globe.svg"
                        alt="Language"
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
                    {language === 'en' ? 'ENG' : 'KR'}
                    </button>
                </motion.li>
            </ul>
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