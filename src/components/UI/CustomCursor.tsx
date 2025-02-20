"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useCursor } from "@/contexts/CursorContext"

interface CustomCursorProps {
  variant: 'default' | 'hover';
}

const cursorVariants = {
  default: {
    zIndex: 1000,
    width: 32,
    height: 32,
    backgroundColor: "black",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    transition: { type: "spring", stiffness: 500, damping: 28 },
  },
  hover: {
    zIndex: 1000,
    width: 64,
    height: 64,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    transition: { type: "spring", stiffness: 500, damping: 28 },
  },
}

const CustomCursor: React.FC<CustomCursorProps> = ({ variant }) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const { cursorVariant } = useCursor()

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed z-[99] rounded-full mix-blend-difference"
      animate={cursorVariant === "hover" ? "hover" : "default"}
      variants={cursorVariants}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: "translate(-50%, -50%)",
      }}
      initial={false}
    />
  )
}

export default CustomCursor

