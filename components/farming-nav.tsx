import Link from 'next/link'

const pages = [
  { href: '/crop-farming', label: 'Crop Farming' },
  { href: '/livestock-farming', label: 'Livestock Farming' },
] as const

export function FarmingNav({ current }: { current: (typeof pages)[number]['href'] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {pages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
            current === page.href
              ? 'border-green-600 bg-green-50 text-green-800'
              : 'border-gray-200 text-gray-700 hover:border-green-300'
          }`}
        >
          {page.label}
        </Link>
      ))}
    </div>
  )
}
