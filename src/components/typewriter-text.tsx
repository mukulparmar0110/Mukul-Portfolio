"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  texts: string[]
  delay?: number
  speed?: number
}

export function TypewriterText({ texts, delay = 0, speed = 100 }: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    const fullText = texts[currentTextIndex]

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < fullText.length) {
            setCurrentText(fullText.substring(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(fullText.substring(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    )

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentTextIndex, texts, speed, isStarted])

  return (
    <div className="h-8 flex items-center">
      <span className="neon-text font-semibold">
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="ml-1"
        >
          |
        </motion.span>
      </span>
    </div>
  )
}
