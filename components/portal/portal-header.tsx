import Image from 'next/image'
import Link from 'next/link'
import { LayoutDashboard, ShieldCheck } from 'lucide-react'
import type { Profile } from '@/lib/portal'
import { SignOutButton } from './sign-out-button'

export function PortalHeader({ profile, area = 'investor' }: { profile: Profile | null; area?: 'investor' | 'admin' }) {
  const isAdmin = profile?.role === 'admin'

  return (
    <header className="sticky top-0 z-40 border-b border-green-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/steaders8-logo.png" alt="Steaders8 Farm" width={36} height={36} />
          <span className="font-bold text-gray-900 tracking-tight">
            Steaders8 <span className="hidden sm:inline text-green-700">{area === 'admin' ? 'Admin' : 'Investor'}</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {profile?.status === 'approved' && (
            <Link
              href="/investor/dashboard"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                area === 'investor' ? 'bg-green-50 text-green-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                area === 'admin' ? 'bg-green-50 text-green-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
          <SignOutButton redirectTo={area === 'admin' ? '/admin/login' : '/investor/login'} />
        </nav>
      </div>
    </header>
  )
}
