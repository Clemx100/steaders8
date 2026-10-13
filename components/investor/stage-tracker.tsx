import { Check } from 'lucide-react'
import { STAGE_META, type SeasonStage } from '@/lib/portal'

export function StageTracker({ stages, current }: { stages: SeasonStage[]; current: SeasonStage }) {
  const currentIndex = Math.max(0, stages.indexOf(current))

  return (
    <ol className="flex items-start overflow-x-auto pb-1">
      {stages.map((stage, i) => {
        const done = i < currentIndex
        const active = i === currentIndex
        return (
          <li key={stage} className="flex min-w-[64px] flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <div className={`h-0.5 flex-1 ${i === 0 ? 'opacity-0' : done || active ? 'bg-green-500' : 'bg-gray-200'}`} />
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors ${
                  done
                    ? 'border-green-500 bg-green-500 text-white'
                    : active
                      ? 'border-green-600 bg-white text-green-700 ring-4 ring-green-100'
                      : 'border-gray-200 bg-white text-gray-400'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <div className={`h-0.5 flex-1 ${i === stages.length - 1 ? 'opacity-0' : done ? 'bg-green-500' : 'bg-gray-200'}`} />
            </div>
            <span className={`mt-1.5 px-1 text-[11px] leading-tight ${active ? 'font-semibold text-green-800' : 'text-gray-500'}`}>
              {STAGE_META[stage].label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
