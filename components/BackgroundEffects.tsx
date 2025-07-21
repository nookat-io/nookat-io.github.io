import React from "react"

export function BackgroundEffects() {
  return (
    <>
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div> 
    </>
  )
} 