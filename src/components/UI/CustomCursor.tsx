"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useCursor } from "@/contexts/CursorContext"

const cursorVariants = {
  default: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    transition: { type: "spring", stiffness: 500, damping: 28 },
  },
  hover: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    transition: { type: "spring", stiffness: 500, damping: 28 },
  },
}

export default function CustomCursor() {
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
      className="pointer-events-none fixed z-50 rounded-full mix-blend-difference"
      animate={cursorVariant === "hover" ? "hover" : "default"}
      variants={cursorVariants}
      style={{
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ x: -100, y: -100 }}
    />
  )
}

