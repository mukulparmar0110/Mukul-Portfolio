"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Mail className="w-5 h-5" />, href: "#", label: "Email" },
  ]

  return (
    <footer className="py-12 border-t border-border/50 glass">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold neon-text mb-2">Alex Developer</h3>
            <p className="text-muted-foreground">Building the future, one line of code at a time.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
            {socialLinks.map((link, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="neon-glow-hover" asChild>
                  <a href={link.href} aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary neon-glow" /> using Next.js & Framer Motion
          </p>
          <p className="text-sm text-muted-foreground mt-2">© 2024 Alex Developer. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
