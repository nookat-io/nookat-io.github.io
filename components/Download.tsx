import React from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function DownloadSection() {
  return (
    <section id="download" className="py-20 px-4 bg-white dark:bg-slate-800/30 relative">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Get Started Today</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          Download Nookat and experience container management the way it should be - simple, fast, and reliable.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">macOS</h3>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                <Link href="https://github.com/nookat-io/nookat/releases/download/v0.1.0/Nookat-0.1.0-arm64.dmg">
                  <Download className="w-4 h-4 mr-2" />
                  Download .dmg
                </Link>
              </Button>
              <p className="text-xs text-slate-600 dark:text-slate-400">macOS 10.15 or later</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Windows</h3>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                <Download className="w-4 h-4 mr-2" />
                Download .exe
              </Button>
              <p className="text-xs text-slate-600 dark:text-slate-400">Windows 10 or later</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Linux</h3>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                <Link href="https://github.com/nookat-io/nookat/releases/download/v0.1.0/Nookat-0.1.0-arm64.AppImage">
                  <Download className="w-4 h-4 mr-2" />
                  Download .AppImage
                </Link>
              </Button>
              <p className="text-xs text-slate-600 dark:text-slate-400">Most distributions</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-300 dark:border-slate-700 max-w-2xl mx-auto">
          <h3 className="font-semibold mb-3 text-slate-900 dark:text-white">Command Line Installation</h3>
          <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm text-left">
            <div className="text-slate-600 dark:text-slate-400 mb-1"># Install via curl</div>
            <div className="text-green-600 dark:text-green-400">curl -fsSL https://get.nookat.io | sh</div>
            <div className="text-slate-600 dark:text-slate-400 mt-2 mb-1"># Or via Homebrew (macOS)</div>
            <div className="text-green-600 dark:text-green-400">brew install nookat</div>
          </div>
        </div>
      </div>
    </section>
  )
} 