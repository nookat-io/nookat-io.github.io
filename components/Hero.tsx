import React from "react"
import { Download, Terminal, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
          Free Docker Desktop Alternative
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Container Management
          <br />
          Made Simple
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Nookat is a lightweight, native Docker container management tool that provides all the essential features
          you need without the bloat. Fast, intuitive, and completely free.
        </p>

        {/* Installation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            <Download className="w-5 h-5 mr-2" />
            Download for macOS
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 bg-transparent"
          >
            <Download className="w-5 h-5 mr-2" />
            Download for Windows
          </Button>
        </div>

        {/* Terminal Installation */}
        <div className="bg-slate-800 rounded-lg p-4 max-w-2xl mx-auto border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-400" />
            <code className="text-green-400 font-mono text-sm">curl -fsSL https://get.nookat.io | sh</code>
          </div>
          <button
            type="button"
            title="Copy install command"
            // className="ml-4 p-2 rounded hover:bg-slate-700 transition-colors text-slate-400"
            // onClick={() => {
            //   navigator.clipboard.writeText("curl -fsSL https://get.nookat.io | sh")
            // }}
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
} 