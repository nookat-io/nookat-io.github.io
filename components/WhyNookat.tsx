import React from "react"
import { CheckCircle } from "lucide-react"

export function WhyNookat() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Nookat?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Lightweight & Fast</h3>
                  <p className="text-slate-400 text-sm">
                    Native performance without the overhead of Docker Desktop's resource consumption.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Always Free</h3>
                  <p className="text-slate-400 text-sm">
                    No licensing fees, no restrictions. Use it for personal projects or commercial work.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Intuitive Interface</h3>
                  <p className="text-slate-400 text-sm">
                    Clean, modern UI that makes container management accessible to developers of all levels.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Cross-Platform</h3>
                  <p className="text-slate-400 text-sm">
                    Available for macOS, Windows, and Linux with consistent experience across platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-1 border border-slate-700">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-21%20at%2013.45.15-iDASv17GCk76AHhLujt27PyDJp8TkK.png"
              alt="Nookat application interface showing container management"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 