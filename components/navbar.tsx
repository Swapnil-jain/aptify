"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login")

  const openLoginModal = () => {
    setAuthModalTab("login")
    setAuthModalOpen(true)
  }

  const openSignupModal = () => {
    setAuthModalTab("signup")
    setAuthModalOpen(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-aptify-darker/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-aptify-purple">
              Aptify
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/ai-agents" className="text-sm text-gray-300 hover:text-white transition-colors">
              AI Agents
            </Link>
            <Link href="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/testimonials" className="text-sm text-gray-300 hover:text-white transition-colors">
              Testimonials
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={openLoginModal} className="text-sm text-gray-300 hover:text-white transition-colors">
              Login
            </button>
            <Button onClick={openSignupModal} className="bg-aptify-purple hover:bg-aptify-purple/90 text-white">
              Start Free Trial
            </Button>
          </div>
        </div>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab={authModalTab} />
    </>
  )
}
