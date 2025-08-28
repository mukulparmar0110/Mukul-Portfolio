import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { ScrollProgress } from "@/components/scroll-progress"
import { CursorGlow } from "@/components/cursor-glow"
import { FloatingElements } from "@/components/floating-elements"

export const metadata: Metadata = {
  title: "Portfolio | Futuristic Developer",
  description: "A dark futuristic portfolio showcasing cutting-edge web development",
  generator: "Next.js 15",
  keywords: ["portfolio", "developer", "Next.js", "React", "TypeScript", "web development"],
  authors: [{ name: "Alex Developer" }],
  creator: "Alex Developer",
  openGraph: {
    title: "Portfolio | Futuristic Developer",
    description: "A dark futuristic portfolio showcasing cutting-edge web development",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Futuristic Developer",
    description: "A dark futuristic portfolio showcasing cutting-edge web development",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          <CursorGlow />
          <FloatingElements />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
