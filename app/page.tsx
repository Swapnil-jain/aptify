import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AIAgentsSection } from "@/components/ai-agents-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function Home() {

  return (
    <main className="min-h-screen bg-aptify-darker">
      <Navbar />

      <HeroSection />

      <AIAgentsSection />

      <TestimonialsSection />

      <Footer />
    </main>
  )
}
