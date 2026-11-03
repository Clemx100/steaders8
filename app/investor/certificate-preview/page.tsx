import Link from 'next/link'
import { InvestmentCertificate } from '@/components/investor/investment-certificate'
import { toCertificateData } from '@/lib/certificate'
import { qrDataUrlForPayload } from '@/lib/certificate-qr'

export const metadata = { title: 'Certificate preview | Steaders8 Farm' }

export default async function CertificatePreviewPage() {
  const data = toCertificateData({
    certificateCode: 'S8-GRE-2026-0008',
    investorName: 'EMMANUEL AMARA EZEIKE',
    projectName: 'Greenhouse Expansion',
    seasonLabel: 'Season 1 · 2026',
    amount: 4_500_000,
    confirmedAt: '2026-11-03T10:00:00.000Z',
  })
  const qrDataUrl = await qrDataUrlForPayload(data.qrPayload)

  return (
    <div className="min-h-screen bg-[#e8efe9] px-4 py-10">
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-700">Design preview</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-gray-900">Certificate of Investment</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
          Sample with a custom amount (₦4,500,000), CEO signature, and admin-only QR. Live certificates use each
          investor&apos;s real name and confirmed amount.
        </p>
        <Link href="/investor/dashboard" className="mt-4 inline-block text-sm font-semibold text-green-700 hover:underline">
          ← Back to dashboard
        </Link>
      </div>

      <InvestmentCertificate data={data} qrDataUrl={qrDataUrl} />
    </div>
  )
}
