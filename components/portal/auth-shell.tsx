import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Sprout, TrendingUp } from 'lucide-react'

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 p-12 text-white">
        <Image
          src="/upcoming/bell-pepper-greenhouse.png"
          alt=""
          fill
          className="object-cover opacity-20 mix-blend-luminosity"
          sizes="50vw"
          quality={75}
          priority
        />
        <Link href="/" className="relative flex items-center gap-3">
          <Image src="/steaders8-logo.png" alt="Steaders8 Farm" width={56} height={56} className="rounded-xl bg-white/90 p-1" />
          <span className="text-xl font-bold tracking-tight">Steaders8 Farm</span>
        </Link>
        <div className="relative space-y-8">
          <h2 className="font-serif text-4xl font-bold leading-tight">
            Watch your investment
            <br />
            grow, season by season.
          </h2>
          <ul className="space-y-4 text-green-50/90">
            <li className="flex items-center gap-3">
              <Sprout className="w-5 h-5 text-green-300" />
              Live crop stages, from nursery to market
            </li>
            <li className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-green-300" />
              Clear view of your returns as they come in
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-300" />
              Only verified Steaders8 investors have access
            </li>
          </ul>
        </div>
        <p className="relative text-xs text-green-100/70">Lokoji, Ofada, Ogun State</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-10 sm:px-8 bg-[#f4f7f2]">
        <div className="w-full max-w-xl">
          <Link href="/" className="lg:hidden mb-8 flex items-center gap-2">
            <Image src="/steaders8-logo.png" alt="Steaders8 Farm" width={44} height={44} />
            <span className="text-lg font-bold text-gray-900">Steaders8 Farm</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 mb-8 text-gray-600">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  )
}
