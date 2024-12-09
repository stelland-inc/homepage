import styles from '@/components/Slider/style.module.scss'
import Image from 'next/image'

export default function Slider() {
return (
    <div className={styles.main}>
     <div className={`${styles.rcCarousel} opacity-70`} style={{ '--tiles': 18 } as React.CSSProperties } >
        <div className={styles.rcCarouselStrip}>
            <div className={styles.rcCarouselBox}>
            <div className={`${styles.rcCarouselItem}`}>
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/Amazonfliptoon.png" 
                alt="amazon fliptoon" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem}>
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/BOOKMALKER.png" 
                alt="bookmalker logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem}>
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/Breathe.png" 
                alt="breathe logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem}>
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/Golem.png" 
                alt="golem logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem}>
                <Image 
                className={styles.rcCarouselItemImage} 
                src="/images/brand/GRAPHIC.png" 
                alt="graphic logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem}>
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/kakao.png" 
                alt="kakao logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem}>
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/KENAZ.png" 
                alt="kenaz logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem}>
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/Lezhin.png" 
                alt="lezhin logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem}>
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/MZFamily.png" 
                alt="mzfamily logo" 
                width={100}
                height={100}
                />
            </div>

            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/RockinKorea.png" 
                alt="rockin korea logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/Tapas.png" 
                alt="tapas logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/Tappytoon.png" 
                alt="tappytoon logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/toon.png" 
                alt="tooniverse logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/VbrosTeam.png" 
                alt="vbros team logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/WUXIAWORLD.png" 
                alt="wuxiaworld logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/Yonder.png" 
                alt="gls logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/Amazonfliptoon.png" 
                alt="amazon fliptoon logo" 
                width={100}
                height={100}
                />
            </div>
            <div className={styles.rcCarouselItem} aria-hidden="true">
                <Image 
                className={`${styles.rcCarouselItemImage} rounded-lg`} 
                src="/images/brand/BOOKMALKER.png" 
                alt="bookmalker logo" 
                width={100}
                height={100}
                />
            </div>
            
            </div>
    
    </div>

    </div>

    <div className={`${styles.rcCarousel} opacity-70`} style={{ '--tiles': 18 } as React.CSSProperties }>
    <div className={`${styles.rcCarouselStrip} ${styles.reverse}`}>

        <div className={styles.rcCarouselBox}>

        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Breathe.png" 
            alt="breathe logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Golem.png" 
            alt="golem logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/GRAPHIC.png" 
            alt="graphic logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/kakao.png" 
            alt="kakao logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/KENAZ.png" 
            alt="kenaz logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Lezhin.png" 
            alt="lezhin logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/MZFamily.png" 
            alt="mzfamily logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/RockinKorea.png" 
            alt="rockin korea logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem}>
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Tapas.png" 
            alt="tapas logo" 
            width={100}
            height={100}
            />
        </div>
    
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Tappytoon.png" 
            alt="tappytoon logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/toon.png" 
            alt="tooniverse logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/VbrosTeam.png" 
            alt="vbros team logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/WUXIAWORLD.png" 
            alt="wuxiaworld logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Yonder.png" 
            alt="yonder logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Amazonfliptoon.png" 
            alt="amazon fliptoon logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/BOOKMALKER.png" 
            alt="bookmalker logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Breathe.png" 
            alt="ebay logo" 
            width={100}
            height={100}
            />
        </div>
        <div className={styles.rcCarouselItem} aria-hidden="true">
            <Image 
            className={styles.rcCarouselItemImage} 
            src="/images/brand/Golem.png" 
            alt="golem logo" 
            width={100}
            height={100}
            />
        </div>
    
        </div>
    
    </div>

    </div>
    </div>
  )
}