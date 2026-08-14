import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Phone } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FarmingNav } from '@/components/farming-nav'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { LIVESTOCK_CONTACT } from '@/lib/contacts'

export default function LivestockFarmingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <FarmingNav current="/livestock-farming" />

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Livestock Farming
          </h1>
          <div className="w-16 h-1 bg-green-600 mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mb-12">
            Steaders8 Farm is building a responsible livestock programme that produces healthy
            animals, supports local food supply, and creates lasting value for farmers, communities,
            and investors.
          </p>

          <div
            id="goat-farming"
            className="scroll-mt-24 rounded-xl border-2 border-green-200 bg-white p-6 md:p-8 shadow-sm mb-10"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/goat-farming.png"
                  alt="Goats grazing at Steaders8 Farm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                  unoptimized
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/goat-farming-2.png"
                  alt="Goats in a livestock pen at Steaders8 Farm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                  unoptimized
                />
              </div>
            </div>

            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">Goat Farming</h2>
            <div className="inline-flex flex-col gap-1 rounded-lg bg-green-50 border border-green-200 px-4 py-3 mb-6">
              <span className="text-sm font-medium text-green-800">Investment window is open</span>
              <span className="text-lg font-bold text-green-900">Year-round</span>
            </div>

            <p className="text-gray-600 mb-4">
              Invest in commercial goat production at Steaders8 Farm, focused on healthy herd
              management, reliable feeding programmes, and strong demand from meat and breeding
              markets across Nigeria.
            </p>
            <p className="text-gray-600 mb-6">
              Goat farming offers year-round income potential, relatively fast herd growth, and
              consistent demand from festive seasons, restaurants, butchers, and local markets.
            </p>

            <h3 className="text-sm font-semibold text-gray-900 mb-3">Investment highlights</h3>
            <ul className="space-y-2 text-sm text-gray-600 mb-8">
              {[
                'Strong and growing demand for goat meat',
                'Year-round production and sales opportunities',
                'Scalable livestock model with breeding potential',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-green-200 bg-green-50/80 p-5 mb-6">
              <p className="text-sm text-gray-600 mb-1">For goat farming investment, contact</p>
              <p className="text-xl font-bold text-gray-900 mb-4">{LIVESTOCK_CONTACT.name}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={LIVESTOCK_CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp Olisaemeka
                </a>
                <a
                  href={`tel:${LIVESTOCK_CONTACT.phoneTel}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border-2 border-green-600 text-green-800 font-semibold hover:bg-green-50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {LIVESTOCK_CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div
            id="shrimp-farming"
            className="scroll-mt-24 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-6 md:p-8 shadow-sm"
          >
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 mb-8">
              <Image
                src="/upcoming/shrimp-farming.png"
                alt="Commercial shrimp farming ponds"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 960px"
                unoptimized
              />
            </div>

            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">Shrimp Farming</h2>
            <div className="inline-flex flex-col gap-1 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 mb-6">
              <span className="text-sm font-medium text-amber-800">Upcoming investment</span>
              <span className="text-lg font-bold text-amber-900">Opening soon</span>
            </div>

            <p className="text-gray-600 mb-4">
              Steaders8 Farm is preparing a commercial shrimp farming venture to supply high-value
              seafood to restaurants, retailers, hotels, and export buyers.
            </p>
            <p className="text-gray-600 mb-6">
              Shrimp farming offers strong market demand, premium pricing, and the opportunity to
              build a modern production system using controlled ponds, water management, and
              professional harvesting practices.
            </p>

            <h3 className="text-sm font-semibold text-gray-900 mb-3">Why shrimp farming</h3>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              {[
                'High-value seafood with strong commercial demand',
                'Growing interest in locally produced shrimp',
                'Scalable model for future livestock expansion',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">
              Register your interest to receive updates when the shrimp farming investment window opens.
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Looking for crops instead? Visit{' '}
            <Link href="/crop-farming" className="text-green-700 font-medium hover:underline">
              Crop Farming
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
