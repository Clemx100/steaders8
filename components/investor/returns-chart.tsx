'use client'

import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LineChart } from 'lucide-react'
import { formatNaira } from '@/lib/portal'

export type ReturnsPoint = { date: string; label: string; cumulative: number }

function compact(value: number) {
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}m`
  if (value >= 1_000) return `₦${Math.round(value / 1_000)}k`
  return `₦${value}`
}

export function ReturnsChart({ points, totalInvested }: { points: ReturnsPoint[]; totalInvested: number }) {
  return (
    <div className="rounded-2xl border border-green-100/70 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Returns over time</h2>
          <p className="text-xs text-gray-500">Payments you have confirmed, added up over time</p>
        </div>
        <LineChart className="h-5 w-5 text-green-600" />
      </div>
      {points.length === 0 ? (
        <div className="flex h-56 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-green-50/70 to-white text-center">
          <p className="text-sm font-medium text-gray-700">Your returns chart will grow here</p>
          <p className="mt-1 max-w-xs text-xs text-gray-500">
            Once produce is sold and you confirm a payment, it will show up on this chart.
          </p>
        </div>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[{ date: '', label: 'Start', cumulative: 0 }, ...points]} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="s8-returns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2ee" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={compact} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={56} />
              <Tooltip
                formatter={(value: number) => [formatNaira(value), 'Total returns']}
                contentStyle={{ borderRadius: 12, borderColor: '#d1fae5', fontSize: 12 }}
              />
              {totalInvested > 0 && (
                <ReferenceLine
                  y={totalInvested}
                  stroke="#f59e0b"
                  strokeDasharray="5 5"
                  ifOverflow="extendDomain"
                  label={{ value: 'Invested', position: 'insideTopRight', fontSize: 11, fill: '#b45309' }}
                />
              )}
              <Area type="monotone" dataKey="cumulative" stroke="#16a34a" strokeWidth={2.5} fill="url(#s8-returns)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
