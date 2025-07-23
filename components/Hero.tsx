"use client"

import React, { useState, useEffect } from "react"
import { Download, Terminal, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackgroundEffects } from "./BackgroundEffects"
import { GridEffect } from "./GridEffect"

export function Hero() {
  const [userOS, setUserOS] = useState<string>("")
  const [otherOS, setOtherOS] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Detect user's operating system
    const detectOS = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      
      if (userAgent.includes('mac')) {
        setUserOS("macOS")
        setOtherOS("Other Systems")
      } else if (userAgent.includes('win')) {
        setUserOS("Other Systems")
        setOtherOS("macOS")
      } else if (userAgent.includes('linux')) {
        setUserOS("Linux")
        setOtherOS("macOS")
      } else {
        // Default fallback
        setUserOS("Other Systems")
        setOtherOS("macOS")
      }
    }

    detectOS()
  }, [])

  const getDownloadUrl = (os: string) => {
    switch (os.toLowerCase()) {
      case 'macos':
        return 'https://github.com/nookat-io/nookat/releases/download/v0.1.0/Nookat-0.1.0-arm64.dmg'
      case 'windows':
        return 'https://github.com/nookat-io/nookat/releases/latest'
      case 'linux':
        return 'https://github.com/nookat-io/nookat/releases/download/v0.1.0/Nookat-0.1.0-arm64.AppImage'
      default:
        return 'https://github.com/nookat-io/nookat/releases/latest'
    }
  }

  const handleDownload = (os: string) => {
    if (!mounted) return
    const url = getDownloadUrl(os)
    if (os.toLowerCase() === 'windows' || os.toLowerCase() === 'other systems') {
      // Open GitHub releases page for Windows and other systems
      window.open(url, '_blank')
    } else {
      // Download the file directly for macOS and Linux
      const link = document.createElement('a')
      link.href = url
      link.download = ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleOtherDownload = () => {
    if (!mounted) return
    // Open GitHub releases page for all other options
    window.open('https://github.com/nookat-io/nookat/releases/latest', '_blank')
  }

  const handleCopyCommand = () => {
    if (!mounted) return
    navigator.clipboard.writeText("curl -fsSL https://get.nookat.io | sh")
  }

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-slate-50 dark:bg-slate-900">
      <BackgroundEffects />

      <GridEffect />

      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg shadow-blue-500/25 backdrop-blur-sm px-8 py-3 text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105">
          Free Docker Desktop Alternative
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-700 dark:from-white dark:via-blue-100 dark:to-slate-300 bg-clip-text text-transparent drop-shadow-lg">
          Container Management
          <br />
          Made Simple
        </h1>
        <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm">
          Nookat is a lightweight Docker container management tool that provides all the essential features
          you need without the bloat. Fast, intuitive, and completely free.
        </p>

        {/* Installation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            className="inline-flex items-center justify-center h-12 rounded-md px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            onClick={() => handleDownload(userOS)}
          >
            <Download className="w-5 h-5 mr-2" />
            Download for {userOS}
          </Button>
          <Button
            className="inline-flex items-center justify-center h-12 rounded-md px-8 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-500/50"
            onClick={handleOtherDownload}
          >
            <Download className="w-5 h-5 mr-2" />
            Download for {otherOS}
          </Button>
        </div>

        {/* Terminal Installation */}
        <div className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto border border-slate-300/50 dark:border-slate-700/50 shadow-xl relative overflow-hidden">
          {/* Terminal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 rounded-lg"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <code className="text-green-600 dark:text-green-400 font-mono text-sm">curl -fsSL https://get.nookat.io | sh</code>
            </div>
            <button
              type="button"
              title="Copy install command"
              className="p-2 rounded hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:scale-110"
              onClick={handleCopyCommand}
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 