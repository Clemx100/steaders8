import { redirect } from 'next/navigation'
import { Clock, XCircle } from 'lucide-react'
import { getSessionProfile } from '@/lib/portal-auth'
import { PortalHeader } from '@/components/portal/portal-header'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { STEADERS8_PHONE, STEADERS8_WHATSAPP } from '@/lib/contacts'

export const dynamic = 'force-dynamic'

export default async function PendingPage() {
  const { user, profile } = await getSessionProfile()
  if (!user) redirect('/investor/login')
  if (profile?.status === 'approved') redirect('/investor/dashboard')

  const rejected = profile?.status === 'rejected'
  const firstName = profile?.full_name.split(' ')[0] || 'there'

  return (
    <>
      <PortalHeader profile={profile} />
      <main className="mx-auto max-w-xl px-4 py-16">
        <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-green-100 text-center">
          <div
            className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
              rejected ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
            }`}
          >
            {rejected ? <XCircle className="h-8 w-8" /> : <Clock className="h-8 w-8 animate-pulse" />}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {rejected ? 'We could not verify your account' : `Thanks for registering, ${firstName}`}
          </h1>
          <p className="text-gray-600 mb-8">
            {rejected
              ? 'We could not match your details to an investment with Steaders8 Farm. If you believe this is a mistake, please contact us.'
              : 'Your account is awaiting approval. Once Steaders8 Farm confirms you are an investor, your dashboard will open automatically the next time you sign in.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={STEADERS8_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${STEADERS8_PHONE}`}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Call {STEADERS8_PHONE}
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
