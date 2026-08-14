'use client'

import Link from 'next/link'

type Product = {
  id: number
  name: string
  description: string
  image: string
  features: string[]
  href: string
  investLabel: string
  status?: 'open' | 'upcoming'
}

const cropProducts: Product[] = [
  {
    id: 1,
    name: 'Yam',
    description: 'Fresh, nutrient-rich yams harvested and carefully stored using traditional methods for premium quality and long shelf life.',
    image: '/yam.png',
    features: ['Nutrient-rich', 'Traditionally stored', 'Locally sourced'],
    href: '/upcoming-investment?tab=ongoing#yam-farming',
    investLabel: 'Invest in Yam',
  },
  {
    id: 2,
    name: 'Cucumber',
    description: 'Premium quality cucumbers grown with our innovative vertical farming technology.',
    image: '/cucumber.png',
    features: ['Vertical farmed', 'Year-round', 'Crisp & fresh'],
    href: '/upcoming-investment?tab=ongoing#cucumber-farming',
    investLabel: 'Invest in Cucumber',
    status: 'open',
  },
  {
    id: 3,
    name: 'Sweet Corn',
    description: 'Fresh, golden sweet corn harvested at peak ripeness for the best flavor and nutrition.',
    image: '/sweet-corn.png',
    features: ['Premium quality', 'Sustainable', 'Traceable'],
    href: '/upcoming-investment?tab=ongoing#sweet-corn-farming',
    investLabel: 'Invest in Sweet Corn',
    status: 'open',
  },
  {
    id: 4,
    name: 'Bell Pepper',
    description: 'Premium bell peppers grown in controlled greenhouse environments for consistent quality, size, and year-round supply to commercial buyers.',
    image: '/upcoming/bell-pepper-greenhouse.png',
    features: ['Greenhouse grown', 'Premium quality', 'High market demand'],
    href: '/upcoming-investment?tab=ongoing#greenhouse-expansion',
    investLabel: 'Invest in Bell Pepper',
    status: 'open',
  },
  {
    id: 5,
    name: 'Super Habanero',
    description: 'High-value super habanero peppers cultivated in modern greenhouses, delivering strong yields for wholesale, food processing, and premium markets.',
    image: '/upcoming/super-habanero-greenhouse.png',
    features: ['Controlled environment', 'High-value crop', 'Commercial supply'],
    href: '/upcoming-investment?tab=ongoing#greenhouse-expansion',
    investLabel: 'Invest in Super Habanero',
    status: 'open',
  },
]

const livestockProducts: Product[] = [
  {
    id: 6,
    name: 'Goat',
    description: 'Healthy goats raised on Steaders8 Farm for meat and breeding markets, supported by proper housing, feeding, and veterinary care for sustainable livestock production.',
    image: '/goat-farming.png',
    features: ['Year-round production', 'Strong local demand', 'Scalable herd management'],
    href: '/livestock-farming#goat-farming',
    investLabel: 'Invest in Goat Farming',
    status: 'open',
  },
  {
    id: 7,
    name: 'Shrimp',
    description: 'A planned shrimp farming venture using modern pond systems to supply restaurants, retailers, and export markets.',
    image: '/upcoming/shrimp-farming.png',
    features: ['High-value seafood', 'Growing market demand', 'Upcoming investment'],
    href: '/livestock-farming#shrimp-farming',
    investLabel: 'View upcoming investment',
    status: 'upcoming',
  },
]

function ProductCard({ product }: { product: Product }) {
  const isUpcoming = product.status === 'upcoming'

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {isUpcoming && (
          <span className="absolute top-3 right-3 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-900">
            Upcoming
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

        <div className="space-y-2 mb-6">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {product.status === 'open' && (
          <div className="mb-4 inline-flex flex-col gap-0.5 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
            <span className="text-xs font-medium text-green-800">Open</span>
            <span className="text-sm font-bold text-green-900">Year-round</span>
          </div>
        )}

        <Link
          href={product.href}
          className={`inline-flex w-full items-center justify-center px-4 py-2 font-semibold rounded-lg transition-colors ${
            isUpcoming
              ? 'border-2 border-amber-500 text-amber-800 hover:bg-amber-50'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {product.investLabel}
        </Link>
      </div>
    </div>
  )
}

function ProductCategory({
  title,
  description,
  products,
  pageHref,
}: {
  title: string
  description: string
  products: Product[]
  pageHref: string
}) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-8">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-3xl mb-3">{description}</p>
        <Link href={pageHref} className="text-sm font-semibold text-green-700 hover:text-green-800">
          Open {title.toLowerCase()} page →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export function Products() {
  return (
    <section id="products" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium crop and livestock produce available for wholesale,
            direct distribution, and investment partnerships.
          </p>
        </div>

        <ProductCategory
          title="Crop Farming"
          description="Sustainably grown vegetables and staple crops from open-field and greenhouse production at Steaders8 Farm."
          products={cropProducts}
          pageHref="/crop-farming"
        />

        <ProductCategory
          title="Livestock Farming"
          description="Goat farming is open year-round. Shrimp farming is an upcoming livestock investment. Contact Olisaemeka Uzoka for goat farming investment."
          products={livestockProducts}
          pageHref="/livestock-farming"
        />
      </div>
    </section>
  )
}
