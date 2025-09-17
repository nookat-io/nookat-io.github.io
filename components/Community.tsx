"use client";

// import { MessageCircle, Users, Star, Download, Code } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { useGitHubMetrics, formatStarCount, formatCount } from "@/lib/github";
import { DownloadSection } from "./DownloadSection";

export function Community() {
  // Use the centralized GitHub metrics hook
  // const { metrics, isLoading, error } = useGitHubMetrics();

  return (
    <section className="section-padding bg-white dark:bg-slate-800/30">
      <div className="container-base max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Join the
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              Open Source Community
            </span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Be part of the future of container management. Contribute, discuss,
            and help shape the development of Nookat
          </p>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid md:grid-cols-4 gap-6 mb-16">
          {error && (
            <div className="col-span-full text-center mb-4">
              <p className="text-sm text-red-500 dark:text-red-400">
                Unable to load metrics: {error}
              </p>
            </div>
          )}
          <Card className="card-base text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatStarCount(metrics?.stars || 0)
                )}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                GitHub Stars
              </div>
            </CardContent>
          </Card>

          <Card className="card-base text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatCount(metrics?.downloads || 0)
                )}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                Downloads
              </div>
            </CardContent>
          </Card>

          <Card className="card-base text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatCount(metrics?.contributors || 0)
                )}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                Contributors
              </div>
            </CardContent>
          </Card>

          <Card className="card-base text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                100%
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                Open Source
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Community Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="card-base group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              </div>
              <h3 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">
                Contribute to Nookat
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Help improve Nookat by contributing code, reporting bugs, or
                suggesting new features. Every contribution makes a difference
              </p>
              <Button
                className="btn-primary w-full"
                onClick={() =>
                  window.open("https://github.com/nookat-io/nookat", "_blank")
                }
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
            </CardContent>
          </Card>

          <Card className="card-base group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors mx-auto">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">
                Join Discussions
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Connect with other developers, share your experience, and get
                help from the community. Your feedback shapes the future of
                Nookat
              </p>
              <Button
                className="btn-secondary w-full"
                onClick={() =>
                  window.open(
                    "https://github.com/nookat-io/nookat/discussions",
                    "_blank",
                  )
                }
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Discussion
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Interested in trying Nookat?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Download and explore all features. Give it a try and let us know
              what you think!
            </p>
            <DownloadSection />
          </div>
        </div>
      </div>
    </section>
  );
}
