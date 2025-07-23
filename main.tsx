import React from 'react'
import ReactDOM from 'react-dom/client'
import NookatLanding from './app/page'
import { ThemeProvider } from './components/ThemeProvider'
import './app/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="nookat-theme">
      <NookatLanding />
    </ThemeProvider>
  </React.StrictMode>
) 