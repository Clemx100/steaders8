'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  Mail,
  Phone,
  Sprout,
  Coins,
  Medal,
  Gem,
  BarChart3,
  Rocket,
  Search,
  Wheat,
  Lightbulb,
  Globe,
  Circle,
  Crop,
} from 'lucide-react'

type Tab = 'upcoming' | 'ongoing'
type Opportunity = 'greenhouse' | 'truck' | 'supermarket' | 'biogas'
const WHATSAPP_URL = 'https://wa.me/2348131074911'
const EMAIL_ADDRESS = 'steaders8@gmail.com'
const PHONE_NUMBER = '08131074911'

export default function UpcomingInvestmentContent() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>('upcoming')
  const [opportunity, setOpportunity] = useState<Opportunity>('greenhouse')

  // When opened with ?tab=ongoing (e.g. from Yam Farming card), show Ongoing tab
  useEffect(() => {
    if (searchParams.get('tab') === 'ongoing') {
      setTab('ongoing')
    }
  }, [searchParams])

  useEffect(() => {
    if (tab !== 'ongoing') return
    const hash = window.location.hash
    if (!hash) return
    const targetId = hash.replace('#', '')
    if (!targetId) return
    const target = document.getElementById(targetId)
    if (!target) return
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
  }, [tab])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/invest#upcoming"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Invest
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Upcoming Investment
          </h1>
          <div className="w-16 h-1 bg-green-600 mb-10" />

          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200 mb-10">
            <button
              type="button"
              onClick={() => setTab('upcoming')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                tab === 'upcoming'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setTab('ongoing')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                tab === 'ongoing'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Ongoing
            </button>
          </div>

          {tab === 'ongoing' && (
            <div className="space-y-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900">Ongoing Investment</h2>
              {/* Yam Farming */}
              <div
                id="yam-farming"
                className="scroll-mt-24 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50/80 to-white p-6 md:p-8 shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src="/yam.png"
                      alt="Steaders8 Yam farming"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">Yam Farming</h3>
                    <p className="text-gray-600 mb-4">
                      Invest in large-scale yam production supported by efficient cultivation methods and improved storage
                      systems designed to preserve quality and maximize profitability.
                    </p>
                    <p className="text-gray-600 mb-6">
                      With yam being one of the most consumed staple foods, this opportunity offers strong market demand,
                      reliable sales channels, and attractive long-term returns for investors.
                    </p>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Investment Highlights</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Strong and consistent market demand</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Reduced post-harvest losses through improved storage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Scalable production with high return potential</span>
                        </li>
                      </ul>
                    </div>
                    <div className="inline-flex flex-col gap-1 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 mb-6">
                      <span className="text-sm font-medium text-amber-800">Investment window closes</span>
                      <span className="text-lg font-bold text-amber-900">8th May 2026</span>
                      <span className="text-sm text-amber-700">for the year 2026</span>
                    </div>
                    {/* Documents */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Proposal & Agreement</h4>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="/documents/steaders8-agreement-yam-farming.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          Agreement (Yam Farming)
                        </a>
                        <a
                          href="/documents/steaders8-proposal-yam-farming.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-green-600 text-green-700 text-sm font-medium hover:bg-green-50 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          Proposal (Yam Farming)
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Open in a new tab to read or download.</p>
                    </div>
                    {/* Contact */}
                    <div className="flex items-center gap-3">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                        title="Chat on WhatsApp"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-md ring-1 ring-green-700/30 hover:bg-green-700 hover:scale-105 transition-transform"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                      <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        aria-label={`Email ${EMAIL_ADDRESS}`}
                        title={EMAIL_ADDRESS}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white shadow-md ring-1 ring-slate-900/30 hover:bg-slate-800 hover:scale-105 transition-transform"
                      >
                        <Mail className="w-6 h-6" />
                      </a>
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        aria-label={`Call ${PHONE_NUMBER}`}
                        title={PHONE_NUMBER}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white shadow-md ring-1 ring-emerald-700/30 hover:bg-emerald-700 hover:scale-105 transition-transform"
                      >
                        <Phone className="w-6 h-6" />
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Interested investors can contact Steaders8 via WhatsApp, email, or call.
                    </p>
                  </div>
                </div>
              </div>
              {/* Cucumber Farming */}
              <div
                id="cucumber-farming"
                className="scroll-mt-24 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50/80 to-white p-6 md:p-8 shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src="/cucumber.png"
                      alt="Steaders8 Cucumber farming"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">Cucumber Farming</h3>
                    <p className="text-gray-600 mb-4">
                      Invest in high-demand cucumber production supported by efficient cultivation methods that ensure
                      consistent yields and reliable market supply.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Cucumbers are widely consumed in fresh markets, supermarkets, restaurants, and food processing
                      industries, creating steady demand and strong sales opportunities. Our scalable production model
                      enables investors to benefit from fast growth cycles and attractive returns.
                    </p>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Investment Highlights</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Strong demand in fresh produce markets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Fast growth cycle with multiple harvests</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Scalable production with strong profit potential</span>
                        </li>
                      </ul>
                    </div>
                    <div className="inline-flex flex-col gap-1 rounded-lg bg-green-50 border border-green-200 px-4 py-3 mb-6">
                      <span className="text-sm font-medium text-green-800">Investment window is open</span>
                      <span className="text-lg font-bold text-green-900">Round the year</span>
                    </div>
                    {/* Documents */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Proposal & Agreement</h4>
                      <p className="text-sm text-gray-600">Documents coming soon.</p>
                    </div>
                    {/* Contact */}
                    <div className="flex items-center gap-3">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                        title="Chat on WhatsApp"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-md ring-1 ring-green-700/30 hover:bg-green-700 hover:scale-105 transition-transform"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                      <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        aria-label={`Email ${EMAIL_ADDRESS}`}
                        title={EMAIL_ADDRESS}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white shadow-md ring-1 ring-slate-900/30 hover:bg-slate-800 hover:scale-105 transition-transform"
                      >
                        <Mail className="w-6 h-6" />
                      </a>
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        aria-label={`Call ${PHONE_NUMBER}`}
                        title={PHONE_NUMBER}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white shadow-md ring-1 ring-emerald-700/30 hover:bg-emerald-700 hover:scale-105 transition-transform"
                      >
                        <Phone className="w-6 h-6" />
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Interested investors can contact Steaders8 via WhatsApp, email, or call.
                    </p>
                  </div>
                </div>
              </div>
              {/* Sweet Corn Farming */}
              <div
                id="sweet-corn-farming"
                className="scroll-mt-24 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50/80 to-white p-6 md:p-8 shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src="/sweet-corn.png"
                      alt="Steaders8 Sweet Corn farming"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">Sweet Corn Farming</h3>
                    <p className="text-gray-600 mb-4">
                      Invest in high-quality sweet corn production driven by modern farming practices designed to maximize
                      yield and ensure consistent market supply.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Sweet corn is widely consumed in households, food processing industries, and retail markets, creating
                      strong and reliable demand. Our scalable production model allows investors to benefit from fast-growing
                      cycles and attractive agricultural returns.
                    </p>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Investment Highlights</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>High consumer demand across multiple markets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Fast-growing crop with quick harvest cycles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Scalable production with strong revenue potential</span>
                        </li>
                      </ul>
                    </div>
                    <div className="inline-flex flex-col gap-1 rounded-lg bg-green-50 border border-green-200 px-4 py-3 mb-6">
                      <span className="text-sm font-medium text-green-800">Investment window is open</span>
                      <span className="text-lg font-bold text-green-900">Round the year</span>
                    </div>
                    {/* Documents */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Proposal & Agreement</h4>
                      <p className="text-sm text-gray-600">Documents coming soon.</p>
                    </div>
                    {/* Contact */}
                    <div className="flex items-center gap-3">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                        title="Chat on WhatsApp"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-md ring-1 ring-green-700/30 hover:bg-green-700 hover:scale-105 transition-transform"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                      <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        aria-label={`Email ${EMAIL_ADDRESS}`}
                        title={EMAIL_ADDRESS}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white shadow-md ring-1 ring-slate-900/30 hover:bg-slate-800 hover:scale-105 transition-transform"
                      >
                        <Mail className="w-6 h-6" />
                      </a>
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        aria-label={`Call ${PHONE_NUMBER}`}
                        title={PHONE_NUMBER}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white shadow-md ring-1 ring-emerald-700/30 hover:bg-emerald-700 hover:scale-105 transition-transform"
                      >
                        <Phone className="w-6 h-6" />
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Interested investors can contact Steaders8 via WhatsApp, email, or call.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'upcoming' && (
            <>
              {/* Opportunity selector */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                {(
                  [
                    { id: 'greenhouse' as const, label: 'Build a Greenhouse' },
                    { id: 'biogas' as const, label: 'Biogas Plant' },
                    { id: 'truck' as const, label: 'Purchase a Transport Truck' },
                    { id: 'supermarket' as const, label: 'Steaders8 Greenhouse Supermarket' },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setOpportunity(id)}
                    className={`rounded-lg border-2 px-4 py-3 text-left font-medium transition-colors ${
                      opportunity === id
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-200 hover:border-green-300 text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Greenhouse */}
              {opportunity === 'greenhouse' && (
                <div className="space-y-10">
                  {/* Image grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-md">
                      <Image
                        src="/upcoming/greenhouse-5.png"
                        alt="Steaders8 greenhouse structure"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 280px"
                        unoptimized
                      />
                    </div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-md">
                      <Image
                        src="/upcoming/greenhouse-6.png"
                        alt="Greenhouse crops and growing area"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 280px"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Sprout className="w-7 h-7 text-green-600 shrink-0" />
                        Invest in a Modern Greenhouse Farm
                      </h2>
                      <p className="text-gray-600 mb-4">
                        We are building a 1-acre commercial greenhouse valued at ₦30,000,000 designed to produce high-value
                        vegetables such as Tomatoes &amp; Bell Peppers year-round.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Unlike traditional farming, greenhouse agriculture uses controlled environments, drip irrigation, and
                        precision nutrients to produce 3–5x higher yields with predictable harvests.
                      </p>
                      <p className="text-gray-600">
                        Your investment helps build the greenhouse and gives you a share in the profits from the harvest.
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-green-600 shrink-0" />
                      Greenhouse Investment Goal
                    </h3>
                      <div className="grid gap-2 text-sm text-gray-600">
                        <p>
                          <span className="font-semibold text-gray-900">Total Required:</span> ₦30,000,000
                        </p>
                        <p>
                          <span className="font-semibold text-gray-900">Project:</span> 1 Acre Greenhouse
                        </p>
                        <p>
                          <span className="font-semibold text-gray-900">Crops:</span> Tomatoes &amp; Bell Peppers
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-green-600 shrink-0" />
                      Investment Tiers
                    </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:border-green-200 hover:shadow-md transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Medal className="w-5 h-5 text-amber-600 shrink-0" />
                            Bronze Partner
                          </h4>
                            <p className="text-sm text-gray-500">Investment: ₦2,000,000</p>
                            <p className="text-sm text-gray-500">Slots Available: 10 investors</p>
                            <p className="text-sm text-gray-500">Total Contribution: ₦20,000,000</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Share in harvest profits
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Quarterly farm report
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Invitation to farm visit
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-xl border-2 border-green-300 bg-green-50/50 p-6 shadow-sm hover:border-green-400 hover:shadow-md transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Medal className="w-5 h-5 text-gray-400 shrink-0" />
                            Silver Partner
                          </h4>
                            <p className="text-sm text-gray-500">Investment: ₦3,000,000</p>
                            <p className="text-sm text-gray-500">Slots Available: 3 investors</p>
                            <p className="text-sm text-gray-500">Total Contribution: ₦9,000,000</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Everything in Bronze
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Larger profit share
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Annual supply of tomatoes or bell peppers
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-xl border-2 border-green-500 bg-green-50/70 p-6 shadow-md hover:border-green-600 hover:shadow-lg transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Medal className="w-5 h-5 text-amber-500 shrink-0" />
                            Gold Partner
                          </h4>
                            <p className="text-sm text-gray-500">Investment: ₦5,000,000</p>
                            <p className="text-sm text-gray-500">Slots Available: 1 investor</p>
                            <p className="text-sm text-gray-500">Total Contribution: ₦5,000,000</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Everything in Silver
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Premium harvest share
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Priority access to future greenhouse investments
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-green-600 shrink-0" />
                      Greenhouse Investor Returns by Tier
                    </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600">
                          <thead className="text-xs uppercase text-gray-500 border-b">
                            <tr>
                              <th className="py-2 pr-4 font-semibold">Tier</th>
                              <th className="py-2 pr-4 font-semibold">Investment</th>
                              <th className="py-2 font-semibold">Fixed Return (per year)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Circle className="w-3.5 h-3.5 text-green-600 fill-green-600 shrink-0" />
                                  Starter
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦500,000</td>
                              <td className="py-3">10%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Medal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  Silver
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦1,000,000</td>
                              <td className="py-3">12%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Medal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  Gold
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦3,000,000</td>
                              <td className="py-3">15%</td>
                            </tr>
                            <tr>
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Gem className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                                  Platinum
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦6,000,000</td>
                              <td className="py-3">18%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-600 shrink-0" />
                      Funding Progress
                    </h3>
                      <p className="text-sm text-gray-600">Greenhouse Construction Goal</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">₦30,000,000</p>
                      <div className="mt-4 h-3 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full bg-green-600" style={{ width: '0%' }} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="font-semibold text-green-700">0% Funded</span>
                        <span>₦0 Raised</span>
                        <span>₦30,000,000 Remaining</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        Once funding is completed, greenhouse construction begins immediately.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-green-600 shrink-0" />
                      Why Invest in This Greenhouse?
                    </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>High demand market for daily-consumed vegetables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Higher yields with 3–5x production vs open-field farming</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Lower risk with controlled environment agriculture</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Multiple harvests yearly for steady cash flow</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Sustainable water and nutrient management</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Search className="w-5 h-5 text-green-600 shrink-0" />
                      Transparency for Investors
                    </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Quarterly farm reports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Production updates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Financial performance reports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Harvest updates and photos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Optional farm visits</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-xl border border-green-100 bg-green-50/70 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Wheat className="w-5 h-5 text-green-600 shrink-0" />
                      Be Part of the Future of Agriculture
                    </h3>
                      <p className="text-sm text-gray-700">
                        By investing in this greenhouse, you are not only earning profits but also contributing to food
                        security, job creation, and sustainable agriculture in Nigeria. Secure your investment tier today
                        and grow with us.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Sprout className="w-5 h-5 text-green-600 shrink-0" />
                        Greenhouse Crop Focus
                      </h3>
                        <p className="text-sm text-gray-600">
                          Our greenhouse will specialize in the cultivation of premium tomatoes and bell peppers, two of the
                          most profitable greenhouse crops in Nigeria.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <Crop className="w-4 h-4 text-green-600 shrink-0" />
                        Tomatoes
                      </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src="/upcoming/cluster_of_tomatoes_on_the_vine.webp"
                              alt="Cluster of tomatoes on the vine"
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 240px"
                              unoptimized
                            />
                          </div>
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src="/upcoming/Could-Growing-Tomatoes-Indoors-Be-the-Answer-to-a-Drought-Ridden-World-7d098e47c5fc483bb51ab2fb7aa38034.jpg"
                              alt="Tomatoes growing indoors in a greenhouse"
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 240px"
                              unoptimized
                            />
                          </div>
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src="/upcoming/Tomatoes%20in%20a%20commercial%20greenhouse-1.webp"
                              alt="Tomatoes in a commercial greenhouse"
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 240px"
                              unoptimized
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Tomatoes are one of the most consumed vegetables in Nigeria, used daily in homes, restaurants, and
                          food processing.
                        </p>
                        <div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Greenhouse Advantages</h5>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Higher yield than open-field farming
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Consistent quality and size
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Reduced pest damage
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Multiple harvest cycles yearly
                            </li>
                          </ul>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">Average Market Price:</span> ₦800 – ₦1,200 per kg
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <Crop className="w-4 h-4 text-green-600 shrink-0" />
                        Bell Peppers
                      </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src="/upcoming/Bell%20Peppers.webp"
                              alt="Bell peppers in greenhouse rows"
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 240px"
                              unoptimized
                            />
                          </div>
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src="/upcoming/peppersdisplay.png"
                              alt="Sweet peppers display"
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 240px"
                              unoptimized
                            />
                          </div>
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src="/upcoming/Episode-44-Blog_729edaf3-7d99-44e0-be4d-0b46214640ef_780x.jpg"
                              alt="Bell peppers growing in greenhouse"
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 240px"
                              unoptimized
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Bell peppers (also called sweet peppers) are highly demanded by:
                        </p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            Supermarkets
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            Hotels and restaurants
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            Export vegetable buyers
                          </li>
                        </ul>
                        <p className="text-sm text-gray-600">
                          They command higher prices than most vegetables because they are considered premium produce.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-green-600 shrink-0" />
                        Why Tomatoes &amp; Bell Peppers?
                      </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            Very high demand in Nigerian markets
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            Premium prices compared to most vegetables
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            Ideal crops for greenhouse farming
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            High yield per square meter
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            Strong supply gap in supermarkets and hotels
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-lg border border-green-100 bg-green-50/70 p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                        Message from CEO to investors
                      </h4>
                        <p className="text-sm text-gray-700 italic">
                          “Nigeria still imports and struggles with vegetable shortages. Our greenhouse will produce premium
                          tomatoes and bell peppers year-round, supplying supermarkets, restaurants, and urban markets where
                          demand is highest.”
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Biogas Plant */}
              {opportunity === 'biogas' && (
                <div className="space-y-8">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src="/upcoming/biogas-plant.png"
                      alt="Steaders8 biogas plant"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 896px"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Invest in Our Biogas Plant</h2>
                      <p className="text-gray-600 mb-4">
                        Turn agricultural waste into gas and organic fertilizer, while earning long-term returns. Your
                        investment helps build a modern biogas facility that produces cooking gas, fertilizer, and carbon
                        credits.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-green-600 shrink-0" />
                      Investment Tiers
                    </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:border-green-200 hover:shadow-md transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Circle className="w-5 h-5 text-green-600 fill-green-600 shrink-0" />
                            Starter Partner — ₦500,000
                          </h4>
                            <p className="text-sm text-gray-500">Perfect for entry-level investors</p>
                            <p className="text-sm text-gray-500">Slots Available: 20</p>
                            <p className="text-sm text-gray-500">Total Contribution Potential: ₦10,000,000</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Fixed returns from gas and fertilizer sales
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Discounted biogas cylinder refill for home use
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Quarterly performance reports
                            </li>
                          </ul>
                        </div>

                        <div className="rounded-xl border-2 border-green-300 bg-green-50/50 p-6 shadow-sm hover:border-green-400 hover:shadow-md transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Medal className="w-5 h-5 text-gray-400 shrink-0" />
                            Silver Partner — ₦1,000,000
                          </h4>
                            <p className="text-sm text-gray-500">Perfect for entry-level investors</p>
                            <p className="text-sm text-gray-500">Slots Available: 10</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Fixed returns from gas and fertilizer sales
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Discounted biogas cylinder refill for home use
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Quarterly performance reports
                            </li>
                          </ul>
                        </div>

                        <div className="rounded-xl border-2 border-green-500 bg-green-50/70 p-6 shadow-md hover:border-green-600 hover:shadow-lg transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Medal className="w-5 h-5 text-amber-500 shrink-0" />
                            Gold Partner — ₦3,000,000
                          </h4>
                            <p className="text-sm text-gray-500">For investors seeking higher returns</p>
                            <p className="text-sm text-gray-500">Slots Available: 5</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Everything in Silver
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              12kg biogas cylinder once a month for life
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Annual harvest report
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              VIP plant visit
                            </li>
                          </ul>
                        </div>

                        <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:border-green-200 hover:shadow-md transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Gem className="w-5 h-5 text-violet-500 shrink-0" />
                            Platinum Partner — ₦6,000,000
                          </h4>
                            <p className="text-sm text-gray-500">Lead investor slot with premium benefits</p>
                            <p className="text-sm text-gray-500">Slots Available: 2</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Everything in Gold
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Higher profit share from all revenue streams (gas and fertilizer)
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Priority access to new biogas projects
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Investor recognition &amp; branding opportunities
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-green-600 shrink-0" />
                      Investor Returns by Tier
                    </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600">
                          <thead className="text-xs uppercase text-gray-500 border-b">
                            <tr>
                              <th className="py-2 pr-4 font-semibold">Tier</th>
                              <th className="py-2 pr-4 font-semibold">Investment</th>
                              <th className="py-2 font-semibold">Fixed Return (per year)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Circle className="w-3.5 h-3.5 text-green-600 fill-green-600 shrink-0" />
                                  Starter
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦500,000</td>
                              <td className="py-3">10%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Medal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  Silver
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦1,000,000</td>
                              <td className="py-3">12%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Medal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  Gold
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦3,000,000</td>
                              <td className="py-3">15%</td>
                            </tr>
                            <tr>
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Gem className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                                  Platinum
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦6,000,000</td>
                              <td className="py-3">18%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Biogas Plant Funding Progress</h3>
                      <div className="space-y-4 text-sm text-gray-600">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">Starter</span>
                            <span>0/20 slots filled</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '0%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">Silver</span>
                            <span>0/10 slots filled</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '0%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">Gold</span>
                            <span>0/5 slots filled</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '0%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">Platinum</span>
                            <span>0/2 slots filled</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '0%' }} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">Total Progress</span>
                          <span>0% Funded</span>
                        </div>
                        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full bg-green-600" style={{ width: '0%' }} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-green-600 shrink-0" />
                      Why Invest in Biogas?
                    </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          Sustainable energy: reduce dependence on LPG and diesel
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          High demand: households and businesses need affordable gas
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          Recurring income from gas, fertilizer, and carbon credits
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          Environmentally friendly: reduce greenhouse gas emissions
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          Scalable for more energy output and larger markets
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-green-600 shrink-0" />
                      Investor Transparency
                    </h3>
                      <p className="text-sm text-gray-600 mb-3">All investors receive:</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          Quarterly reports on energy production &amp; sales
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          Photos and videos of plant operations
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          Optional site visits
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          Priority notification of new projects
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Truck */}
              {opportunity === 'truck' && (
                <div className="space-y-8">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white border border-gray-200">
                    <Image
                      src="/upcoming/truck.png"
                      alt="Steaders8 delivery truck"
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 896px"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Farm Truck Investment</h2>
                      <p className="text-gray-600 mb-4">
                        Your investment will help us purchase a high-capacity farm truck that supports efficient transport
                        of farm produce, fertilizer, and supplies. This ensures faster distribution, reduced post-harvest
                        losses, and increased revenue from farm operations.
                      </p>
                      <p className="text-gray-600">
                        The total cost of the truck is ₦70,000,000, and we are opening multiple investor slots so many people
                        can participate.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-green-600 shrink-0" />
                      Investment Tiers
                    </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:border-green-200 hover:shadow-md transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Circle className="w-5 h-5 text-green-600 fill-green-600 shrink-0" />
                            Starter Partner — ₦500,000
                          </h4>
                            <p className="text-sm text-gray-500">Perfect for entry-level investors</p>
                            <p className="text-sm text-gray-500">Slots Available: 20</p>
                            <p className="text-sm text-gray-500">Total Contribution Potential: ₦10,000,000</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Fixed returns from farm transport revenue
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Quarterly performance reports
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Discounted delivery for small personal farm orders
                            </li>
                          </ul>
                        </div>

                        <div className="rounded-xl border-2 border-green-300 bg-green-50/50 p-6 shadow-sm hover:border-green-400 hover:shadow-md transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Medal className="w-5 h-5 text-gray-400 shrink-0" />
                            Silver Partner — ₦1,000,000
                          </h4>
                            <p className="text-sm text-gray-500">For investors looking for moderate participation</p>
                            <p className="text-sm text-gray-500">Slots Available: 15</p>
                            <p className="text-sm text-gray-500">Total Contribution Potential: ₦15,000,000</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Everything in Starter
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Guaranteed monthly revenue from truck operations
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Annual operational report
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              VIP visit to farm logistics operations
                            </li>
                          </ul>
                        </div>

                        <div className="rounded-xl border-2 border-green-500 bg-green-50/70 p-6 shadow-md hover:border-green-600 hover:shadow-lg transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Medal className="w-5 h-5 text-amber-500 shrink-0" />
                            Gold Partner — ₦3,000,000
                          </h4>
                            <p className="text-sm text-gray-500">For investors seeking higher returns</p>
                            <p className="text-sm text-gray-500">Slots Available: 8</p>
                            <p className="text-sm text-gray-500">Total Contribution Potential: ₦24,000,000</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Everything in Silver
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Larger profit share from truck logistics revenue
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Priority access to new farm transport projects
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Investor recognition
                            </li>
                          </ul>
                        </div>

                        <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:border-green-200 hover:shadow-md transition-all">
                          <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Gem className="w-5 h-5 text-violet-500 shrink-0" />
                            Platinum Partner — ₦5,000,000
                          </h4>
                            <p className="text-sm text-gray-500">Lead investor slot with premium benefits</p>
                            <p className="text-sm text-gray-500">Slots Available: 2</p>
                            <p className="text-sm text-gray-500">Total Contribution Potential: ₦10,000,000</p>
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Everything in Gold
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Highest profit share from all farm truck revenue
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              First access to future expansion projects
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              Investor branding &amp; recognition opportunities
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-green-600 shrink-0" />
                      Investor Returns by Tier
                    </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600">
                          <thead className="text-xs uppercase text-gray-500 border-b">
                            <tr>
                              <th className="py-2 pr-4 font-semibold">Tier</th>
                              <th className="py-2 font-semibold">Fixed Return (per year)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 pr-4">Starter</td>
                              <td className="py-3">8%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 pr-4">Silver</td>
                              <td className="py-3">10%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 pr-4">Gold</td>
                              <td className="py-3">12%</td>
                            </tr>
                            <tr>
                              <td className="py-3 pr-4">Platinum</td>
                              <td className="py-3">15%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Truck Funding Progress</h3>
                      <div className="space-y-4 text-sm text-gray-600">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">Starter</span>
                            <span>0/20 slots filled</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '0%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">Silver</span>
                            <span>0/15 slots filled</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '0%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">Gold</span>
                            <span>0/8 slots filled</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '0%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">Platinum</span>
                            <span>0/2 slots filled</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '0%' }} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">Total Progress</span>
                          <span>0% Funded</span>
                        </div>
                        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full bg-green-600" style={{ width: '0%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Supermarket */}
              {opportunity === 'supermarket' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src="/upcoming/supermarket.png"
                        alt="Steaders8 Greenhouse Supermarket"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 448px"
                        unoptimized
                      />
                    </div>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src="/upcoming/supermarket2.png"
                        alt="Steaders8 Greenhouse Supermarket interior"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 448px"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Invest in Steaders8 Greenhouse Supermarket</h2>
                      <p className="text-gray-600 mb-4">
                        The Steaders8 Greenhouse Supermarket Project is designed to produce fresh tomatoes and bell peppers
                        using modern greenhouse technology, ensuring consistent supply to supermarkets, restaurants, and
                        local markets.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Your investment helps us build a 1-acre commercial greenhouse, increasing food production while
                        generating stable returns for investors.
                      </p>
                      <p className="text-gray-600 font-semibold">
                        Total Project Cost: ₦30,000,000
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Coins className="w-5 h-5 text-green-600 shrink-0" />
                        Investor Returns by Tier
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600">
                          <thead className="text-xs uppercase text-gray-500 border-b">
                            <tr>
                              <th className="py-2 pr-4 font-semibold">Tier</th>
                              <th className="py-2 pr-4 font-semibold">Investment</th>
                              <th className="py-2 font-semibold">Fixed Return (per year)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Circle className="w-3.5 h-3.5 text-green-600 fill-green-600 shrink-0" />
                                  Starter
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦500,000</td>
                              <td className="py-3">10%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Medal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  Silver
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦1,000,000</td>
                              <td className="py-3">12%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Medal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  Gold
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦3,000,000</td>
                              <td className="py-3">15%</td>
                            </tr>
                            <tr>
                              <td className="py-3 pr-4">
                                <span className="inline-flex items-center gap-1.5">
                                  <Gem className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                                  Platinum
                                </span>
                              </td>
                              <td className="py-3 pr-4">₦6,000,000</td>
                              <td className="py-3">18%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-green-600 shrink-0" />
                        Funding Progress
                      </h3>
                      <p className="text-sm text-gray-600">Greenhouse Funding Goal: ₦30,000,000</p>
                      <div className="mt-4 h-3 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full bg-green-600" style={{ width: '0%' }} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="font-semibold text-green-700">0% Funded</span>
                        <span>₦0 Raised</span>
                        <span>₦30,000,000 Remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp CTA - Register interest */}
              <div className="mt-12 p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Interested in investing?</h3>
                <p className="text-gray-600 mb-6">
                  Chat with Steaders8 directly on WhatsApp. Interested investors can reach us via WhatsApp.
                </p>
                <a
                  href="https://wa.me/2348131074911"
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
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
