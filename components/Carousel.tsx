"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface Screenshot {
  name: string;
  title: string;
  description: string;
}

const screenshots: Screenshot[] = [
  {
    name: "containers",
    title: "Container Management",
    description: "View and manage your Docker containers with ease",
  },
  {
    name: "images",
    title: "Image Management",
    description: "Browse and manage Docker images efficiently",
  },
  {
    name: "volumes",
    title: "Volume Management",
    description: "Manage persistent data with Docker volumes",
  },
  {
    name: "networks",
    title: "Network Configuration",
    description: "Configure and monitor Docker networks",
  },
  {
    name: "settings",
    title: "Application Settings",
    description: "Customize Nookat to your preferences",
  },
];

export function Carousel() {
  const { theme, mounted } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenshotSrc, setScreenshotSrc] = useState("");

  useEffect(() => {
    if (!mounted) return;

    const currentScreenshot = screenshots[currentIndex];
    const themeFolder = theme;
    setScreenshotSrc(
      `./screenshots/${themeFolder}/${currentScreenshot.name}.png`,
    );
  }, [theme, mounted, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!mounted) {
    return (
      <div className="relative">
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-lg">
          <div className="h-4 w-32 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Screenshot Container */}
      <div className="relative overflow-hidden">
        <div className="p-4 md:p-6">
          <img
            src={screenshotSrc}
            alt={`${screenshots[currentIndex].title} - ${screenshots[currentIndex].description}`}
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-contain rounded-xl transition-all duration-500 ease-in-out"
          />
        </div>

        {/* Screenshot Info Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="text-center">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
              {screenshots[currentIndex].title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
              {screenshots[currentIndex].description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-900 rounded-full p-3 md:p-4 shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
        aria-label="Previous screenshot"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-800 dark:text-slate-200" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-900 rounded-full p-3 md:p-4 shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
        aria-label="Next screenshot"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-800 dark:text-slate-200" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 md:mt-8 space-x-3">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-blue-600 dark:bg-blue-400"
                : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
            }`}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
