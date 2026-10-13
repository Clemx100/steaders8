'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function SignOutButton({ redirectTo = '/investor/login' }: { redirectTo?: string }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={async () => {
        await createClient().auth.signOut()
        router.replace(redirectTo)
        router.refresh()
      }}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Sign out</span>
    </button>
  )
}
