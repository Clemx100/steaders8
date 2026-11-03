import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireApprovedInvestor } from '@/lib/portal-auth'
import { certificateFromInvestment, generateCertificateCode } from '@/lib/certificate'
import { qrDataUrlForPayload } from '@/lib/certificate-qr'
import { CertificateViewer } from '@/components/investor/certificate-viewer'
import type { Investment, Project, Season } from '@/lib/portal'

export const dynamic = 'force-dynamic'

export default async function CertificatePage({
  params,
  searchParams,
}: {
  params: Promise<{ investmentId: string }>
  searchParams: Promise<{ download?: string }>
}) {
  const { investmentId } = await params
  const { download } = await searchParams
  const { supabase, user, profile } = await requireApprovedInvestor()

  const { data: row } = await supabase
    .from('investments')
    .select('*, project:projects(*), season:seasons(*)')
    .eq('id', investmentId)
    .eq('investor_id', user.id)
    .maybeSingle()

  if (!row || row.status !== 'confirmed') notFound()

  const investment = row as Investment & {
    project: Project
    season: Season | null
    certificate_code?: string | null
  }

  let certificateCode = investment.certificate_code
  if (!certificateCode) {
    certificateCode = generateCertificateCode(
      investment.project.slug,
      investment.id,
      investment.confirmed_at,
    )
    const { error } = await supabase
      .from('investments')
      .update({ certificate_code: certificateCode })
      .eq('id', investment.id)
    if (error && !/certificate_code/i.test(error.message)) {
      // Non-column errors are ignored for display; code still works deterministically
    }
  }

  const data = certificateFromInvestment({
    investment: { ...investment, certificate_code: certificateCode },
    profile,
    project: investment.project,
    season: investment.season,
  })
  if (!data) notFound()

  const qrDataUrl = await qrDataUrlForPayload(data.qrPayload)

  return (
    <div className="certificate-page min-h-screen bg-[#e8efe9] px-4 py-8 print:bg-white print:p-0">
      <div className="print:hidden mx-auto mb-6 max-w-4xl text-center">
        <Link href="/investor/dashboard" className="text-sm font-semibold text-green-700 hover:underline">
          ← Back to dashboard
        </Link>
        <h1 className="mt-3 font-serif text-2xl font-bold text-gray-900">Your certificate</h1>
        <p className="mt-1 text-sm text-gray-600">View or download this certificate for your records.</p>
      </div>

      <CertificateViewer data={data} qrDataUrl={qrDataUrl} autoAction={download === '1' ? 'download' : null} />
    </div>
  )
}
