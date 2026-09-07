"use client"

import { motion } from "framer-motion"

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden py-16" style={{ backgroundColor: '#FDFCFB' }}>
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, #FDFCFB, transparent, #FDFCFB)' }} />
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, ease: "linear", duration: 20 }}
      >
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4"
              style={{
                WebkitTextStroke: `1px ${index % 2 === 0 ? '#374b73' : '#FF8197'}`,
              }}
            >
             Stella&Inc. - Imagine infinity
            </span>
            <svg viewBox="0 0 100 100" className="h-8 w-8 shrink-0 md:h-12 md:w-12">
              <path
                d="M50,2 L62.93,32.2 L95.65,35.17 L70.92,56.8 L78.21,88.83 L50,72 L21.79,88.83 L29.08,56.8 L4.35,35.17 L37.07,32.2 Z"
                fill={index % 2 === 0 ? '#FFD0A5' : '#FF8197'}
              />
            </svg>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

