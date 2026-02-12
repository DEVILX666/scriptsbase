import React from "react"
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'

import './globals.css'

const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'ScriptsZone - Premium Roblox Scripts Hub',
  description: 'Access premium Roblox scripts for free. All games, all scripts, one place.',
  generator: 'v0.app',
  icons: {
    icon: 'https://i.imgur.com/CHpcON0.png',
  },
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1GPPBF34FQ"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1GPPBF34FQ');
          `}
        </script>
      </head>
      <body className="antialiased bg-black overflow-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
