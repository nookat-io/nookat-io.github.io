"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./ThemeProvider"

type Theme = "dark" | "light"

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-9 h-9 p-0">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const toggleTheme = () => {
    const themes: Theme[] = ["light", "dark"]
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-9 h-9 p-0"
      onClick={toggleTheme}
      title={`Current theme: ${theme}. Click to toggle theme.`}
    >
      {getIcon()}
    </Button>
  )
} 