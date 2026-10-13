import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { AdminLoginForm } from './admin-login-form'

export const metadata = { title: 'Admin sign in | Steaders8 Farm' }

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <Image src="/steaders8-logo.png" alt="Steaders8 Farm" width={64} height={64} className="rounded-2xl bg-white p-1.5" />
            <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950 ring-4 ring-slate-950">
              <ShieldCheck className="h-4 w-4" />
            </span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">Restricted area</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Steaders8 Admin</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to manage investors, seasons and payouts.</p>
        </div>

        <Suspense>
          <AdminLoginForm />
        </Suspense>

        <p className="mt-8 text-center text-xs text-slate-500">
          Investor?{' '}
          <Link href="/investor/login" className="font-medium text-slate-300 hover:text-white">
            Go to the investor login
          </Link>
        </p>
      </div>
    </div>
  )
}
