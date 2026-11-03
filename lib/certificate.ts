import type { Investment, Profile, Project, Season } from '@/lib/portal'

export const CERTIFICATE_QR_PREFIX = 'STEADERS8|'

export type CertificateData = {
  certificateNumber: string
  investorName: string
  projectName: string
  seasonLabel: string
  amount: number
  confirmedAt: string
  issuedAt?: string
  qrPayload: string
}

/** Short opaque code shown on the certificate and encoded in the QR. Deterministic from investment. */
export function generateCertificateCode(projectSlug: string, investmentId: string, at?: string | Date | null) {
  const slug = projectSlug
    .replace(/[^a-z0-9]/gi, '')
    .slice(0, 3)
    .toUpperCase()
    .padEnd(2, 'X')
  const year = at ? new Date(at).getFullYear() : new Date().getFullYear()
  const tail = investmentId.replace(/-/g, '').slice(0, 4).toUpperCase()
  return `S8-${slug}-${year}-${tail}`
}

export function buildQrPayload(certificateCode: string) {
  return `${CERTIFICATE_QR_PREFIX}${certificateCode}`
}

/** Parse a scanned QR string or pasted code into a bare certificate_code. */
export function parseCertificateScan(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  if (trimmed.toUpperCase().startsWith(CERTIFICATE_QR_PREFIX)) {
    const code = trimmed.slice(CERTIFICATE_QR_PREFIX.length).trim()
    return code || null
  }
  // Accept bare codes like S8-GH-2026-A1B2
  if (/^S8-[A-Z0-9]+-\d{4}-[A-Z0-9]+$/i.test(trimmed)) return trimmed.toUpperCase()
  return null
}

export function toCertificateData(input: {
  certificateCode: string
  investorName: string
  projectName: string
  seasonLabel: string | null | undefined
  amount: number
  confirmedAt: string
}): CertificateData {
  return {
    certificateNumber: input.certificateCode,
    investorName: input.investorName,
    projectName: input.projectName,
    seasonLabel: input.seasonLabel ?? '',
    amount: Number(input.amount),
    confirmedAt: input.confirmedAt,
    issuedAt: input.confirmedAt,
    qrPayload: buildQrPayload(input.certificateCode),
  }
}

export function certificateFromInvestment(input: {
  investment: Investment & { certificate_code?: string | null }
  profile: Pick<Profile, 'full_name'>
  project: Pick<Project, 'name' | 'slug'>
  season: Pick<Season, 'label'> | null
}): CertificateData | null {
  if (input.investment.status !== 'confirmed' || !input.investment.confirmed_at) return null
  const code =
    input.investment.certificate_code ||
    generateCertificateCode(input.project.slug, input.investment.id, input.investment.confirmed_at)
  return toCertificateData({
    certificateCode: code,
    investorName: input.profile.full_name,
    projectName: input.project.name,
    seasonLabel: input.season?.label,
    amount: input.investment.amount,
    confirmedAt: input.investment.confirmed_at,
  })
}
