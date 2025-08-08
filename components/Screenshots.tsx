"use client";

import { Carousel } from "./Carousel";
import { Monitor, Zap, Eye } from "lucide-react";

export function Screenshots() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container-base max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            See Nookat in Action
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Clean, Intuitive
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              Container Management
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our streamlined interface. Every
            feature is designed to make container management effortless and
            enjoyable.
          </p>
        </div>

        {/* Screenshot Carousel */}
        <div className="mb-16">
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              <Carousel />
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
              Visual Interface
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Intuitive design that makes container management visual and
              straightforward
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
              Lightning Fast
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Built with Rust for native performance and instant responsiveness
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
              Complete Overview
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Monitor containers, images, volumes, and networks all in one place
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
