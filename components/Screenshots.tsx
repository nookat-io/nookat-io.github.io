"use client"

import { Carousel } from "./Carousel"

export function Screenshots() {
  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="container-base max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
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