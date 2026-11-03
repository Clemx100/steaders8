import Image from 'next/image'
import { Clock3, XCircle } from 'lucide-react'
import {
  STAGE_META,
  formatDate,
  formatNaira,
  type InvestmentWithRelations,
  type Payout,
  type SeasonUpdate,
} from '@/lib/portal'
import { GrowthStageAnimation } from './growth-stage-animation'
import { Countdown } from './countdown'
import { StageTracker } from './stage-tracker'
import { UpdatesTimeline } from './updates-timeline'
import { PayoutList } from './payout-list'
import { CertificateActions } from './certificate-actions'

type Props = {
  investment: InvestmentWithRelations
  updates: SeasonUpdate[]
  payouts: Payout[]
}

export function InvestmentCard({ investment, updates, payouts }: Props) {
  const { project, season } = investment

  if (investment.status !== 'confirmed') {
    const rejected = investment.status === 'rejected'
    return (
      <article className="flex flex-col sm:flex-row gap-4 rounded-3xl border border-dashed border-gray-300 bg-white/70 p-5">
        <div className="relative h-24 w-full sm:w-32 shrink-0 overflow-hidden rounded-2xl">
          <Image src={project.image || '/steaders8-logo.png'} alt={project.name} fill className="object-cover" sizes="128px" quality={75} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                rejected ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {rejected ? <XCircle className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
              {rejected ? 'Not confirmed' : 'Awaiting confirmation'}
            </span>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formatNaira(investment.amount)}</p>
          <p className="mt-1 text-sm text-gray-500">
            {rejected
              ? investment.admin_note || 'We could not confirm this payment. Please contact Steaders8 Farm.'
              : `Submitted ${formatDate(investment.created_at)}. We will confirm your payment shortly.`}
          </p>
        </div>
      </article>
    )
  }

  const stage = season?.stage ?? 'awaiting_start'
  const meta = STAGE_META[stage]
  const received = payouts.filter((p) => p.confirmed_by_investor_at).reduce((sum, p) => sum + Number(p.amount), 0)
  const roi = investment.amount > 0 ? (received / investment.amount) * 100 : 0
  const latestUpdate = updates[0]

  return (
    <article className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative bg-[#e3f4ea]">
          <GrowthStageAnimation stage={stage} category={project.category} className="h-full w-full min-h-[220px]" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-800 shadow-sm backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {meta.label}
          </span>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-green-700">
                {project.category === 'livestock' ? 'Livestock' : 'Crop'} · {season?.label ?? 'Current season'}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold text-gray-900">{project.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">You invested</p>
              <p className="text-xl font-bold text-gray-900">{formatNaira(investment.amount)}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-green-50/70 p-4">
            <p className="text-sm font-semibold text-green-900">{latestUpdate?.title ?? meta.label}</p>
            <p className="mt-1 text-sm text-green-900/80">{latestUpdate?.message || meta.description}</p>
          </div>

          {season?.stage_ends_at && (
            <Countdown
              startsAt={season.stage_started_at}
              endsAt={season.stage_ends_at}
              label={stage === 'nursery' ? 'Ready for transplanting in' : stage === 'transplanted' ? 'Harvest expected in' : `${meta.label}: time remaining`}
            />
          )}

          <StageTracker stages={project.stages} current={stage} />

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-gray-600">Returned so far</span>
              <span className="font-semibold text-gray-900">
                {formatNaira(received)} <span className="text-gray-400">({roi.toFixed(1)}%)</span>
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-lime-400 transition-[width] duration-700"
                style={{ width: `${Math.min(100, roi)}%` }}
              />
            </div>
          </div>

          <CertificateActions investmentId={investment.id} />
        </div>
      </div>

      <div className="grid gap-6 border-t border-green-50 p-5 sm:p-6 md:grid-cols-2">
        <section>
          <h4 className="mb-3 text-sm font-semibold text-gray-900">Farm updates</h4>
          <UpdatesTimeline updates={updates.slice(0, 5)} />
        </section>
        <section>
          <h4 className="mb-3 text-sm font-semibold text-gray-900">Your payments</h4>
          <PayoutList payouts={payouts} />
        </section>
      </div>
    </article>
  )
}
