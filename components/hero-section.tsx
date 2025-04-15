import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PerformanceChart } from "@/components/performance-chart"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-aptify-purple/10 via-transparent to-transparent opacity-30" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-6 bg-gradient-to-r from-aptify-purple to-aptify-blue bg-clip-text text-transparent">
          Aptify
        </h1>

        <h2 className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
          Intelligent AI-driven solutions that transform the way enterprises work, analyze, and respond.
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button className="bg-aptify-purple hover:bg-aptify-purple/90 text-white px-8 py-6 text-lg rounded-md w-full sm:w-auto">
            Request Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-md w-full sm:w-auto"
          >
            Learn More
          </Button>
        </div>

        <PerformanceChart />
      </div>
    </section>
  )
}
