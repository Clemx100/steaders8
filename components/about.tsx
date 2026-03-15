'use client'

import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Mission
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Steaders8 Farm, we're revolutionizing agriculture through sustainable practices that benefit communities, the environment, and investors.
          </p>
        </div>

        {/* Row 1: Team image (left) | Write-ups (right) */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-start mb-16">
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Feb%2014%2C%202026%2C%2012_41_28%20PM-mukZuXADcPtTQh4rUrGlmxjL8P0MPY.png"
              alt="Team working in the field"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sustainable Agriculture</h3>
              <p className="text-gray-600 leading-relaxed">
                We employ cutting-edge vertical farming and organic methods to maximize yield while minimizing environmental impact. Our farms are designed for efficiency and sustainability.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in empowering local communities through employment opportunities and education about sustainable farming practices.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality Produce</h3>
              <p className="text-gray-600 leading-relaxed">
                Every product is carefully cultivated and harvested to ensure the highest quality and nutritional value for consumers.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: Write-ups (left) | Greenhouse image (right) */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-start">
          <div className="space-y-6 order-2 md:order-1">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Technology-Driven Farming</h3>
              <p className="text-gray-600 leading-relaxed">
                Steaders8 Farm uses modern technologies across our operations—from precision farming to efficient irrigation and crop management—so we grow smarter and more sustainably.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Experienced & Trained Workforce</h3>
              <p className="text-gray-600 leading-relaxed">
                Our farm is run by experienced, trained workers who understand best practices in agriculture. Skilled hands and continuous training keep our standards high and our produce consistent.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Security & Surveillance</h3>
              <p className="text-gray-600 leading-relaxed">
                The farm is fully guided by on-site security and CCTV cameras, ensuring a safe, monitored environment for our team, assets, and operations around the clock.
              </p>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
            <img
              src="/about-greenhouse.png"
              alt="Greenhouse with green plants and trellising"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* About CEO */}
        <div className="mb-20 mt-20 p-8 md:p-10 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border border-gray-100">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            About the CEO
          </h3>
          <div className="flex justify-center mb-8 py-4 px-6 rounded-lg bg-gray-900">
            <Image
              src="/about-ceo-flourish.png"
              alt=""
              width={280}
              height={56}
              className="w-full max-w-[280px] h-auto object-contain"
              aria-hidden
            />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[3/4] w-full max-w-[320px] max-h-[420px] mx-auto md:mx-0 rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src="/ceo-iwewezinem-stephen.jpg"
                alt="Iwewezinem Stephen, CEO"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 320px"
                quality={95}
                priority
              />
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900">Iwewezinem Stephen</h4>
              <p className="text-green-700 font-semibold">
                Chief Executive Officer (CEO)
              </p>
              <p className="text-gray-600 text-sm">
                Steaders8 | Clemx Technologies | Ultralink
              </p>
              <p className="text-gray-600 text-sm">
                Executive Director (ED), SecureX
              </p>
            </div>
          </div>
        </div>

        {/* Message to Investors */}
        <div className="mb-16 p-8 md:p-10 bg-white rounded-2xl border-2 border-green-100 shadow-sm">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            A Message to Our Investors
          </h3>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              Dear Esteemed Investor,
            </p>
            <p>
              Thank you for considering this opportunity. Your decision to partner with us is more than a financial contribution—it is a vote of confidence in a project built on strategy, sustainability, and guaranteed market demand. Together, we are creating value that grows beyond numbers.
            </p>
            <p>
              Your investment is not only safe, but positioned to multiply. We are committed to transparency, excellence, and delivering the strong returns we have promised.
            </p>
            <p>
              Let&apos;s build something profitable, impactful, and long-lasting together.
            </p>
            <p className="font-medium text-gray-900 pt-2">
              — Iwewezinem Stephen
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
