import type { Metadata } from 'next'
import { isSupabaseConfigured } from '@/lib/supabase/server'
import { PortalNotConfigured } from '@/components/portal/portal-not-configured'

export const metadata: Metadata = {
  title: 'Investor Portal | Steaders8 Farm',
  robots: { index: false },
}

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) return <PortalNotConfigured />
  return <div className="min-h-screen bg-[#f4f7f2]">{children}</div>
}
