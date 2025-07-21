import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nookat - Free and open source Docker Desktop alternative',
  description: 'Free and open source Docker Desktop alternative',
  generator: 'Nookat',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>  
        {children}
      </body>
    </html>
  )
}
