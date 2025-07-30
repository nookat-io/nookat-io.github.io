"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "./ThemeProvider"

interface Screenshot {
  name: string
  title: string
  description: string
}

const screenshots: Screenshot[] = [
  {
    name: "containers",
    title: "Container Management",
    description: "View and manage your Docker containers with ease"
  },
  {
    name: "images",
    title: "Image Management",
    description: "Browse and manage Docker images efficiently"
  },
  {
    name: "volumes",
    title: "Volume Management",
    description: "Manage persistent data with Docker volumes"
  },
  {
    name: "networks",
    title: "Network Configuration",
    description: "Configure and monitor Docker networks"
  },
  {
    name: "settings",
    title: "Application Settings",
    description: "Customize Nookat to your preferences"
  }
]

export function Carousel() {
  const { theme, mounted } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [screenshotSrc, setScreenshotSrc] = useState("")

  useEffect(() => {
    if (!mounted) return
    
    const currentScreenshot = screenshots[currentIndex]
    const themeFolder = theme;
    setScreenshotSrc(`./screenshots/${themeFolder}/${currentScreenshot.name}.png`)
  }, [theme, mounted, currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!mounted) {
    return <div className="w-full h-[500px] bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
  }

  return (
    <div className="relative group">
      <div className="p-2 overflow-hidden">
        <img
          src={screenshotSrc}
          alt={`${screenshots[currentIndex].title} - ${screenshots[currentIndex].description}`}
          className="w-full h-[500px] object-contain rounded-lg transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-900 rounded-full p-4 shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        aria-label="Previous screenshot"
      >
        <ChevronLeft className="w-7 h-7 text-slate-800 dark:text-slate-200" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-900 rounded-full p-4 shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        aria-label="Next screenshot"
      >
        <ChevronRight className="w-7 h-7 text-slate-800 dark:text-slate-200" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-4">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-slate-900 dark:bg-white"
                : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
            }`}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 