"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, X, ArrowRight } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-aptify-card rounded-xl w-full max-w-md p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex mb-6">
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "login" ? "text-white border-b-2 border-aptify-purple" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "signup" ? "text-white border-b-2 border-aptify-purple" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 bg-aptify-dark border-gray-700 focus:border-aptify-purple"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-xs text-aptify-purple hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-aptify-dark border-gray-700 focus:border-aptify-purple"
                />
              </div>
            </div>

            <Button className="w-full bg-aptify-purple hover:bg-aptify-purple/90">
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        ) : (
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="bg-aptify-dark border-gray-700 focus:border-aptify-purple"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-email" className="block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 bg-aptify-dark border-gray-700 focus:border-aptify-purple"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-aptify-dark border-gray-700 focus:border-aptify-purple"
                />
              </div>
            </div>

            <Button className="w-full bg-aptify-purple hover:bg-aptify-purple/90">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          By continuing, you agree to Aptify's{" "}
          <a href="#" className="text-aptify-purple hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-aptify-purple hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
