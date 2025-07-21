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
      <body className="bg-slate-900">{children}</body>
    </html>
  )
}
