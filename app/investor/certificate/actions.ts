'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

/** Check the signed-in investor's password without replacing their browser session. */
export async function confirmCertificatePassword(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user?.email) return { ok: false, error: 'Sign in again to continue.' }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return { ok: false, error: 'Investor portal is not configured.' }

  const checker = createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { error } = await checker.auth.signInWithPassword({ email: user.email, password })
  if (error) return { ok: false, error: 'Incorrect password.' }
  return { ok: true }
}
