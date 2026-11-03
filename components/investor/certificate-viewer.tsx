'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Download, Loader2, Lock, Printer, X } from 'lucide-react'
import { InvestmentCertificate } from '@/components/investor/investment-certificate'
import { confirmCertificatePassword } from '@/app/investor/certificate/actions'
import type { CertificateData } from '@/lib/certificate'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'

type PendingAction = 'print' | 'download' | null

export function CertificateViewer({
  data,
  qrDataUrl,
  autoAction,
}: {
  data: CertificateData
  qrDataUrl: string
  autoAction?: 'print' | 'download' | null
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [showQr, setShowQr] = useState(false)
  const [pending, setPending] = useState<PendingAction>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const autoAsked = useRef(false)

  const closeDialog = () => {
    if (busy) return
    setPending(null)
    setPassword('')
    setError('')
  }

  const runPrint = useCallback(async () => {
    setShowQr(true)
    document.body.classList.add('certificate-printing')
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    await new Promise((r) => setTimeout(r, 120))
    window.print()
    document.body.classList.remove('certificate-printing')
  }, [])

  const runDownload = useCallback(async () => {
    setShowQr(true)
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    await new Promise((r) => setTimeout(r, 180))

    const el = sheetRef.current
    if (!el) throw new Error('Certificate not ready')

    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')])

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#f7f3ea',
      logging: false,
    })

    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()
    const ratio = Math.min(pageW / canvas.width, pageH / canvas.height)
    const w = canvas.width * ratio
    const h = canvas.height * ratio
    const x = (pageW - w) / 2
    const y = (pageH - h) / 2
    pdf.addImage(img, 'PNG', x, y, w, h)
    pdf.save(`Steaders8-Certificate-${data.certificateNumber}.pdf`)
  }, [data.certificateNumber])

  async function confirmPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!pending) return
    setBusy(true)
    setError('')
    try {
      const check = await confirmCertificatePassword(password)
      if (!check.ok) {
        setError(check.error)
        setBusy(false)
        return
      }

      const action = pending
      setPending(null)
      setPassword('')

      if (action === 'print') await runPrint()
      else await runDownload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not complete the request')
    } finally {
      setBusy(false)
      setShowQr(false)
    }
  }

  useEffect(() => {
    const after = () => setShowQr(false)
    window.addEventListener('afterprint', after)
    return () => window.removeEventListener('afterprint', after)
  }, [])

  useEffect(() => {
    if (!autoAction || autoAsked.current) return
    autoAsked.current = true
    setPending(autoAction)
  }, [autoAction])

  return (
    <>
      <div className="print:hidden mx-auto mb-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setPending('download')}
          className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </button>
        <button
          type="button"
          onClick={() => setPending('print')}
          className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-50"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
      </div>

      <div ref={sheetRef}>
        <InvestmentCertificate data={data} qrDataUrl={qrDataUrl} showQr={showQr} />
      </div>

      {pending && (
        <div className="print:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={confirmPassword}
            className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Confirm your password</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Enter your investor password to {pending === 'download' ? 'download' : 'print'} this certificate.
                    The verification QR appears only on the file or printout.
                  </p>
                </div>
              </div>
              <button type="button" onClick={closeDialog} className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cert-password">Password</Label>
              <PasswordInput
                id="cert-password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>

            {error && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={busy || !password}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending === 'download' ? 'Download PDF' : 'Print certificate'}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
