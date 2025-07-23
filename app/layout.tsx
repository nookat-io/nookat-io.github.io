import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nookat - Free and open source Docker Desktop alternative</title>
        <meta name="description" content="Free and open source Docker Desktop alternative" />
        <link rel="icon" type="image/png" href="./favicon.png" />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="nookat-theme">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30 dark:opacity-20"></div>  
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
