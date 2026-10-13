'use client'

import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react'

function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

export function Countdown({ startsAt, endsAt, label }: { startsAt: string; endsAt: string; label: string }) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const start = new Date(startsAt).getTime()
  const end = new Date(endsAt).getTime()
  const current = now ?? start
  const remaining = end - current
  const progress = end > start ? Math.min(100, Math.max(0, ((current - start) / (end - start)) * 100)) : 100
  const { days, hours, minutes, seconds } = splitDuration(remaining)
  const done = now !== null && remaining <= 0

  return (
    <div className="rounded-2xl bg-gradient-to-br from-green-900 to-emerald-700 p-4 text-white">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-green-100">
        <Timer className="w-4 h-4" />
        {label}
      </div>
      {done ? (
        <p className="mt-3 text-lg font-semibold">Due now. Your next update is coming soon.</p>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          {[
            ['Days', days],
            ['Hrs', hours],
            ['Min', minutes],
            ['Sec', seconds],
          ].map(([unit, value]) => (
            <div key={unit} className="rounded-xl bg-white/10 py-2">
              <div className="text-2xl font-bold tabular-nums">{now === null ? '--' : String(value).padStart(2, '0')}</div>
              <div className="text-[10px] uppercase tracking-wider text-green-100">{unit}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
        <div className="h-full rounded-full bg-lime-300 transition-[width] duration-1000" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
