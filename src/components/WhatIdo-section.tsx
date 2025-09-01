"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function WhatIDo() {
  const services = [
    { title: "Web Design", description: "Modern, clean, and responsive websites." },
    { title: "Mobile App Design", description: "Engaging, intuitive, and user-friendly app experiences." },
    { title: "SaaS Applications", description: "Scalable interfaces for complex workflows with simplicity in mind." },
    { title: "Wireframes & Prototypes", description: "From rough sketches to high-fidelity interactive flows." },
    { title: "Design Systems", description: "Consistency-driven components and style guides." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-20 text-center"
    >
      <Card className="glass-card neon-border max-w-4xl mx-auto">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-4 neon-text">What I Do</h3>

          {/* Quote Section */}
          {/* <blockquote className="text-lg text-muted-foreground text-pretty leading-relaxed mb-8">
            "Technology should be invisible, intuitive, and empowering. I strive to create digital experiences that
            not only solve problems but inspire users to achieve more than they thought possible. Every line of code
            is an opportunity to make someone's day a little bit better."
          </blockquote> */}

          {/* Animated Bullet Points */}
          <ul className="space-y-4 text-left">
            {services.map((service, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3"
              >
                {/* Neon bullet with THICK glowing shadow */}
                <motion.span
                  className="w-3 h-3 mt-2 rounded-full"
                  style={{ backgroundColor: "#00d1bc" }}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    boxShadow: [
                      "0 0 12px rgba(0, 209, 188, 0.9), 0 0 24px rgba(0, 209, 188, 0.7), 0 0 36px rgba(0, 209, 188, 0.5)",
                      "0 0 20px rgba(0, 209, 188, 1), 0 0 40px rgba(0, 209, 188, 0.9), 0 0 60px rgba(0, 209, 188, 0.7)",
                      "0 0 12px rgba(0, 209, 188, 0.9), 0 0 24px rgba(0, 209, 188, 0.7), 0 0 36px rgba(0, 209, 188, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                />
                {/* Service text */}
                <div>
                  <p className="font-medium text-gray-200">{service.title}</p>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
