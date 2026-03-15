'use client'

import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold">
                S8
              </div>
              <span className="text-white font-semibold text-lg">Steaders8</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Leading the agricultural revolution through sustainable farming practices and community investment.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-500 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@steader8_farm" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UC6fW7tHIEidZp-0iA5kHZJQ" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#about" className="hover:text-green-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-green-500 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/#updates" className="hover:text-green-500 transition-colors">
                  Latest Updates
                </a>
              </li>
              <li>
                <Link href="/invest" className="hover:text-green-500 transition-colors">
                  Invest
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  Steaders8 Head Office<br />
                  3 Balogun Street Ikeja Lagos
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                <a href="tel:+2348131074911" className="hover:text-green-500 transition-colors">
                  +234 8131074911
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                <a href="mailto:info@steaders8.com" className="hover:text-green-500 transition-colors">
                  info@steaders8.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Steaders8. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
