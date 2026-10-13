import { formatDateTime, type SeasonUpdate } from '@/lib/portal'

export function UpdatesTimeline({ updates }: { updates: SeasonUpdate[] }) {
  if (updates.length === 0) {
    return <p className="text-sm text-gray-500">No updates yet. We will post here as soon as the season moves forward.</p>
  }

  return (
    <ol className="relative space-y-4 border-l-2 border-green-100 pl-5">
      {updates.map((update, i) => (
        <li key={update.id} className="relative">
          <span
            className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white ${
              i === 0 ? 'bg-green-600 ring-4 ring-green-100' : 'bg-green-300'
            }`}
          />
          <p className="text-sm font-semibold text-gray-900">{update.title}</p>
          {update.message && <p className="mt-0.5 text-sm text-gray-600">{update.message}</p>}
          <p className="mt-1 text-xs text-gray-400">{formatDateTime(update.created_at)}</p>
        </li>
      ))}
    </ol>
  )
}
