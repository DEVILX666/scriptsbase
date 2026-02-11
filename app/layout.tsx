import React from "react"
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'

import './globals.css'

const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'SCRIPTSBASE',
  description: 'Enter the digital base. Select your game. Unlock premium scripts.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0a0e27',
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={_jetbrainsMono.className}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased bg-black overflow-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
