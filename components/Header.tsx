import React from "react"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="./logo.png" alt="Nookat Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Nookat</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-slate-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#download" className="text-slate-300 hover:text-white transition-colors">
            Download
          </a>
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
        </nav>
      </div>
    </header>
  )
} 