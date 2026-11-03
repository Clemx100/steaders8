'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { CheckCircle2, Loader2, QrCode, ScanLine, ShieldX, StopCircle } from 'lucide-react'
import { verifyCertificateCode, type CertificateVerifyResult } from '@/app/admin/actions'
import { formatDate } from '@/lib/portal'

export function VerifyTab() {
  const scannerRegionId = useId().replace(/:/g, '')
  const [scanning, setScanning] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<CertificateVerifyResult | null>(null)
  const [scanError, setScanError] = useState('')
  const scannerRef = useRef<{ stop: () => Promise<void> } | null>(null)
  const handlingRef = useRef(false)

  useEffect(() => {
    return () => {
      void scannerRef.current?.stop().catch(() => undefined)
    }
  }, [])

  async function stopScanner() {
    try {
      await scannerRef.current?.stop()
    } catch {
      /* already stopped */
    }
    scannerRef.current = null
    setScanning(false)
  }

  async function runVerify(raw: string) {
    if (handlingRef.current) return
    handlingRef.current = true
    setBusy(true)
    setResult(null)
    try {
      const next = await verifyCertificateCode(raw)
      setResult(next)
      await stopScanner()
    } finally {
      setBusy(false)
      handlingRef.current = false
    }
  }

  async function startScanner() {
    setScanError('')
    setResult(null)
    setScanning(true)
    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      const scanner = new Html5Qrcode(scannerRegionId)
      scannerRef.current = scanner
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 8, qrbox: { width: 240, height: 240 } },
        (decoded) => {
          void runVerify(decoded)
        },
        () => undefined,
      )
    } catch (err) {
      setScanning(false)
      scannerRef.current = null
      setScanError(
        err instanceof Error
          ? err.message
          : 'Could not open the camera. Allow camera access or paste the code instead.',
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Verify certificate</h2>
            <p className="mt-1 text-sm text-gray-600">
              Scan the QR on a printed certificate, or paste the certificate number. Only admins can confirm whether
              someone is a real Steaders8 investor.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">Camera scan</p>
            <div
              id={scannerRegionId}
              className="min-h-[240px] overflow-hidden rounded-xl border border-dashed border-green-200 bg-gray-50"
            />
            <div className="flex flex-wrap gap-2">
              {!scanning ? (
                <button
                  type="button"
                  onClick={() => void startScanner()}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
                >
                  <ScanLine className="h-4 w-4" />
                  Scan QR code
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void stopScanner()}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100"
                >
                  <StopCircle className="h-4 w-4" />
                  Stop camera
                </button>
              )}
            </div>
            {scanError && <p className="text-sm text-red-600">{scanError}</p>}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">Or paste code</p>
            <input
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="S8-GH-2026-A1B2 or STEADERS8|..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
            <button
              type="button"
              disabled={busy || !manualCode.trim()}
              onClick={() => void runVerify(manualCode)}
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Check certificate
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div
          className={`rounded-2xl border p-6 shadow-sm ${
            result.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
          }`}
        >
          {result.valid ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle2 className="h-6 w-6" />
                <p className="text-lg font-semibold">Valid investor certificate</p>
              </div>
              <dl className="grid gap-2 text-sm text-green-950 sm:grid-cols-2">
                <div>
                  <dt className="text-green-700/80">Investor</dt>
                  <dd className="font-semibold">{result.investorName}</dd>
                </div>
                <div>
                  <dt className="text-green-700/80">Email</dt>
                  <dd className="font-semibold">{result.email || '—'}</dd>
                </div>
                <div>
                  <dt className="text-green-700/80">Project</dt>
                  <dd className="font-semibold">{result.projectName}</dd>
                </div>
                <div>
                  <dt className="text-green-700/80">Amount</dt>
                  <dd className="font-semibold">{result.amountLabel}</dd>
                </div>
                <div>
                  <dt className="text-green-700/80">Confirmed</dt>
                  <dd className="font-semibold">{formatDate(result.confirmedAt)}</dd>
                </div>
                <div>
                  <dt className="text-green-700/80">Certificate No.</dt>
                  <dd className="font-mono font-semibold">{result.certificateCode}</dd>
                </div>
                {result.seasonLabel && (
                  <div>
                    <dt className="text-green-700/80">Season</dt>
                    <dd className="font-semibold">{result.seasonLabel}</dd>
                  </div>
                )}
              </dl>
            </div>
          ) : (
            <div className="flex items-start gap-3 text-red-800">
              <ShieldX className="mt-0.5 h-6 w-6 shrink-0" />
              <div>
                <p className="text-lg font-semibold">Not a confirmed Steaders8 investor</p>
                <p className="mt-1 text-sm text-red-700">{result.reason}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
