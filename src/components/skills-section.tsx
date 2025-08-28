"use client"

import { motion, easeInOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Database,
  Palette,
  Server,
  Smartphone,
  Cloud,
  GitBranch,
  Shield,
  Zap,
  Brain,
  Globe,
  Cpu,
} from "lucide-react"

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code2 className="w-6 h-6" />,
      color: "primary",
      skills: [
        { name: "React/Next.js", level: 95, icon: "⚛️" },
        { name: "TypeScript", level: 90, icon: "📘" },
        { name: "Tailwind CSS", level: 92, icon: "🎨" },
        { name: "Vue.js", level: 85, icon: "💚" },
        { name: "Three.js", level: 78, icon: "🎮" },
      ],
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      color: "secondary",
      skills: [
        { name: "Node.js", level: 88, icon: "🟢" },
        { name: "Python", level: 85, icon: "🐍" },
        { name: "GraphQL", level: 82, icon: "🔗" },
        { name: "REST APIs", level: 90, icon: "🌐" },
        { name: "Microservices", level: 80, icon: "🔧" },
      ],
    },
    {
      title: "Database & Cloud",
      icon: <Database className="w-6 h-6" />,
      color: "accent",
      skills: [
        { name: "PostgreSQL", level: 87, icon: "🐘" },
        { name: "MongoDB", level: 83, icon: "🍃" },
        { name: "AWS", level: 85, icon: "☁️" },
        { name: "Docker", level: 88, icon: "🐳" },
        { name: "Redis", level: 80, icon: "🔴" },
      ],
    },
    {
      title: "Mobile & Tools",
      icon: <Smartphone className="w-6 h-6" />,
      color: "primary",
      skills: [
        { name: "React Native", level: 82, icon: "📱" },
        { name: "Git/GitHub", level: 92, icon: "🔀" },
        { name: "Figma", level: 85, icon: "🎨" },
        { name: "Jest/Testing", level: 80, icon: "🧪" },
        { name: "CI/CD", level: 78, icon: "🚀" },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: easeInOut,
        delay: 0.5,
      },
    }),
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: easeInOut,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/8 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: easeInOut,
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
            Technical <span className="neon-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A comprehensive toolkit of modern technologies and frameworks that I use to build exceptional digital
            experiences. Always learning, always evolving.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={itemVariants}>
              <Card className="glass-card neon-border hover:neon-glow transition-all duration-500 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-12 h-12 rounded-full bg-${category.color}/20 flex items-center justify-center neon-glow`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.1, duration: 0.5 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <Badge variant="outline" className="glass text-xs">
                            {skill.level}%
                          </Badge>
                        </div>
                        <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute top-0 left-0 h-full bg-gradient-to-r from-${category.color} to-${category.color}/80 rounded-full neon-glow`}
                            variants={progressVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={skill.level}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8 neon-text">Also Experienced With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <Brain className="w-6 h-6" />, name: "AI/ML" },
              { icon: <Shield className="w-6 h-6" />, name: "Security" },
              { icon: <Globe className="w-6 h-6" />, name: "Web3" },
              { icon: <Cpu className="w-6 h-6" />, name: "IoT" },
              { icon: <Zap className="w-6 h-6" />, name: "Performance" },
              { icon: <GitBranch className="w-6 h-6" />, name: "DevOps" },
              { icon: <Cloud className="w-6 h-6" />, name: "Serverless" },
              { icon: <Palette className="w-6 h-6" />, name: "UI/UX" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card neon-border p-4 rounded-lg hover:neon-glow transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="glass-card neon-border max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 neon-text">Continuous Learning</h3>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, tools, and
                methodologies to stay at the forefront of web development. Currently diving deep into AI integration,
                Web3 technologies, and advanced performance optimization techniques.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
