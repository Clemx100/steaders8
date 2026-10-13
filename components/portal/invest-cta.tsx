'use client'

import Link from 'next/link'
import { Plus, UserPlus } from 'lucide-react'
import { useInvestorSession } from './use-investor-session'

export function InvestCta({ projectSlug, className = '' }: { projectSlug: string; className?: string }) {
  const session = useInvestorSession()
  const addHref = `/investor/dashboard?add=${encodeURIComponent(projectSlug)}`

  if (session === 'signed-in') {
    return (
      <div className={className}>
        <Link
          href={addHref}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-green-700 to-emerald-600 text-white font-semibold shadow-md shadow-green-600/20 hover:from-green-800 hover:to-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add investment
        </Link>
        <p className="text-xs text-gray-500 mt-2">You&apos;re signed in. Add this to your investor dashboard.</p>
      </div>
    )
  }

  return (
    <div className={`${className} ${session === 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
      <Link
        href="/investor/register"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-green-700 to-emerald-600 text-white font-semibold shadow-md shadow-green-600/20 hover:from-green-800 hover:to-emerald-700 transition-colors"
      >
        <UserPlus className="w-5 h-5" />
        Sign up to invest
      </Link>
      <p className="text-xs text-gray-500 mt-2">
        Already registered?{' '}
        <Link href={`/investor/login?next=${encodeURIComponent(addHref)}`} className="font-semibold text-green-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
