import Link from 'next/link'

export function PortalNotConfigured() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f2] px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-sm border border-green-100 text-center">
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Investor portal coming soon</h1>
        <p className="text-gray-600 text-sm mb-6">
          The investor portal is being set up. Please check back shortly or contact Steaders8 Farm on WhatsApp.
        </p>
        <Link href="/" className="inline-flex px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700">
          Back to website
        </Link>
      </div>
    </div>
  )
}
