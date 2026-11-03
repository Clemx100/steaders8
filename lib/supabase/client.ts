import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      'Investor portal is not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    )
  }
  return createBrowserClient(
    url,
    key,
    // proxy.ts refreshes the session on every navigation. A second refresher in the
    // browser races it, reuses the same refresh token and corrupts the session cookies.
    { auth: { autoRefreshToken: false } },
  )
}
