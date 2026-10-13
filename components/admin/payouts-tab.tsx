'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Clock3, Loader2, SplitSquareHorizontal, Wallet } from 'lucide-react'
import { formatDate, formatNaira } from '@/lib/portal'
import { recordPayout, splitSeasonPayout } from '@/app/admin/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { AdminInvestment, AdminPayout, AdminProject } from './types'
import { useAdminAction } from './use-admin-action'

const selectClass = 'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm'

function toNumber(value: string) {
  return Number(value.replace(/,/g, '')) || 0
}

export function PayoutsTab({
  projects,
  investments,
  payouts,
}: {
  projects: AdminProject[]
  investments: AdminInvestment[]
  payouts: AdminPayout[]
}) {
  const confirmed = investments.filter((i) => i.status === 'confirmed')

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <SplitForm projects={projects.filter((p) => p.season && p.investorCount > 0)} investments={confirmed} />
        <SingleForm investments={confirmed} />
      </div>

      <section className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900">Payout history</h3>
        {payouts.length === 0 ? (
          <p className="text-sm text-gray-500">No payouts recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b text-left text-xs uppercase text-gray-500">
                <tr>
                  <th className="py-2 pr-4 font-semibold">Investor</th>
                  <th className="py-2 pr-4 font-semibold">Project</th>
                  <th className="py-2 pr-4 font-semibold">Amount</th>
                  <th className="py-2 pr-4 font-semibold">Sent</th>
                  <th className="py-2 font-semibold">Investor confirmation</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-gray-900">{p.investment.investor.full_name}</td>
                    <td className="py-2.5 pr-4 text-gray-600">{p.investment.project.name}</td>
                    <td className="py-2.5 pr-4 font-semibold">{formatNaira(p.amount)}</td>
                    <td className="py-2.5 pr-4 text-gray-600">{formatDate(p.sent_at)}</td>
                    <td className="py-2.5">
                      {p.confirmed_by_investor_at ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Received {formatDate(p.confirmed_by_investor_at)}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                          <Clock3 className="h-3.5 w-3.5" /> Awaiting
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

function SplitForm({ projects, investments }: { projects: AdminProject[]; investments: AdminInvestment[] }) {
  const { pending, run } = useAdminAction()
  const [projectId, setProjectId] = useState(projects[0]?.id ?? '')
  const [total, setTotal] = useState('')
  const [note, setNote] = useState('')

  const project = projects.find((p) => p.id === projectId)
  const seasonInvestments = investments.filter((i) => project?.season && i.season_id === project.season.id)
  const totalNumber = Math.round(toNumber(total))

  const preview = useMemo(() => {
    const invested = seasonInvestments.reduce((s, i) => s + Number(i.amount), 0)
    let allocated = 0
    return seasonInvestments.map((inv, index) => {
      const share =
        index === seasonInvestments.length - 1
          ? totalNumber - allocated
          : Math.floor((Number(inv.amount) / invested) * totalNumber)
      allocated += share
      return { inv, share, percent: invested ? (Number(inv.amount) / invested) * 100 : 0 }
    })
  }, [seasonInvestments, totalNumber])

  return (
    <form
      className="space-y-3 rounded-3xl border border-green-100 bg-white p-5 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault()
        if (!project?.season) return
        if (!confirm(`Send ${formatNaira(totalNumber)} split across ${seasonInvestments.length} investments?`)) return
        run(() => splitSeasonPayout(project.season!.id, totalNumber, note), 'Payouts recorded', () => {
          setTotal('')
          setNote('')
        })
      }}
    >
      <h3 className="flex items-center gap-2 font-semibold text-gray-900">
        <SplitSquareHorizontal className="h-4 w-4 text-green-700" />
        Split a season payout by share
      </h3>
      {projects.length === 0 ? (
        <p className="text-sm text-gray-500">No season has confirmed investors yet.</p>
      ) : (
        <>
          <div className="space-y-1">
            <Label htmlFor="split-project">Project</Label>
            <select id="split-project" value={projectId} onChange={(e) => setProjectId(e.target.value)} className={selectClass}>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - {p.season?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="split-total">Total to pay investors (₦)</Label>
              <Input id="split-total" inputMode="numeric" value={total} onChange={(e) => setTotal(e.target.value.replace(/[^0-9,]/g, ''))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="split-note">Note</Label>
              <Input id="split-note" placeholder="e.g. Harvest 1 sales" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </div>
          {totalNumber > 0 && (
            <div className="max-h-56 overflow-y-auto rounded-xl bg-gray-50 p-3">
              <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Preview</p>
              <ul className="space-y-1 text-sm">
                {preview.map(({ inv, share, percent }) => (
                  <li key={inv.id} className="flex justify-between gap-2">
                    <span className="text-gray-700">
                      {inv.investor.full_name} <span className="text-gray-400">({percent.toFixed(1)}%)</span>
                    </span>
                    <span className="font-semibold">{formatNaira(share)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            disabled={pending || totalNumber <= 0}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Record payouts for all investors
          </button>
        </>
      )}
    </form>
  )
}

function SingleForm({ investments }: { investments: AdminInvestment[] }) {
  const { pending, run } = useAdminAction()
  const [investmentId, setInvestmentId] = useState(investments[0]?.id ?? '')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  return (
    <form
      className="space-y-3 rounded-3xl border border-green-100 bg-white p-5 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault()
        run(() => recordPayout(investmentId, toNumber(amount), note), 'Payout recorded', () => {
          setAmount('')
          setNote('')
        })
      }}
    >
      <h3 className="flex items-center gap-2 font-semibold text-gray-900">
        <Wallet className="h-4 w-4 text-green-700" />
        Pay one investor
      </h3>
      {investments.length === 0 ? (
        <p className="text-sm text-gray-500">No confirmed investments yet.</p>
      ) : (
        <>
          <div className="space-y-1">
            <Label htmlFor="single-investment">Investment</Label>
            <select id="single-investment" value={investmentId} onChange={(e) => setInvestmentId(e.target.value)} className={selectClass}>
              {investments.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.investor.full_name} - {i.project.name} ({formatNaira(i.amount)})
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="single-amount">Amount sent (₦)</Label>
              <Input id="single-amount" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9,]/g, ''))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="single-note">Note</Label>
              <Input id="single-note" placeholder="e.g. Harvest 1 sales" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </div>
          <button
            type="submit"
            disabled={pending || toNumber(amount) <= 0}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Record payout
          </button>
        </>
      )}
    </form>
  )
}
