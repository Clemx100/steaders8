'use client'

import Link from 'next/link'

const products = [
  {
    id: 1,
    name: 'Yam',
    description: 'Fresh, nutrient-rich yams harvested and carefully stored using traditional methods for premium quality and long shelf life.',
    image: '/yam.png',
    features: ['Nutrient-rich', 'Traditionally stored', 'Locally sourced'],
    anchor: 'yam-farming',
  },
  {
    id: 2,
    name: 'Cucumber',
    description: 'Premium quality cucumbers grown with our innovative vertical farming technology.',
    image: '/cucumber.png',
    features: ['Vertical farmed', 'Year-round', 'Crisp & fresh'],
    anchor: 'cucumber-farming',
  },
  {
    id: 3,
    name: 'Sweet Corn',
    description: 'Fresh, golden sweet corn harvested at peak ripeness for the best flavor and nutrition.',
    image: '/sweet-corn.png',
    features: ['Premium quality', 'Sustainable', 'Traceable'],
    anchor: 'sweet-corn-farming',
  },
]

export function Products() {
  return (
    <section id="products" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium, sustainably-grown produce available for wholesale and direct distribution.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/upcoming-investment?tab=ongoing#${product.anchor}`}
                  className="inline-flex w-full items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Invest in {product.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
