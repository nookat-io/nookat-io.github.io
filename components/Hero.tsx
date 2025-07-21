"use client"

import React, { useState, useEffect } from "react"
import { Download, Terminal, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackgroundEffects } from "./BackgroundEffects"

export function Hero() {
  const [userOS, setUserOS] = useState<string>("")
  const [otherOS, setOtherOS] = useState<string>("")

  useEffect(() => {
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
        return '#macos-download'
      case 'windows':
        return '#windows-download'
      case 'linux':
        return '#linux-download'
      default:
        return '#download'
    }
  }

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-sm px-8 py-2">
          Free Docker Desktop Alternative
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent drop-shadow-lg">
          Container Management
          <br />
          Made Simple
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm">
          Nookat is a lightweight Docker container management tool that provides all the essential features
          you need without the bloat. Fast, intuitive, and completely free.
        </p>

        {/* Installation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            onClick={() => window.open(getDownloadUrl(userOS), '_blank')}
          >
            <Download className="w-5 h-5 mr-2" />
            Download for {userOS}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 px-8 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-500/50"
            onClick={() => window.open(getDownloadUrl(otherOS), '_blank')}
          >
            <Download className="w-5 h-5 mr-2" />
            Download for {otherOS}
          </Button>
        </div>

        {/* Terminal Installation */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto border border-slate-700/50 shadow-xl relative overflow-hidden">
          {/* Terminal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 rounded-lg"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <code className="text-green-400 font-mono text-sm">curl -fsSL https://get.nookat.io | sh</code>
            </div>
            <button
              type="button"
              title="Copy install command"
              className="p-2 rounded hover:bg-slate-700/50 transition-all duration-200 text-slate-400 hover:text-white hover:scale-110"
              onClick={() => {
                navigator.clipboard.writeText("curl -fsSL https://get.nookat.io | sh")
              }}
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 