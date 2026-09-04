"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import styles from "./Ticker.module.scss"

interface TickerProps {
    direction: "up" | "down"
    className?: string
}

const Ticker: React.FC<TickerProps> = ({ direction, className }) => {
    const tickerRef = useRef<HTMLDivElement>(null)

    return (
        <div className={`${styles.ticker}
                        ${className} h-full w-full
                        ${direction === "down" ? styles.tickerDown : ""}`}
            ref={tickerRef}>
            <div className={`${styles.tickerContent} ${className} h-full w-full`}>
                <TickerItem
                    imageUrl="/images/hero/floating_1.png"
                    alt="Ticker item 1"
                />
                <TickerItem
                    imageUrl="/images/hero/floating_2.png"
                    alt="Ticker item 2"
                />
                <TickerItem imageUrl="/images/hero/floating_3.png"
                    alt="Ticker item 3" />
                {/* Duplicate items to create a seamless loop */}
                <TickerItem
                    imageUrl="/images/hero/floating_4.png"
                    alt="Ticker item 1"
                />
                <TickerItem
                    imageUrl="/images/hero/floating_5.png"
                    alt="Ticker item 2"
                />
                <TickerItem imageUrl="/images/hero/floating_6.png" alt="Ticker item 3" />
            </div>
        </div>
    )
}

interface TickerItemProps {
    imageUrl: string
    alt: string
}

const TickerItem: React.FC<TickerItemProps> = ({ imageUrl, alt }) => {
    return (
        <div className={`${styles.tickerItem} w-full rounded-lg overflow-hidden`}>
            <Image src={imageUrl || "/placeholder.svg"}
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                className="object-cover w-full hover:opacity:30" />
        </div>
    )
}

export default Ticker

