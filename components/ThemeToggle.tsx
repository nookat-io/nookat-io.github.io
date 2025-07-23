"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./ThemeProvider"
import { createPortal } from "react-dom"

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mounted) return
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mounted])

  useEffect(() => {
    if (!mounted || !isOpen || !buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    setDropdownPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.right - 128, // 128px is the width of the dropdown
      width: rect.width
    })
  }, [isOpen, mounted])

  const getIcon = () => {
    switch (theme) {
      case "light":
        return "☀️"
      case "dark":
        return "🌙"
      case "system":
        return "🖥️"
      default:
        return "🖥️"
    }
  }

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      case "system":
        return "System"
      default:
        return "System"
    }
  }

  const themes = [
    { value: "light", label: "Light", icon: "☀️" },
    { value: "dark", label: "Dark", icon: "🌙" },
    { value: "system", label: "System", icon: "🖥️" }
  ]

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <Button className="inline-flex items-center justify-center h-9 rounded-md px-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800">
        <span className="text-sm mr-2">🖥️</span>
        <span className="text-sm">System</span>
        <span className="ml-2 text-xs">▼</span>
      </Button>
    )
  }

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center h-9 rounded-md px-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
      >
        <span className="text-sm mr-2">{getIcon()}</span>
        <span className="text-sm">{getLabel()}</span>
        <span className="ml-2 text-xs">▼</span>
      </Button>
      
      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed w-32 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-lg z-[9999] overflow-hidden"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => {
                setTheme(themeOption.value as "light" | "dark" | "system")
                setIsOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer border-b border-slate-200 dark:border-slate-700 last:border-b-0 ${
                theme === themeOption.value 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              <span className="text-sm">{themeOption.icon}</span>
              {themeOption.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
} 