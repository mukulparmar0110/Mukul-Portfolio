"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-primary/20 blur-xl"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    />
  )
}
