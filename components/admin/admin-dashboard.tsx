'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Banknote, Receipt, Sprout, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatNaira } from '@/lib/portal'
import type { AdminData } from './types'
import { InvestorsTab } from './investors-tab'
import { InvestmentsTab } from './investments-tab'
import { SeasonsTab } from './seasons-tab'
import { PayoutsTab } from './payouts-tab'

const REFRESH_MS = 60_000

export function AdminDashboard({ data }: { data: AdminData }) {
  const router = useRouter()

  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') router.refresh()
    }, REFRESH_MS)
    return () => clearInterval(id)
  }, [router])

  const pendingInvestors = data.profiles.filter((p) => p.status === 'pending' && p.role === 'investor').length
  const pendingInvestments = data.investments.filter((i) => i.status === 'pending').length
  const confirmedTotal = data.investments.filter((i) => i.status === 'confirmed').reduce((s, i) => s + Number(i.amount), 0)
  const paidTotal = data.payouts.reduce((s, p) => s + Number(p.amount), 0)

  const stats = [
    { label: 'Approved investors', value: data.profiles.filter((p) => p.status === 'approved' && p.role === 'investor').length, icon: Users },
    { label: 'Confirmed investments', value: formatNaira(confirmedTotal), icon: Sprout },
    { label: 'Awaiting confirmation', value: pendingInvestments, icon: Receipt },
    { label: 'Paid out to investors', value: formatNaira(paidTotal), icon: Banknote },
  ]

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">Super admin</h1>
        <p className="text-gray-600">Approve investors, confirm payments, update each season and record payouts.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <Icon className="h-4 w-4 text-green-600" />
              {label}
            </div>
            <p className="mt-2 text-xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue={pendingInvestors > 0 ? 'investors' : pendingInvestments > 0 ? 'investments' : 'seasons'}>
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-white p-1 shadow-sm">
          <TabsTrigger value="investors" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Investors {pendingInvestors > 0 && <Badge count={pendingInvestors} />}
          </TabsTrigger>
          <TabsTrigger value="investments" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Investments {pendingInvestments > 0 && <Badge count={pendingInvestments} />}
          </TabsTrigger>
          <TabsTrigger value="seasons" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Seasons &amp; updates
          </TabsTrigger>
          <TabsTrigger value="payouts" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Payouts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="investors" className="mt-4">
          <InvestorsTab profiles={data.profiles} investments={data.investments} />
        </TabsContent>
        <TabsContent value="investments" className="mt-4">
          <InvestmentsTab investments={data.investments} />
        </TabsContent>
        <TabsContent value="seasons" className="mt-4">
          <SeasonsTab projects={data.projects} />
        </TabsContent>
        <TabsContent value="payouts" className="mt-4">
          <PayoutsTab projects={data.projects} investments={data.investments} payouts={data.payouts} />
        </TabsContent>
      </Tabs>
    </main>
  )
}

function Badge({ count }: { count: number }) {
  return (
    <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[11px] font-bold text-white">
      {count}
    </span>
  )
}
