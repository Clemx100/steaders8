import { Sprout } from 'lucide-react'
import { requireApprovedInvestor } from '@/lib/portal-auth'
import { FARM_TIME_ZONE, type InvestmentWithRelations, type Payout, type Project, type SeasonUpdate } from '@/lib/portal'
import { PortalHeader } from '@/components/portal/portal-header'
import { SummaryCards } from '@/components/investor/summary-cards'
import { ReturnsChart, type ReturnsPoint } from '@/components/investor/returns-chart'
import { InvestmentCard } from '@/components/investor/investment-card'
import { AddInvestmentDialog } from '@/components/investor/add-investment-dialog'

export const dynamic = 'force-dynamic'

function greeting() {
  const hour = Number(new Date().toLocaleString('en-GB', { hour: 'numeric', hour12: false, timeZone: FARM_TIME_ZONE }))
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ add?: string }> }) {
  const { supabase, user, profile } = await requireApprovedInvestor()
  const { add: addProjectSlug } = await searchParams

  const [{ data: investmentRows }, { data: projectRows }] = await Promise.all([
    supabase
      .from('investments')
      .select('*, project:projects(*), season:seasons(*)')
      .eq('investor_id', user.id)
      .order('created_at', { ascending: false }),
    supabase.from('projects').select('*').eq('is_open', true).order('sort_order'),
  ])

  const investments = (investmentRows ?? []) as InvestmentWithRelations[]
  const openProjects = (projectRows ?? []) as Project[]
  const investmentIds = investments.map((i) => i.id)
  const seasonIds = [...new Set(investments.map((i) => i.season_id).filter(Boolean))] as string[]

  const [{ data: payoutRows }, { data: updateRows }] = await Promise.all([
    investmentIds.length
      ? supabase.from('payouts').select('*').in('investment_id', investmentIds).order('sent_at', { ascending: false })
      : Promise.resolve({ data: [] }),
    seasonIds.length
      ? supabase.from('season_updates').select('*').in('season_id', seasonIds).order('created_at', { ascending: false })
      : Promise.resolve({ data: [] }),
  ])

  const payouts = (payoutRows ?? []) as Payout[]
  const updates = (updateRows ?? []) as SeasonUpdate[]

  const confirmed = investments.filter((i) => i.status === 'confirmed')
  const totalInvested = confirmed.reduce((s, i) => s + Number(i.amount), 0)
  const pendingInvested = investments.filter((i) => i.status === 'pending').reduce((s, i) => s + Number(i.amount), 0)
  const returnsReceived = payouts.filter((p) => p.confirmed_by_investor_at).reduce((s, p) => s + Number(p.amount), 0)
  const returnsAwaiting = payouts.filter((p) => !p.confirmed_by_investor_at).reduce((s, p) => s + Number(p.amount), 0)

  const withRoi = confirmed.filter((i) => i.project.expected_roi_percent !== null)
  const expectedReturns = withRoi.length
    ? withRoi.reduce((s, i) => s + Number(i.amount) * (Number(i.project.expected_roi_percent) / 100), 0)
    : null

  let running = 0
  const points: ReturnsPoint[] = payouts
    .filter((p) => p.confirmed_by_investor_at)
    .sort((a, b) => a.confirmed_by_investor_at!.localeCompare(b.confirmed_by_investor_at!))
    .map((p) => {
      running += Number(p.amount)
      return {
        date: p.confirmed_by_investor_at!,
        label: new Date(p.confirmed_by_investor_at!).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: FARM_TIME_ZONE }),
        cumulative: running,
      }
    })

  const firstName = profile.full_name.split(' ')[0] || 'Investor'
  const activeCount = confirmed.filter((i) => i.season && i.season.stage !== 'completed').length

  return (
    <>
      <PortalHeader profile={profile} />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-600 p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-lime-300/20 blur-2xl" />
          <div className="absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-emerald-300/20 blur-2xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm text-green-100">{greeting()},</p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold">{firstName}</h1>
              <p className="mt-2 max-w-lg text-green-50/90">
                {activeCount > 0
                  ? `You have ${activeCount} active ${activeCount === 1 ? 'investment' : 'investments'} growing at Steaders8 Farm.`
                  : 'Welcome to your Steaders8 investor dashboard.'}
              </p>
            </div>
            <AddInvestmentDialog projects={openProjects} userId={user.id} initialProjectSlug={addProjectSlug} />
          </div>
        </section>

        <SummaryCards
          totalInvested={totalInvested}
          pendingInvested={pendingInvested}
          returnsReceived={returnsReceived}
          returnsAwaiting={returnsAwaiting}
          expectedReturns={expectedReturns}
        />

        <ReturnsChart points={points} totalInvested={totalInvested} />

        <section className="space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Your investments</h2>
          {investments.length === 0 ? (
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-green-200 bg-white p-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Sprout className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-900">No investments yet</h3>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Click &quot;Add investment&quot; and upload your proof of payment. Once confirmed, you can follow your crops
                from planting to payment right here.
              </p>
            </div>
          ) : (
            investments.map((investment) => (
              <InvestmentCard
                key={investment.id}
                investment={investment}
                updates={updates.filter((u) => u.season_id === investment.season_id)}
                payouts={payouts.filter((p) => p.investment_id === investment.id)}
              />
            ))
          )}
        </section>
      </main>
    </>
  )
}
