"use client"

import { Carousel } from "./Carousel"

export function Screenshots() {
  return (
    <section id="screenshots" className="section-padding bg-white dark:bg-slate-800/30 relative">
      <div className="container-base">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            Screenshots
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  )
} 