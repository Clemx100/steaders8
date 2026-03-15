'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks: { href: string; label: string; isButton?: boolean }[] = [
    { href: '/#about', label: 'About' },
    { href: '/#products', label: 'Products' },
    { href: '/#updates', label: 'Updates' },
    { href: '/invest', label: 'Invest', isButton: true },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture.PNG-TeBbtqARQTlKDGAwpQGpAdWZtYYq3J.png" 
            alt="Steaders8 Farm Logo" 
            className="h-16 w-auto md:h-[4.5rem] max-h-20"
          />
          <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Steaders8 Farm
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isButton ? (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  window.location.href = link.href
                }}
                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 md:hidden">
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link) =>
                link.isButton ? (
                  <button
                    key={link.href}
                    type="button"
                    className="block w-full text-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                    onClick={() => {
                      setIsOpen(false)
                      window.location.href = link.href
                    }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
