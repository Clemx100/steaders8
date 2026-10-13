'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Sprout } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export const GREENHOUSE_ALERT_HREF = '/upcoming-investment?tab=ongoing#greenhouse-expansion'
const DISMISS_KEY = 'steaders8-greenhouse-alert-dismissed'

const TICKER_MESSAGES = [
  'NEW: Greenhouse Expansion investment window is now open',
  'Bell Pepper & Super Habanero production — ₦3,000,000 per investor',
  'Limited to 8 investors — 5-year profit-sharing model',
  'Phase One: 4 commercial greenhouses at Steaders8 Farm, Ogun State',
]

function TickerContent() {
  const items = [...TICKER_MESSAGES, ...TICKER_MESSAGES]

  return (
    <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
      {items.map((message, index) => (
        <span key={`${message}-${index}`} className="inline-flex items-center gap-2 text-sm font-medium">
          <Sprout className="h-4 w-4 shrink-0" aria-hidden />
          {message}
          <span className="text-green-200" aria-hidden>
            •
          </span>
        </span>
      ))}
    </div>
  )
}

export function InvestmentAlertTicker() {
  const pathname = usePathname()
  const router = useRouter()
  if (pathname !== '/') return null

  return (
    <div
      className="border-b border-green-800 bg-green-700 text-white cursor-pointer hover:bg-green-800 transition-colors"
      role="marquee"
      aria-label="Greenhouse investment alert"
      onClick={() => router.push(GREENHOUSE_ALERT_HREF)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          router.push(GREENHOUSE_ALERT_HREF)
        }
      }}
      tabIndex={0}
    >
      <div className="relative overflow-hidden py-2">
        <TickerContent />
      </div>
      <Link
        href={GREENHOUSE_ALERT_HREF}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-10 focus:rounded focus:bg-white focus:px-3 focus:py-1 focus:text-green-800"
      >
        View greenhouse investment details
      </Link>
    </div>
  )
}

export function InvestmentAlertPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (pathname !== '/') return
    if (sessionStorage.getItem(DISMISS_KEY) === 'true') return

    const timer = window.setTimeout(() => setOpen(true), 800)
    return () => window.clearTimeout(timer)
  }, [pathname])

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true')
    setOpen(false)
  }

  if (pathname !== '/') return null

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) dismiss()
        else setOpen(true)
      }}
    >
      <DialogContent className="max-w-md border-green-200 p-0 overflow-hidden [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:opacity-100">
        <div className="bg-green-700 px-6 py-5 text-white">
          <DialogHeader className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <Sprout className="h-3.5 w-3.5" aria-hidden />
              Investment alert
            </div>
            <DialogTitle className="font-serif text-2xl text-white">
              Greenhouse Expansion Now Open
            </DialogTitle>
            <DialogDescription className="text-green-50 text-sm leading-relaxed">
              Steaders8 Farm is accepting investors for Phase One greenhouse production of Bell Pepper
              and Super Habanero. Join up to 8 partners in a 5-year profit-sharing opportunity.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-4 px-6 py-5">
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <span className="font-semibold text-gray-900">Funding target:</span> ₦24,000,000
            </li>
            <li>
              <span className="font-semibold text-gray-900">Indicative contribution:</span> ₦3,000,000 per investor
            </li>
            <li>
              <span className="font-semibold text-gray-900">Crops:</span> Bell Pepper &amp; Super Habanero
            </li>
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={GREENHOUSE_ALERT_HREF}
              onClick={dismiss}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
            >
              View investment details
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
