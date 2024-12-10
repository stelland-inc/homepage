'use client';
import styles from '@/components/Header/Nav/style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '@/components/Header/anim';
import Body from '@/components/Header/Nav/Body';
import Footer from '@/components/Header/Nav/Footer';
import Image from '@/components/Header/Nav/Image';

const links = [
  {
    title: "Home",
    href: "/",
    src: "home.jpg"
  },
  {
    title: "About Us",
    href: "/about",
    src: "about_us.png"
  },
  {
    title: "Business",
    href: "/business",
    src: "business.jpg"
  },
  {
    title: "News",
    href: "/news",
    src: "news.jpg"
  },
  {
    title: "Contact",
    href: "/contact",
    src: "contact.png"
  }
]

export default function Index({ closeMenu }: { closeMenu: () => void }) {

  const [selectedLink, setSelectedLink] = useState({isActive: false, index: 0});

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} closeMenu={closeMenu}/>
          <Footer />
        </div>
        <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive} alt='header images'/>
      </div>
    </motion.div>
  )
}