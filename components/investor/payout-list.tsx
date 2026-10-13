'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CheckCircle2, Loader2, Wallet } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatDate, formatNaira, type Payout } from '@/lib/portal'

export function PayoutList({ payouts }: { payouts: Payout[] }) {
  const router = useRouter()
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  if (payouts.length === 0) {
    return <p className="text-sm text-gray-500">No payments yet. Payments will appear here once produce is sold.</p>
  }

  async function confirm(id: string) {
    setBusyId(id)
    setError('')
    const { error } = await createClient().rpc('confirm_payout', { payout_id: id })
    setBusyId(null)
    if (error) {
      setError('Could not confirm this payment. Please try again.')
      return
    }
    router.refresh()
  }

  return (
    <div className="space-y-2">
      {payouts.map((payout) => {
        const confirmed = Boolean(payout.confirmed_by_investor_at)
        return (
          <div
            key={payout.id}
            className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3 ${
              confirmed ? 'border-green-100 bg-green-50/60' : 'border-amber-200 bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  confirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                <Wallet className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{formatNaira(payout.amount)}</p>
                <p className="text-xs text-gray-500">
                  Sent {formatDate(payout.sent_at)}
                  {payout.note ? ` · ${payout.note}` : ''}
                </p>
              </div>
            </div>
            {confirmed ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Received
              </span>
            ) : (
              <button
                type="button"
                onClick={() => confirm(payout.id)}
                disabled={busyId === payout.id}
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-60"
              >
                {busyId === payout.id && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Confirm received
              </button>
            )}
          </div>
        )
      })}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
