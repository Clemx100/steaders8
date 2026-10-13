'use client'

import { useState } from 'react'
import { Check, ChevronDown, Loader2, Phone, X } from 'lucide-react'
import { formatDate, formatNaira, type Profile } from '@/lib/portal'
import { setInvestorStatus } from '@/app/admin/actions'
import type { AdminInvestment } from './types'
import { useAdminAction } from './use-admin-action'

const FILTERS = ['pending', 'approved', 'rejected', 'all'] as const
type Filter = (typeof FILTERS)[number]

const STATUS_TONE: Record<Profile['status'], string> = {
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
}

export function InvestorsTab({ profiles, investments }: { profiles: Profile[]; investments: AdminInvestment[] }) {
  const [filter, setFilter] = useState<Filter>('pending')
  const investors = profiles.filter((p) => p.role === 'investor' && (filter === 'all' || p.status === filter))

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
            {f}
          </button>
        ))}
      </div>
      {investors.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500">No {filter === 'all' ? '' : filter} investors.</p>
      ) : (
        investors.map((p) => (
          <InvestorRow
            key={p.id}
            profile={p}
            totalConfirmed={investments
              .filter((i) => i.investor_id === p.id && i.status === 'confirmed')
              .reduce((s, i) => s + Number(i.amount), 0)}
          />
        ))
      )}
    </div>
  )
}

function InvestorRow({ profile, totalConfirmed }: { profile: Profile; totalConfirmed: number }) {
  const [open, setOpen] = useState(profile.status === 'pending')
  const { pending, run } = useAdminAction()

  const details: [string, string][] = [
    ['Email', profile.email],
    ['Phone', profile.phone],
    ['Occupation', profile.occupation],
    ['State', profile.state],
    ['Address', profile.address],
    ['Bank', profile.bank_name],
    ['Account number', profile.account_number],
    ['Account name', profile.account_name],
    ['Next of kin', `${profile.next_of_kin_name} (${profile.next_of_kin_phone})`],
    ['Registered', formatDate(profile.created_at)],
  ]

  return (
    <div className="rounded-2xl border border-green-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-3 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
            {profile.full_name.charAt(0).toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{profile.full_name || profile.email}</p>
            <p className="text-xs text-gray-500">
              {profile.phone} · Invested {formatNaira(totalConfirmed)}
            </p>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_TONE[profile.status]}`}>
            {profile.status}
          </span>
          {pending && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
          {profile.status !== 'approved' && (
            <button
              type="button"
              disabled={pending}
              onClick={() => run(() => setInvestorStatus(profile.id, 'approved'), `${profile.full_name} approved`)}
              className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              <Check className="h-3.5 w-3.5" /> Approve
            </button>
          )}
          {profile.status !== 'rejected' && (
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                if (confirm(`Reject ${profile.full_name}? They will lose dashboard access.`)) {
                  run(() => setInvestorStatus(profile.id, 'rejected'), `${profile.full_name} rejected`)
                }
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
            >
              <X className="h-3.5 w-3.5" /> Reject
            </button>
          )}
          <a
            href={`tel:${profile.phone}`}
            className="inline-flex items-center rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50"
            aria-label={`Call ${profile.full_name}`}
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      {open && (
        <dl className="grid gap-x-6 gap-y-2 border-t border-green-50 p-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-gray-500">{label}</dt>
              <dd className="font-medium text-gray-900 break-words">{value || '-'}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
