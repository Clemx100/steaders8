'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Loader2, Lock, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { PasswordInput } from '@/components/ui/password-input'

const DENIED_MESSAGE = 'This account does not have admin access.'

export function AdminLoginForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(searchParams.get('error') === 'denied' ? DENIED_MESSAGE : '')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      setError(error?.message === 'Invalid login credentials' ? 'Incorrect email or password.' : error?.message ?? 'Sign in failed.')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
    if (profile?.role !== 'admin') {
      await supabase.auth.signOut()
      setError(DENIED_MESSAGE)
      setLoading(false)
      return
    }

    window.location.assign('/admin')
  }

  const inputClass =
    'h-auto w-full rounded-xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus-visible:ring-emerald-500/30'

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur sm:p-8">
      <div className="space-y-1.5">
        <label htmlFor="admin-email" className="text-sm font-medium text-slate-300">
          Admin email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            id="admin-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="admin-password" className="text-sm font-medium text-slate-300">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <PasswordInput
            id="admin-password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            toggleClassName="text-slate-500 hover:text-slate-200"
          />
        </div>
      </div>
      {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign in to admin
      </button>
    </form>
  )
}
