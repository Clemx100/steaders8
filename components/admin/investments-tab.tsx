'use client'

import { useState } from 'react'
import { Check, ExternalLink, FileText, Loader2, X } from 'lucide-react'
import { formatDateTime, formatNaira } from '@/lib/portal'
import { confirmInvestment, rejectInvestment } from '@/app/admin/actions'
import type { AdminInvestment } from './types'
import { useAdminAction } from './use-admin-action'

const FILTERS = ['pending', 'confirmed', 'rejected'] as const
type Filter = (typeof FILTERS)[number]

export function InvestmentsTab({ investments }: { investments: AdminInvestment[] }) {
  const [filter, setFilter] = useState<Filter>('pending')
  const list = investments.filter((i) => i.status === filter)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {f} ({investments.filter((i) => i.status === f).length})
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500">No {filter} investments.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((inv) => (
            <InvestmentRow key={inv.id} investment={inv} />
          ))}
        </div>
      )}
    </div>
  )
}

function InvestmentRow({ investment }: { investment: AdminInvestment }) {
  const { pending, run } = useAdminAction()
  const isPdf = investment.proof_path?.toLowerCase().endsWith('.pdf')

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
      {investment.proofUrl && (
        <a
          href={investment.proofUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-44 items-center justify-center bg-gray-50"
        >
          {isPdf ? (
            <span className="flex flex-col items-center gap-1 text-sm text-gray-600">
              <FileText className="h-8 w-8 text-green-700" /> Open PDF receipt
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={investment.proofUrl} alt="Proof of payment" className="h-full w-full object-contain" />
          )}
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
            <ExternalLink className="h-3 w-3" /> Full size
          </span>
        </a>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-gray-900">{investment.investor.full_name}</p>
            <p className="text-xs text-gray-500">
              {investment.investor.phone} · {investment.investor.email}
            </p>
          </div>
          <p className="text-lg font-bold text-gray-900">{formatNaira(investment.amount)}</p>
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{investment.project.name}</span> · submitted{' '}
          {formatDateTime(investment.created_at)}
        </p>
        {investment.admin_note && <p className="text-xs text-red-600">Note: {investment.admin_note}</p>}
        {investment.status === 'pending' && (
          <div className="mt-auto flex gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => run(() => confirmInvestment(investment.id), 'Payment confirmed')}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Confirm payment
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                const note = prompt('Reason for rejecting (the investor will see this):', 'Payment not received')
                if (note !== null) run(() => rejectInvestment(investment.id, note), 'Investment rejected')
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
            >
              <X className="h-4 w-4" /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
