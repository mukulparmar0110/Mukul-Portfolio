"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

interface GlowingButtonProps extends ButtonProps {
  variant?: "primary" | "secondary"
}

export function GlowingButton({ children, className, variant = "primary", ...props }: GlowingButtonProps) {
  const baseClasses = "relative overflow-hidden transition-all duration-300 ripple-effect"

  const variantClasses = {
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-hover border border-primary/50",
    secondary:
      "bg-secondary hover:bg-secondary/90 text-secondary-foreground neon-glow-hover border border-secondary/50",
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
      <Button className={cn(baseClasses, variantClasses[variant], className)} {...props}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  )
}
