import React from "react"
import { Github } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-800/50 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded flex items-center justify-center">
              <img src="./logo.png" alt="Nookat Logo" className="w-6 h-6" />
            </div>
            <span className="font-semibold">Nookat</span>
          </div>
          <div className="text-center text-slate-400 text-sm">
            © 2025 Nookat. Free and open source Docker Desktop alternative.
            <br />
            <span className="text-xs">Docker is a registered trademark of Docker, Inc. Nookat is not affiliated with Docker, Inc. in any way.</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <Link href="https://github.com/nookat-io/nookat">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 