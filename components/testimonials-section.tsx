import { Star } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Trusted by Enterprise Leaders</h2>
        <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
          See how Aptify is helping organizations transform their operations and drive innovation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-aptify-card rounded-xl p-6 border border-gray-800">
            <div className="flex text-yellow-400 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="text-gray-300 mb-6">
              "Aptify's Contract Analyzer has transformed how we manage legal documents. The risk metrics feature has
              saved us countless hours of manual review."
            </p>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Sarah Johnson"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm text-gray-400">CTO, TechVantage Solutions</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-aptify-card rounded-xl p-6 border border-gray-800">
            <div className="flex text-yellow-400 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="text-gray-300 mb-6">
              "The RFP Assistant is revolutionary. We've improved our response accuracy by 40% and reduced turnaround
              time from weeks to days."
            </p>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Michael Chen"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">Michael Chen</h4>
                <p className="text-sm text-gray-400">Procurement Director, Global Innovations</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-aptify-card rounded-xl p-6 border border-gray-800">
            <div className="flex text-yellow-400 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="text-gray-300 mb-6">
              "Our support team now has instant access to information from thousands of pages of technical manuals.
              Customer satisfaction has increased dramatically."
            </p>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Emily Rodriguez"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">Emily Rodriguez</h4>
                <p className="text-sm text-gray-400">Knowledge Manager, Enterprise Systems</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-gray-400 uppercase text-sm tracking-wider mb-8">
            Trusted by Innovative Companies
          </h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 w-32 bg-gray-800 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
