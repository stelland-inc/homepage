import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '@/components/Header/Nav/Body/style.module.scss';
import { blur, translate } from '@/components/Header/anim';


export default function Body({ links, selectedLink, setSelectedLink, closeMenu }: { 
    links: { title: string; href: string }[]; 
    selectedLink: { isActive: boolean; index: number }; 
    setSelectedLink: (link: { isActive: boolean; index: number }) => void; 
    closeMenu: () => void;

}) {

    const getChars = (word: string) => {
        const chars: React.ReactNode[] = [];
        word.split("").forEach( (char, i) => {
            if (word === "About Us" && char === " ") {
                chars.push(<span key={`space_${i}`}>&nbsp;</span>);
            } else {
                chars.push(
                    <motion.span 
                        custom={[i * 0.02, (word.length - i) * 0.01]} 
                        variants={translate} initial="initial" 
                        animate="enter" 
                        exit="exit" 
                        key={char + i}>
                        {char}
                    </motion.span>
                );
            }
        });
        return chars;
    }
    
    return (
        <div className={styles.body}>
        {
            links.map( (link, index) => {
                const { title, href } = link;
                return <Link key={`l_${index}`} href={href} onClick={() => {closeMenu()}}>
                   
                <motion.p 
                    onMouseOver={() => {setSelectedLink({isActive: true, index})}} 
                    onMouseLeave={() => {setSelectedLink({isActive: false, index})}} 
                    variants={blur} 
                    animate={selectedLink.isActive && selectedLink.index != index ? "open" : "closed"}
                    >
                    {getChars(title)}
                </motion.p>
                </Link>
            })
        }
        </div>
    )
}