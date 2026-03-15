'use client'

import Link from 'next/link'

const WHATSAPP_NUMBER = '2348131074911' // 08131074911 with Nigeria code
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export function Investment() {
  return (
    <section id="invest" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Investment Opportunities
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 mb-8">
            Join us in building the future of sustainable agriculture. Interested investors can chat with Steaders8 directly on WhatsApp.
          </p>
        </div>

        {/* Ongoing investments */}
        <div className="mb-10 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing investments</h3>
          <Link
            href="/upcoming-investment?tab=ongoing#yam-farming"
            className="block rounded-xl border-2 border-green-200 bg-white p-6 shadow-sm hover:border-green-400 hover:shadow-md transition-all text-left"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Yam Farming</h4>
                <p className="text-gray-600 text-sm mt-1">Investment window for 2026 season — open now.</p>
                <div className="mt-3 inline-flex flex-col gap-0.5 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                  <span className="text-xs font-medium text-amber-800">Closes</span>
                  <span className="text-sm font-bold text-amber-900">8th May 2026</span>
                </div>
              </div>
              <span className="text-green-600 font-medium text-sm shrink-0">View details →</span>
            </div>
          </Link>
          <Link
            href="/upcoming-investment?tab=ongoing#cucumber-farming"
            className="block rounded-xl border-2 border-green-200 bg-white p-6 shadow-sm hover:border-green-400 hover:shadow-md transition-all text-left"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Cucumber Farming</h4>
                <p className="text-gray-600 text-sm mt-1">Investment window is open. Round the year.</p>
                <div className="mt-3 inline-flex flex-col gap-0.5 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                  <span className="text-xs font-medium text-green-800">Open</span>
                  <span className="text-sm font-bold text-green-900">Round the year</span>
                </div>
              </div>
              <span className="text-green-600 font-medium text-sm shrink-0">View details →</span>
            </div>
          </Link>
          <Link
            href="/upcoming-investment?tab=ongoing#sweet-corn-farming"
            className="block rounded-xl border-2 border-green-200 bg-white p-6 shadow-sm hover:border-green-400 hover:shadow-md transition-all text-left"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Sweet Corn Farming</h4>
                <p className="text-gray-600 text-sm mt-1">Investment window is open. Round the year.</p>
                <div className="mt-3 inline-flex flex-col gap-0.5 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                  <span className="text-xs font-medium text-green-800">Open</span>
                  <span className="text-sm font-bold text-green-900">Round the year</span>
                </div>
              </div>
              <span className="text-green-600 font-medium text-sm shrink-0">View details →</span>
            </div>
          </Link>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat with Steaders8 on WhatsApp</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Chat with Steaders8 directly on WhatsApp. Interested investors can reach us via WhatsApp.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
