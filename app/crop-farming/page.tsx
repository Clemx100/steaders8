import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FarmingNav } from '@/components/farming-nav'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { STEADERS8_WHATSAPP } from '@/lib/contacts'

const crops = [
  {
    name: 'Greenhouse Expansion',
    description: 'Bell pepper and super habanero production in four commercial greenhouses.',
    status: 'Open now',
    href: '/upcoming-investment?tab=ongoing#greenhouse-expansion',
    image: '/upcoming/bell-pepper-greenhouse.png',
  },
  {
    name: 'Cucumber Farming',
    description: 'Year-round cucumber production for fresh markets, restaurants, and processors.',
    status: 'Open — year-round',
    href: '/upcoming-investment?tab=ongoing#cucumber-farming',
    image: '/cucumber.png',
  },
  {
    name: 'Sweet Corn Farming',
    description: 'High-quality sweet corn grown for households, retail, and food processing.',
    status: 'Open — year-round',
    href: '/upcoming-investment?tab=ongoing#sweet-corn-farming',
    image: '/sweet-corn.png',
  },
  {
    name: 'Yam Farming',
    description: 'Large-scale yam production with improved storage for quality and shelf life.',
    status: 'Closed — 8th May 2026',
    href: '/upcoming-investment?tab=ongoing#yam-farming',
    image: '/yam.png',
    closed: true,
  },
]

export default function CropFarmingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <FarmingNav current="/crop-farming" />

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Crop Farming
          </h1>
          <div className="w-16 h-1 bg-green-600 mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mb-10">
            Crop investments cover open-field staples and greenhouse vegetables at Steaders8 Farm.
            Goat and shrimp farming are on the Livestock Farming page.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {crops.map((crop) => (
              <Link
                key={crop.name}
                href={crop.href}
                className="rounded-xl border-2 border-gray-200 bg-white overflow-hidden hover:border-green-400 hover:shadow-md transition-all"
              >
                <div className="relative h-48 bg-gray-100">
                  <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{crop.name}</h2>
                  <p className="text-sm text-gray-600 mb-3">{crop.description}</p>
                  <span
                    className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${
                      crop.closed
                        ? 'bg-gray-100 text-gray-700 border border-gray-300'
                        : 'bg-green-50 text-green-800 border border-green-200'
                    }`}
                  >
                    {crop.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50/70 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Crop farming enquiries</h3>
            <p className="text-sm text-gray-600 mb-4">
              For greenhouse, yam, cucumber, and sweet corn investments, contact Steaders8 Farm.
            </p>
            <a
              href={STEADERS8_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chat with Steaders8
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
