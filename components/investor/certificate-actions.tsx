'use client'

import Link from 'next/link'
import { Download, FileBadge2 } from 'lucide-react'

export function CertificateActions({ investmentId }: { investmentId: string }) {
  const href = `/investor/certificate/${investmentId}`

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-semibold text-green-800 hover:bg-green-50"
      >
        <FileBadge2 className="h-4 w-4" />
        View certificate
      </Link>
      <Link
        href={`${href}?download=1`}
        className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
      >
        <Download className="h-4 w-4" />
        Download
      </Link>
    </div>
  )
}
