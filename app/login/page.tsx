import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-aptify-darker">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-md mx-auto bg-aptify-card rounded-xl overflow-hidden shadow-xl">
          <div className="flex">
            <button className="flex-1 py-3 text-center text-white border-b-2 border-aptify-purple">Login</button>
            <button className="flex-1 py-3 text-center text-gray-400">Sign Up</button>
          </div>

          <div className="p-6">
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
      </div>

      <Footer />
    </main>
  )
}
