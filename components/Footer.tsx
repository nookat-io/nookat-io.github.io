import React from "react"
import { Container, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-800/50 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <Container className="w-4 h-4" />
            </div>
            <span className="font-semibold">Nookat</span>
          </div>
          <div className="text-center text-slate-400 text-sm">
            © 2025 Nookat. Free and open source Docker Desktop alternative.
            <br />
            <span className="text-xs">Docker is a registered trademark of Docker, Inc. Nookat is not affiliated with Docker, Inc. in any way.</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="https://github.com/nookat-io/nookat" className="hover:text-white transition-colors border border-slate-700 rounded-md p-2">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 