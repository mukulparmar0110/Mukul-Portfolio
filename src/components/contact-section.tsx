"use client"

import type React from "react"
import { motion, easeInOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GlowingButton } from "@/components/glowing-button"
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // const handleSubmit = useCallback(
  //   async (e: React.FormEvent) => {
  //     e.preventDefault()

  //     if (!validateForm()) return

  //     setIsSubmitting(true)

  //     try {
  //       const response = await fetch("/api/contact", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //         cache: "no-store",
  //       })

  //       if (response.ok) {
  //         setIsSubmitted(true)
  //         setFormData({ name: "", email: "", subject: "", message: "" })
  //         setTimeout(() => setIsSubmitted(false), 5000)
  //       } else {
  //         throw new Error("Failed to send message")
  //       }
  //     } catch (error) {
  //       console.error("Form submission error:", error)
  //       // Handle error state here
  //     } finally {
  //       setIsSubmitting(false)
  //     }
  //   },
  //   [formData, validateForm],
  // )


const handleSubmit = useCallback(
  async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "99dea263-9507-4982-a2e3-fc916e3c2868", // ✅ Your Web3Forms API key
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Optionally show error to user
    } finally {
      setIsSubmitting(false);
    }
  },
  [formData, validateForm]
);











  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }))
      }
    },
    [errors],
  )

  const contactInfo = useMemo(
    () => [
      {
        icon: <Mail className="w-6 h-6" />,
        title: "Email",
        value: "mukulparmar470@gmail.com",
        link: "mailto:mukulparmar470@gmail.com",
      },
      {
        icon: <Phone className="w-6 h-6" />,
        title: "Phone",
        value: "+91 7668009623",
        link: "tel:+917668009623",
      },
      {
        icon: <MapPin className="w-6 h-6" />,
        title: "Location",
        value: "Agra, Uttar pradesh",
        link: "#",
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
      hidden: { opacity: 0, y: 30 },
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
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear" as any
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-accent/6 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear" as any
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
            Get In <span className="neon-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
            I'm always excited to work on innovative solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 neon-text">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear
                from you. I typically respond within 24 hours.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-card neon-border hover:neon-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{info.title}</h4>
                          <a href={info.link} className="text-primary hover:text-accent transition-colors duration-200">
                            {info.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="pt-8">
              <Card className="glass-card neon-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 neon-text">Quick Response</h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    I'm currently available for new projects and collaborations. Expect a response within 24 hours
                    during business days.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-card neon-border">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4 neon-glow" />
                    <h3 className="text-2xl font-bold mb-2 neon-text">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`glass neon-border focus:neon-glow transition-all duration-300 ${
                            errors.name ? "border-destructive" : ""
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-destructive text-sm flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`glass neon-border focus:neon-glow transition-all duration-300 ${
                            errors.email ? "border-destructive" : ""
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-destructive text-sm flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className={`glass neon-border focus:neon-glow transition-all duration-300 ${
                          errors.subject ? "border-destructive" : ""
                        }`}
                        placeholder="What's this about?"
                      />
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.subject}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`glass neon-border focus:neon-glow transition-all duration-300 min-h-32 resize-none ${
                          errors.message ? "border-destructive" : ""
                        }`}
                        placeholder="Tell me about your project or idea..."
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    <GlowingButton
                      type="submit"
                      variant="default"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full group"
                    >
                      <span className="flex items-center gap-2">
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                    </GlowingButton>

                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}




////////////////////////////////////////////////////////////////////////




// "use client"

// import type React from "react"
// import { motion, easeInOut } from "framer-motion"
// import { useInView } from "framer-motion"
// import { useRef, useState, useCallback, useMemo } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { GlowingButton } from "@/components/glowing-button"
// import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react"

// interface FormData {
//   name: string
//   email: string
//   subject: string
//   message: string
// }

// interface FormErrors {
//   [key: string]: string
// }

// export function ContactSection() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: "-100px" })

//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   })

//   const [errors, setErrors] = useState<FormErrors>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const validateForm = useCallback((): boolean => {
//     const newErrors: FormErrors = {}

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required"
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email"
//     }

//     if (!formData.subject.trim()) {
//       newErrors.subject = "Subject is required"
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required"
//     } else if (formData.message.trim().length < 10) {
//       newErrors.message = "Message must be at least 10 characters"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }, [formData])

//   const handleSubmit = useCallback(
//     async (e: React.FormEvent) => {
//       e.preventDefault()

//       if (!validateForm()) return

//       setIsSubmitting(true)

//       try {
//         const response = await fetch("/api/contact", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//           cache: "no-store",
//         })

//         if (response.ok) {
//           setIsSubmitted(true)
//           setFormData({ name: "", email: "", subject: "", message: "" })
//           setTimeout(() => setIsSubmitted(false), 5000)
//         } else {
//           throw new Error("Failed to send message")
//         }
//       } catch (error) {
//         console.error("Form submission error:", error)
//         // Handle error state here
//       } finally {
//         setIsSubmitting(false)
//       }
//     },
//     [formData, validateForm],
//   )

//   const handleInputChange = useCallback(
//     (field: keyof FormData, value: string) => {
//       setFormData((prev) => ({ ...prev, [field]: value }))
//       if (errors[field]) {
//         setErrors((prev) => ({ ...prev, [field]: "" }))
//       }
//     },
//     [errors],
//   )

//   const contactInfo = useMemo(
//     () => [
//       {
//         icon: <Mail className="w-6 h-6" />,
//         title: "Email",
//         value: "mukulparmar470@gmail.com",
//         link: "mailto:mukulparmar470@gmail.com",
//       },
//       {
//         icon: <Phone className="w-6 h-6" />,
//         title: "Phone",
//         value: "+91 7668009623",
//         link: "tel:+917668009623",
//       },
//       {
//         icon: <MapPin className="w-6 h-6" />,
//         title: "Location",
//         value: "Agra, Uttar pradesh",
//         link: "#",
//       },
//     ],
//     [],
//   )

//   const containerVariants = useMemo(
//     () => ({
//       hidden: { opacity: 0 },
//       visible: {
//         opacity: 1,
//         transition: {
//           staggerChildren: 0.1,
//           delayChildren: 0.2,
//         },
//       },
//     }),
//     [],
//   )

//   const itemVariants = useMemo(
//     () => ({
//       hidden: { opacity: 0, y: 30 },
//       visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//           duration: 0.6,
//           ease: easeInOut,
//         },
//       },
//     }),
//     [],
//   )

//   return (
//     <section id="contact" className="py-20 relative overflow-hidden">
//       {/* Background elements */}
//       <div className="absolute inset-0">
//         <motion.div
//           className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear" as any
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-accent/6 blur-3xl"
//           animate={{
//             scale: [1.1, 1, 1.1],
//             opacity: [0.2, 0.4, 0.2],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear" as any
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4 relative z-10" ref={ref}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Get In <span className="neon-text">Touch</span>
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
//             Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
//             I'm always excited to work on innovative solutions.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Information */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             className="space-y-8"
//           >
//             <motion.div variants={itemVariants}>
//               <h3 className="text-2xl font-bold mb-6 neon-text">Let's Connect</h3>
//               <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">
//                 Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear
//                 from you. I typically respond within 24 hours.
//               </p>
//             </motion.div>

//             <div className="space-y-6">
//               {contactInfo.map((info, index) => (
//                 <motion.div key={index} variants={itemVariants}>
//                   <Card className="glass-card neon-border hover:neon-glow transition-all duration-300">
//                     <CardContent className="p-6">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
//                           {info.icon}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-foreground">{info.title}</h4>
//                           <a href={info.link} className="text-primary hover:text-accent transition-colors duration-200">
//                             {info.value}
//                           </a>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.div variants={itemVariants} className="pt-8">
//               <Card className="glass-card neon-border">
//                 <CardContent className="p-6">
//                   <h4 className="font-semibold mb-3 neon-text">Quick Response</h4>
//                   <p className="text-sm text-muted-foreground text-pretty">
//                     I'm currently available for new projects and collaborations. Expect a response within 24 hours
//                     during business days.
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <Card className="glass-card neon-border">
//               <CardContent className="p-8">
//                 {isSubmitted ? (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center py-8"
//                   >
//                     <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4 neon-glow" />
//                     <h3 className="text-2xl font-bold mb-2 neon-text">Message Sent!</h3>
//                     <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon!</p>
//                   </motion.div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label htmlFor="name">Name *</Label>
//                         <Input
//                           id="name"
//                           value={formData.name}
//                           onChange={(e) => handleInputChange("name", e.target.value)}
//                           className={`glass neon-border focus:neon-glow transition-all duration-300 ${
//                             errors.name ? "border-destructive" : ""
//                           }`}
//                           placeholder="Your full name"
//                         />
//                         {errors.name && (
//                           <motion.p
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-destructive text-sm flex items-center gap-1"
//                           >
//                             <AlertCircle className="w-4 h-4" />
//                             {errors.name}
//                           </motion.p>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email *</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           value={formData.email}
//                           onChange={(e) => handleInputChange("email", e.target.value)}
//                           className={`glass neon-border focus:neon-glow transition-all duration-300 ${
//                             errors.email ? "border-destructive" : ""
//                           }`}
//                           placeholder="your.email@example.com"
//                         />
//                         {errors.email && (
//                           <motion.p
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-destructive text-sm flex items-center gap-1"
//                           >
//                             <AlertCircle className="w-4 h-4" />
//                             {errors.email}
//                           </motion.p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="subject">Subject *</Label>
//                       <Input
//                         id="subject"
//                         value={formData.subject}
//                         onChange={(e) => handleInputChange("subject", e.target.value)}
//                         className={`glass neon-border focus:neon-glow transition-all duration-300 ${
//                           errors.subject ? "border-destructive" : ""
//                         }`}
//                         placeholder="What's this about?"
//                       />
//                       {errors.subject && (
//                         <motion.p
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="text-destructive text-sm flex items-center gap-1"
//                         >
//                           <AlertCircle className="w-4 h-4" />
//                           {errors.subject}
//                         </motion.p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="message">Message *</Label>
//                       <Textarea
//                         id="message"
//                         value={formData.message}
//                         onChange={(e) => handleInputChange("message", e.target.value)}
//                         className={`glass neon-border focus:neon-glow transition-all duration-300 min-h-32 resize-none ${
//                           errors.message ? "border-destructive" : ""
//                         }`}
//                         placeholder="Tell me about your project or idea..."
//                       />
//                       {errors.message && (
//                         <motion.p
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="text-destructive text-sm flex items-center gap-1"
//                         >
//                           <AlertCircle className="w-4 h-4" />
//                           {errors.message}
//                         </motion.p>
//                       )}
//                     </div>

//                     <GlowingButton
//                       type="submit"
//                       variant="default"
//                       size="lg"
//                       disabled={isSubmitting}
//                       className="w-full group"
//                     >
//                       <span className="flex items-center gap-2">
//                         {isSubmitting ? (
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                             className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                           />
//                         ) : (
//                           <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                         )}
//                         {isSubmitting ? "Sending..." : "Send Message"}
//                       </span>
//                     </GlowingButton>

//                   </form>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }
