"use client"

import { motion } from "framer-motion"

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-white py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-transparent px-4"
              style={{
                WebkitTextStroke: "1px rgb(244 114 182 / 0.55)", // brand pink, tinted
              }}
            >
             Stella&Inc. — Imagine infinity
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

