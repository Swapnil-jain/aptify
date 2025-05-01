import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"

const sora = Sora({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora', 
})

export const metadata: Metadata = {
  title: "Aptify AI",
  description: "AI-powered document assistant",
  viewport: "width=device-width, initial-scale=1.0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} min-h-screen`}>
        <main className="relative w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

import './globals.css'