"use client"

import React, { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function WhyNookat() {
  const { theme, mounted } = useTheme()
  const [screenshotSrc, setScreenshotSrc] = useState("./screenshot-dark.png")
  
  // Determine which screenshot to show based on theme
  useEffect(() => {
    if (!mounted) return
    
    const getScreenshotSrc = () => {
      if (theme === "light") {
        return "./screenshot-light.png"
      } else if (theme === "dark") {
        return "./screenshot-dark.png"
      } else {
        // For system theme, check if system prefers dark
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        return prefersDark ? "./screenshot-dark.png" : "./screenshot-light.png"
      }
    }
    
    setScreenshotSrc(getScreenshotSrc())
  }, [theme, mounted])
  
  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Why Choose Nookat?</h2>
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
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-300 dark:border-slate-700">
            <img
              src={screenshotSrc}
              alt="Nookat application interface showing container management"
              className="w-full rounded-lg transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 