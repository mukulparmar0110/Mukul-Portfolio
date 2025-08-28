"use client"

import { motion, useInView } from "framer-motion"
import { useRef, memo, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Play } from "lucide-react"

export const ProjectsSection = memo(function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = useMemo(
    () => [
      {
        id: "ai-dashboard",
        title: "AI-Powered Dashboard",
        description:
          "A comprehensive analytics dashboard with real-time data visualization and AI-driven insights for business intelligence.",
        image: "/card1.webp",
        tech: ["Next.js", "TypeScript", "D3.js", "OpenAI API", "PostgreSQL"],
        category: "Web Application",
        links: {
          demo: "#",
          github: "#",
          live: "#",
        },
      },
      {
        id: "ecommerce-platform",
        title: "E-Commerce Platform",
        description:
          "Modern e-commerce solution with advanced filtering, payment integration, and inventory management system.",
        image: "/card2.webp",
        tech: ["React", "Node.js", "Stripe", "MongoDB", "Redis"],
        category: "Full-Stack",
        links: {
          demo: "#",
          github: "#",
          live: "#",
        },
      },
      {
        id: "fitness-app",
        title: "Mobile Fitness App",
        description: "Cross-platform fitness tracking app with workout plans, progress analytics, and social features.",
        image: "/card3.webp",
        tech: ["React Native", "Firebase", "Redux", "Chart.js"],
        category: "Mobile App",
        links: {
          demo: "#",
          github: "#",
          live: "#",
        },
      },
      {
        id: "blockchain-wallet",
        title: "Blockchain Wallet",
        description:
          "Secure cryptocurrency wallet with multi-chain support, DeFi integration, and advanced security features.",
        image: "/card4.webp",
        tech: ["Vue.js", "Web3.js", "Solidity", "MetaMask"],
        category: "Blockchain",
        links: {
          demo: "#",
          github: "#",
          live: "#",
        },
      },
      {
        id: "chat-platform",
        title: "Real-Time Chat Platform",
        description: "Scalable messaging platform with video calls, file sharing, and team collaboration features.",
        image: "/card5.webp",
        tech: ["Socket.io", "Express", "WebRTC", "AWS S3"],
        category: "Real-Time App",
        links: {
          demo: "#",
          github: "#",
          live: "#",
        },
      },
      {
        id: "iot-monitoring",
        title: "IoT Monitoring System",
        description:
          "Industrial IoT dashboard for monitoring sensors, managing devices, and analyzing environmental data.",
        image: "/card5.webp",
        tech: ["Python", "MQTT", "InfluxDB", "Grafana"],
        category: "IoT Solution",
        links: {
          demo: "#",
          github: "#",
          live: "#",
        },
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
          staggerChildren: 0.1,
          delayChildren: 0.2,
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
          ease: "easeOut",
        },
      },
    }),
    [],
  )

  const handleProjectAction = useCallback((action: string, projectId: string) => {
    console.log(`[v0] ${action} clicked for project: ${projectId}`)
    // Handle project actions here
  }, [])

  return (
    <section id="projects" className="py-20 relative overflow-hidden" aria-label="Featured projects showcase">
      {/* Background elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
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
            Featured <span className="neon-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A showcase of innovative solutions I've built, ranging from AI-powered applications to blockchain platforms.
            Each project represents a unique challenge solved with cutting-edge technology.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
          aria-label="Project cards"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants} role="listitem">
              <Card className="glass-card neon-border group hover:neon-glow transition-all duration-500 overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={`${project.title} - ${project.description}`}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge variant="secondary" className="glass neon-border">
                      {project.category}
                    </Badge>
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:neon-text transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed text-pretty">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs glass" role="listitem">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2" role="group" aria-label="Project actions">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="neon-glow-hover flex-1"
                        onClick={() => handleProjectAction("demo", project.id)}
                        aria-label={`View demo of ${project.title}`}
                      >
                        <Play className="w-4 h-4 mr-2" aria-hidden="true" />
                        Demo
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="neon-glow-hover"
                        onClick={() => handleProjectAction("github", project.id)}
                        aria-label={`View GitHub repository for ${project.title}`}
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="neon-glow-hover"
                        onClick={() => handleProjectAction("live", project.id)}
                        aria-label={`View live version of ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="glass-card neon-border max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 neon-text">Want to See More?</h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                These are just a few highlights from my portfolio. I'm always working on new and exciting projects that
                push the boundaries of what's possible with modern technology.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="neon-glow-hover bg-primary hover:bg-primary/90"
                  onClick={() => handleProjectAction("view-all", "portfolio")}
                  aria-label="View all projects on GitHub"
                >
                  <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                  View All Projects
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
})
