"use client"

import { motion, useInView, easeInOut } from "framer-motion"
import { useRef, memo, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Code, Lightbulb, Rocket, Users, Zap } from "lucide-react"

export const AboutSection = memo(function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const timelineData = useMemo(
    () => [
       {
        year: "Feb 2023 - Oct 2025",
        title: "UI/UX Designer",
        company: "FutureDesk Services",
        description: "Designed user-centered digital experiences and prototyped innovative interface solutions.",
        icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
        skills: ["Figma", "Adobe XD", "Canva", "SaaS App", "Prototyping", "User Research"],
      },
      {
        year: "2020 to 2022 (Dropout)",
        title: "Bachelor of Computer Science",
        company: "DR. Bhimrao Ambedkar University",
        description: "Bachelor of Computer Science with a passion for UI/UX, development, and creating meaningful digital experiences.",
        icon: <Users className="w-6 h-6" aria-hidden="true" />,
        skills: ["Algorithms", "Data Structures", "Software Engineering"],
      },
    ],
    [],
  )

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.1,
        },
      },
    }),
    [],
  )

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: easeInOut,
        },
      },
    }),
    [],
  )

  return (
    <section id="about" className="py-20 relative overflow-hidden" aria-label="About me section">
      {/* Background elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.42, 0, 0.58, 1],
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="neon-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty">
            I’m a UI/UX Designer passionate about crafting digital experiences that are not just functional but also delightful. 
            Over the past few years, I’ve designed 20+ projects ranging from websites and mobile applications to SaaS-based platforms. 
            My approach is rooted in user-centric design, blending creativity with usability to solve real-world problems.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          aria-label="Professional statistics"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card neon-glow-hover text-center p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
                    <Zap className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold neon-text mb-2">30+</h3>
                <p className="text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card neon-glow-hover text-center p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center neon-glow">
                    <Users className="w-8 h-8 text-secondary" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold neon-text mb-2">20+</h3>
                <p className="text-muted-foreground">Happy Clients</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card neon-glow-hover text-center p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center neon-glow">
                    <Calendar className="w-8 h-8 text-accent" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold neon-text mb-2">2+</h3>
                <p className="text-muted-foreground">Years Experience</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
          aria-label="Professional timeline"
        >
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={`${item.year}-${index}`}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full neon-glow transform md:-translate-x-1/2 z-10"
                  aria-hidden="true"
                />

                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <Card className="glass-card neon-border hover:neon-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
                          {item.icon}
                        </div>
                        <div>
                          <Badge variant="outline" className="neon-border text-primary mb-2">
                            {item.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                          <p className="text-primary font-medium">{item.company}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 text-pretty">{item.description}</p>

                      <div className="flex flex-wrap gap-2" role="list" aria-label="Skills used">
                        {item.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="glass text-xs" role="listitem">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Philosophy */}
        
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <Card className="glass-card neon-border max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 neon-text"> What I Do</h3>
              <blockquote className="text-lg text-muted-foreground text-pretty leading-relaxed">
                "Technology should be invisible, intuitive, and empowering. I strive to create digital experiences that
                not only solve problems but inspire users to achieve more than they thought possible. Every line of code
                is an opportunity to make someone's day a little bit better."
              </blockquote>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>
    </section>
  )
})
