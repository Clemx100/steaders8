import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    // proxy.ts refreshes the session on every navigation. A second refresher in the
    // browser races it, reuses the same refresh token and corrupts the session cookies.
    { auth: { autoRefreshToken: false } },
  )
}
