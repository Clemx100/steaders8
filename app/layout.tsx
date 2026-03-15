import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const viewport: Viewport = {
  themeColor: '#2D8659',
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Steaders8 - Sustainable Farming for the Future',
  description: 'Discover sustainable agriculture practices and invest in the future of farming with Steaders8. Fresh produce from innovative farming methods.',
  keywords: 'sustainable farming, agriculture, vegetables, investment, organic farming',
  generator: 'v0.app',
  openGraph: {
    title: 'Steaders8 - Sustainable Farming for the Future',
    description: 'Sustainable agriculture and innovative farming practices',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900">{children}</body>
    </html>
  )
}
