"use client";

import { Zap, Shield, Code, Users } from "lucide-react";

export function WhyNookat() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900">
      <div className="container-base max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Why Developers Choose
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              Nookat Over other Tools
            </span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Stop paying for bloat. Get the container management you actually
            need, with the performance you deserve.
          </p>
        </div>

        {/* Technical Stack Section */}
        <div className="mb-20 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Built with Modern Tech Stack
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Rust + Tauri + React = Native Performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 p-3">
                <img
                  src="./rust-logo.png"
                  alt="Rust Logo"
                  className="w-20 dark:invert"
                />
              </div>
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                Rust Backend
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Memory-safe, thread-safe, and blazingly fast. No garbage
                collection overhead.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 p-3">
                <img
                  src="./tauri-logo.svg"
                  alt="Tauri Logo"
                  className="w-12 h-12"
                />
              </div>
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                Tauri Framework
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Cross-platform desktop apps with web technologies. Smaller
                bundle size than Electron.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 p-3">
                <img
                  src="./react-logo.png"
                  alt="React Logo"
                  className="w-12 h-12"
                />
              </div>
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                React Frontend
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Modern, responsive UI with component-based architecture.
                Familiar and powerful web technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
                  Lightning Fast
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Built with Rust and Tauri for native performance. Start
                  containers in seconds, not minutes. Your development workflow
                  deserves better.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
                  Always Free
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  No licensing fees, no restrictions, no hidden costs. Use it
                  for personal projects or commercial work without worrying
                  about subscriptions.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
                  Open Source
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Full transparency and community-driven development.
                  Contribute, fork, or customize to fit your exact needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
                  Developer First
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clean, intuitive interface designed by developers, for
                  developers. No unnecessary features cluttering your workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
