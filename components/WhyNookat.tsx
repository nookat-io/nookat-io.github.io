"use client"

import { CheckCircle } from "lucide-react"

export function WhyNookat() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="container-base max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Why Choose Nookat?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Lightweight & Fast</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Native performance without the overhead of Docker Desktop's resource consumption.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Always Free</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  No licensing fees, no restrictions. Use it for personal projects or commercial work.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Intuitive Interface</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Clean, modern UI that makes container management accessible to developers of all levels.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Cross-Platform</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Available for macOS, Windows, and Linux with consistent experience across platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 