import { Button } from "@/components/ui/button"
import { FileText, FileCheck, Clock, Thermometer, FileUp } from "lucide-react"

export function AIAgentsSection() {
  return (
    <section className="py-20 bg-aptify-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Meet Our AI Agents</h2>
        <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Powerful AI assistants designed to streamline your workflow and provide instant, accurate insights and
          analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Manual Expert */}
          <div className="bg-aptify-card rounded-xl overflow-hidden border border-gray-800 flex flex-col">
            <div className="h-2 bg-aptify-blue" />
            <div className="p-6 flex flex-col flex-1">
              <div className="bg-aptify-blue/10 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-aptify-blue" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Manual Expert</h3>
              <p className="text-gray-400 mb-6">AI-powered knowledge base assistant</p>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-aptify-blue mt-0.5" />
                  <span>Instantly retrieve answers from your uploaded manuals</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-aptify-blue mt-0.5" />
                  <span>Natural language processing for intuitive interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-aptify-blue mt-0.5" />
                  <span>Continuous learning from new documents</span>
                </li>
              </ul>

              <Button className="w-full h-12 bg-aptify-blue hover:bg-aptify-blue/90">Upload Manuals</Button>
            </div>
          </div>

          {/* Contract Analyzer */}
          <div className="bg-aptify-card rounded-xl overflow-hidden border border-gray-800 flex flex-col">
            <div className="h-2 bg-aptify-purple" />
            <div className="p-6 flex flex-col flex-1">
              <div className="bg-aptify-purple/10 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-aptify-purple" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Contract Analyzer</h3>
              <p className="text-gray-400 mb-6">Advanced document analytics & insights</p>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-aptify-purple mt-0.5" />
                  <span>Risk analysis with dynamic metrics visualization</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-aptify-purple mt-0.5" />
                  <span>Timeline tracking and expiry notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-aptify-purple mt-0.5" />
                  <span>Temperature & Humidity risk indicators</span>
                </li>
              </ul>

              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-aptify-dark rounded-lg p-3 text-center">
                  <div className="text-red-400 font-bold">72°</div>
                  <div className="text-xs text-gray-400">Temperature</div>
                </div>
                <div className="bg-aptify-dark rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold">65%</div>
                  <div className="text-xs text-gray-400">Humidity</div>
                </div>
                <div className="bg-aptify-dark rounded-lg p-3 text-center">
                  <div className="text-yellow-400 font-bold">45d</div>
                  <div className="text-xs text-gray-400">Expiry</div>
                </div>
              </div>

              <Button className="w-full h-12 bg-aptify-purple hover:bg-aptify-purple/90">Analyze Contract</Button>
            </div>
          </div>

          {/* RFP Assistant */}
          <div className="bg-aptify-card rounded-xl overflow-hidden border border-gray-800 flex flex-col">
            <div className="h-2 bg-aptify-green" />
            <div className="p-6 flex flex-col flex-1">
              <div className="bg-aptify-green/10 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                <FileUp className="h-6 w-6 text-aptify-green" />
              </div>

              <h3 className="text-2xl font-bold mb-2">RFP Assistant</h3>
              <p className="text-gray-400 mb-6">Automate responses to RFP documents</p>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <FileUp className="h-5 w-5 text-aptify-green mt-0.5" />
                  <span>Extract key requirements from RFP documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileUp className="h-5 w-5 text-aptify-green mt-0.5" />
                  <span>Generate professional responses tailored to your business</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileUp className="h-5 w-5 text-aptify-green mt-0.5" />
                  <span>Track submission deadlines and requirements</span>
                </li>
              </ul>

              <Button className="w-full h-12 bg-aptify-green hover:bg-aptify-green/90 text-black">Upload RFP</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
