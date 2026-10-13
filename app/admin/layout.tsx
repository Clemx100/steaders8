import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { isSupabaseConfigured } from '@/lib/supabase/server'
import { PortalNotConfigured } from '@/components/portal/portal-not-configured'

export const metadata: Metadata = {
  title: 'Admin | Steaders8 Farm',
  robots: { index: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) return <PortalNotConfigured />
  return (
    <div className="min-h-screen bg-[#f4f7f2]">
      {children}
      <Toaster richColors position="top-center" />
    </div>
  )
}
