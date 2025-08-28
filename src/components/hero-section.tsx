"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterText } from "@/components/typewriter-text"
import { GlowingButton } from "@/components/glowing-button"
import { useCallback, memo } from "react"

export const HeroSection = memo(function HeroSection() {
  const scrollToAbout = useCallback(() => {
    const aboutElement = document.getElementById("about")
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Hero section with introduction"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-sidebar opacity-90" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left side - Text content */}
          <motion.div className="flex-1 text-center lg:text-left" variants={itemVariants}>
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-primary text-lg font-medium">Hello, I'm</span>
            </motion.div>

            <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance" variants={itemVariants}>
              <span className="neon-text">Alex</span> <span className="text-foreground">Developer</span>
            </motion.h1>

            <motion.div className="mb-8 text-xl md:text-2xl text-muted-foreground" variants={itemVariants}>
              <TypewriterText
                texts={["Full-Stack Developer", "UI/UX Designer", "Tech Innovator", "Problem Solver"]}
                delay={1000}
              />
            </motion.div>

            <motion.p className="text-lg text-muted-foreground mb-8 max-w-2xl text-pretty" variants={itemVariants}>
              Crafting digital experiences with cutting-edge technology and innovative design. Specializing in modern
              web applications that push the boundaries of what's possible.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <GlowingButton variant="primary" size="lg" className="group" aria-label="Contact me via email">
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Get In Touch
              </GlowingButton>

              <GlowingButton variant="secondary" size="lg" className="group" aria-label="Download my CV">
                <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Download CV
              </GlowingButton>
            </motion.div>
          </motion.div>

          {/* Right side - Profile image */}
          <motion.div className="flex-1 flex justify-center lg:justify-end" variants={itemVariants}>
            <div className="relative">
              <motion.div
                className="w-80 h-80 md:w-96 md:h-96 rounded-full glass-card neon-border overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/profile.jpg"
                  alt="Alex Developer - Professional portrait with futuristic lighting"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>

              {/* Floating elements around profile */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary neon-glow"
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-accent neon-glow"
                animate={{
                  y: [10, -10, 10],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToAbout}
            className="rounded-full neon-glow-hover"
            aria-label="Scroll to about section"
          >
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ArrowDown className="h-6 w-6" aria-hidden="true" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  )
})
