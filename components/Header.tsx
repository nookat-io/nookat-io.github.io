"use client"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="border-b border-slate-300 bg-slate-100/80 dark:border-slate-600 dark:bg-slate-800/50 backdrop-blur">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 select-none">
          <img src="./logo.png" alt="Nookat Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Nookat</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
            Features
          </a>
          <a href="#download" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
            Download
          </a>
          <ThemeToggle />
          <a href="https://github.com/nookat-io/nookat" target="_blank" rel="noopener noreferrer">
            <Button
              className="inline-flex items-center justify-center h-9 rounded-md px-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </a>
        </nav>
      </div>
    </header>
  )
} 