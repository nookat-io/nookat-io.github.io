"use client";

import { useState, useEffect } from "react";
import { Download, Zap, Shield, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackgroundEffects } from "./BackgroundEffects";
import { useGitHubMetrics, formatStarCount, formatCount } from "@/lib/github";

export function Hero() {
  const [userOS, setUserOS] = useState<string>("");
  const [otherOS, setOtherOS] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Use the centralized GitHub metrics hook
  const { metrics, isLoading, error } = useGitHubMetrics();

  useEffect(() => {
    setMounted(true);
    // Detect user's operating system
    const detectOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes("mac")) {
        setUserOS("macOS");
        setOtherOS("Other Systems");
      } else if (userAgent.includes("win")) {
        setUserOS("Windows");
        setOtherOS("Other Systems");
      } else if (userAgent.includes("linux")) {
        setUserOS("Linux");
        setOtherOS("Other Systems");
      } else {
        // Default fallback
        setUserOS("Other Systems");
        setOtherOS("macOS");
      }
    };

    detectOS();
  }, []);

  const getDownloadUrl = (os: string) => {
    switch (os.toLowerCase()) {
      case "macos":
        return "https://github.com/nookat-io/nookat/releases/";
      case "windows":
        return "https://github.com/nookat-io/nookat/releases/";
      case "linux":
        return "https://github.com/nookat-io/nookat/releases/";
      default:
        return "https://github.com/nookat-io/nookat/releases/";
    }
  };

  const handleDownload = (os: string) => {
    if (!mounted) return;
    const url = getDownloadUrl(os);
    if (
      os.toLowerCase() === "windows" ||
      os.toLowerCase() === "other systems"
    ) {
      // Open GitHub releases page for Windows and other systems
      window.open(url, "_blank");
    } else {
      // Download the file directly for macOS and Linux
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleOtherDownload = () => {
    if (!mounted) return;
    // Open GitHub releases page for all other options
    window.open("https://github.com/nookat-io/nookat/releases/", "_blank");
  };

  const handleGitHubClick = () => {
    if (!mounted) return;
    window.open("https://github.com/nookat-io/nookat", "_blank");
  };

  return (
    <section className="relative section-padding overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <BackgroundEffects />

      <div className="container-base text-center max-w-5xl relative z-10 mt-16">
        {/* Badge */}
        <Badge className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-4 py-2 text-sm font-medium">
          <Zap className="w-4 h-4 mr-2" />
          Open Source & Built with Rust and Tauri
        </Badge>

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

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            className="btn-primary text-lg px-8 py-4 h-14 text-white"
            onClick={() => handleDownload(userOS)}
          >
            <Download className="w-5 h-5 mr-2" />
            Download for {userOS}
          </Button>
          <Button
            className="btn-secondary text-lg px-8 py-4 h-14"
            onClick={handleGitHubClick}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            View on GitHub
          </Button>
        </div>

        {/* Secondary Download Option */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={handleOtherDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download for {otherOS}
          </Button>
        </div>

        {/* Social Proof */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
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
        </div>
      </div>
    </section>
  );
}
