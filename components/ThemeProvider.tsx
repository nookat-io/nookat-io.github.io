"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "light",
  setTheme: () => {},
  mounted: false,
})

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "nookat-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme
      if (savedTheme && ["light", "dark"].includes(savedTheme)) {
        setTheme(savedTheme)
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error)
    }
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme, mounted])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    try {
      localStorage.setItem(storageKey, newTheme)
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error)
    }
  }

  return (
    <ThemeProviderContext.Provider value={{
      theme,
      setTheme: handleSetTheme,
      mounted,
    }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
} 