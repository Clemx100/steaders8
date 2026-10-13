import { Banknote, Hourglass, PiggyBank, TrendingUp } from 'lucide-react'
import { formatNaira } from '@/lib/portal'

type Props = {
  totalInvested: number
  pendingInvested: number
  returnsReceived: number
  returnsAwaiting: number
  expectedReturns: number | null
}

export function SummaryCards({ totalInvested, pendingInvested, returnsReceived, returnsAwaiting, expectedReturns }: Props) {
  const roi = totalInvested > 0 ? (returnsReceived / totalInvested) * 100 : 0

  const cards = [
    {
      label: 'Total invested',
      value: formatNaira(totalInvested),
      hint: pendingInvested > 0 ? `${formatNaira(pendingInvested)} awaiting confirmation` : 'Confirmed investments',
      icon: PiggyBank,
      tone: 'from-green-600 to-emerald-500 text-white',
      iconTone: 'bg-white/20 text-white',
      hintTone: 'text-green-50/90',
    },
    {
      label: 'Returns received',
      value: formatNaira(returnsReceived),
      hint: returnsAwaiting > 0 ? `${formatNaira(returnsAwaiting)} sent, awaiting your confirmation` : 'Confirmed by you',
      icon: Banknote,
      tone: 'bg-white text-gray-900',
      iconTone: 'bg-green-50 text-green-700',
      hintTone: 'text-gray-500',
    },
    {
      label: 'Return on investment',
      value: `${roi.toFixed(1)}%`,
      hint: 'Returns received vs invested',
      icon: TrendingUp,
      tone: 'bg-white text-gray-900',
      iconTone: 'bg-lime-50 text-lime-700',
      hintTone: 'text-gray-500',
    },
    {
      label: 'Expected returns',
      value: expectedReturns === null ? 'To be announced' : formatNaira(expectedReturns),
      hint: expectedReturns === null ? 'Shared once the season is valued' : 'Projected, not guaranteed',
      icon: Hourglass,
      tone: 'bg-white text-gray-900',
      iconTone: 'bg-amber-50 text-amber-700',
      hintTone: 'text-gray-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ label, value, hint, icon: Icon, tone, iconTone, hintTone }) => (
        <div
          key={label}
          className={`rounded-2xl border border-green-100/70 p-5 shadow-sm ${tone.startsWith('from') ? `bg-gradient-to-br ${tone}` : tone}`}
        >
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${tone.startsWith('from') ? 'text-green-50' : 'text-gray-500'}`}>{label}</p>
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconTone}`}>
              <Icon className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
          <p className={`mt-1 text-xs ${hintTone}`}>{hint}</p>
        </div>
      ))}
    </div>
  )
}
