"use client";

import { Zap, Shield, Code } from "lucide-react";
import { BackgroundEffects } from "./BackgroundEffects";
import { DownloadSection } from "./DownloadSection";
// import { useGitHubMetrics, formatStarCount, formatCount } from "@/lib/github";

export function Hero() {
  // Use the centralized GitHub metrics hook
  // const { metrics, isLoading, error } = useGitHubMetrics();

  return (
    <section className="relative section-padding overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <BackgroundEffects />

      <div className="container-base text-center max-w-5xl relative z-10 mt-20">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-700 dark:from-white dark:via-blue-100 dark:to-slate-300 bg-clip-text text-transparent leading-tight">
          Container Management
          <br />
          <span className="text-blue-600 dark:text-blue-400">
            That's Actually Fast
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Free, open-source, and built for developers who care about performance
        </p>

        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="font-medium">Native Performance</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Zap className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Lightweight</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Code className="w-5 h-5 text-purple-500" />
            <span className="font-medium">Open Source</span>
          </div>
        </div>

        {/* Download Section */}
        <DownloadSection />

        {/* Social Proof */}
        {/* <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Trusted by developers worldwide
          </p>
          {error && (
            <div className="text-center mb-4">
              <p className="text-sm text-red-500 dark:text-red-400">
                Unable to load metrics: {error}
              </p>
            </div>
          )}
          <div className="flex justify-center items-center gap-8 text-slate-400 dark:text-slate-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatStarCount(metrics?.stars || 0)
                )}
              </div>
              <div className="text-xs">GitHub Stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatCount(metrics?.contributors || 0)
                )}
              </div>
              <div className="text-xs">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatCount(metrics?.downloads || 0)
                )}
              </div>
              <div className="text-xs">Downloads</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
