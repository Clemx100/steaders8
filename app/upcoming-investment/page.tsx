import { Suspense } from 'react'
import UpcomingInvestmentContent from './UpcomingInvestmentContent'

export const dynamic = 'force-dynamic'

function UpcomingInvestmentFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading...</div>
    </div>
  )
}

export default function UpcomingInvestmentPage() {
  return (
    <Suspense fallback={<UpcomingInvestmentFallback />}>
      <UpcomingInvestmentContent />
    </Suspense>
  )
}
