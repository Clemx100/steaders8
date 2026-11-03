import Image from 'next/image'
import { formatDate, formatNaira } from '@/lib/portal'
import type { CertificateData } from '@/lib/certificate'

export type { CertificateData }

/** Formal landscape certificate for on-screen view and print / PDF download. */
export function InvestmentCertificate({
  data,
  qrDataUrl,
  showQr = false,
}: {
  data: CertificateData
  qrDataUrl: string
  showQr?: boolean
}) {
  const issued = data.issuedAt ?? data.confirmedAt

  return (
    <article
      className={`certificate-sheet relative mx-auto aspect-[1.414/1] w-full max-w-[1000px] overflow-hidden bg-[#f7f3ea] text-[#1a2e1f] shadow-2xl print:shadow-none ${showQr ? 'certificate-for-export' : ''}`}
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      <div className="absolute inset-3 rounded-sm border-[3px] border-[#1f6b3a]" />
      <div className="absolute inset-5 rounded-sm border border-[#c5a35a]/80" />

      <Corner className="left-7 top-7" />
      <Corner className="right-7 top-7 rotate-90" />
      <Corner className="bottom-7 left-7 -rotate-90" />
      <Corner className="bottom-7 right-7 rotate-180" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 20%, #1f6b3a 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #c5a35a 0%, transparent 40%)',
        }}
      />

      <div className="relative flex h-full flex-col items-center px-10 py-8 sm:px-14 sm:py-10">
        <div className="flex w-full items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/steaders8-logo.png"
              alt="Steaders8 Farm"
              width={52}
              height={52}
              className="rounded-full bg-white p-1 shadow-sm"
            />
            <div className="text-left leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#1f6b3a]">Steaders8 Farm</p>
              <p className="text-[10px] tracking-wide text-[#5c6b60]">Sustainable Farming for the Future</p>
            </div>
          </div>
          <div className="certificate-qr rounded-md border border-[#c5a35a]/50 bg-white/70 p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="Certificate verification QR" className="h-[72px] w-[72px]" />
          </div>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#c5a35a]">Certificate of Investment</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/clemx-mark.png?v=3"
          alt=""
          aria-hidden
          className="mt-2 h-7 w-auto object-contain opacity-90 sm:h-8"
        />
        <h1 className="mt-2 text-center text-3xl font-bold tracking-wide text-[#143d21] sm:text-4xl">This certifies that</h1>

        <p className="mt-4 max-w-[85%] border-b border-[#c5a35a]/50 pb-2 text-center text-2xl font-bold italic tracking-wide text-[#1f6b3a] sm:text-3xl">
          {data.investorName}
        </p>

        <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#3d4f42] sm:text-base">
          is a recognised investor in the <span className="font-semibold text-[#143d21]">{data.projectName}</span> project
          {data.seasonLabel ? <span className="text-[#5c6b60]"> ({data.seasonLabel})</span> : null}, having invested the sum of
        </p>

        <p className="mt-3 text-3xl font-bold tracking-wide text-[#143d21] sm:text-4xl">{formatNaira(data.amount)}</p>

        <p className="mt-2 text-center text-xs text-[#5c6b60] sm:text-sm">
          Confirmed on <span className="font-semibold text-[#143d21]">{formatDate(data.confirmedAt)}</span>
        </p>

        <div className="mt-auto flex w-full max-w-3xl items-end justify-between gap-6 pt-6">
          <div className="min-w-[150px] text-center">
            <div className="mx-auto mb-1 flex h-16 w-48 items-end justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ceo-signature.png?v=2" alt="CEO signature" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="mx-auto mb-2 h-px w-40 bg-[#1a2e1f]/35" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c6b60]">Authorised signature</p>
            <p className="mt-0.5 text-xs text-[#143d21]">Iwewezinem Stephen · CEO</p>
          </div>

          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/certificate-seal.png?v=2"
              alt="Steaders8 Farm official seal"
              className="h-[88px] w-[88px] object-contain drop-shadow-sm"
            />
          </div>

          <div className="min-w-[150px] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c6b60]">Certificate No.</p>
            <p className="mt-1 font-mono text-xs font-semibold text-[#143d21]">{data.certificateNumber}</p>
            <p className="mt-3 text-[10px] text-[#5c6b60]">Issued {formatDate(issued)}</p>
            <p className="mt-0.5 text-[9px] text-[#8a968e]">Lokoji, Ofada, Ogun State</p>
          </div>
        </div>
      </div>
    </article>
  )
}

function Corner({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute h-8 w-8 text-[#c5a35a] ${className}`}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <path d="M2 30 V8 Q2 2 8 2 H30" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 30 V12 Q6 6 12 6 H30" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
    </svg>
  )
}
