import 'server-only'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/portal'

export async function getSessionProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { supabase, user: null, profile: null }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single<Profile>()

  return { supabase, user, profile }
}

export async function requireApprovedInvestor() {
  const session = await getSessionProfile()
  if (!session.user) redirect('/investor/login')
  if (!session.profile || session.profile.status !== 'approved') redirect('/investor/pending')
  return { ...session, user: session.user, profile: session.profile }
}

export async function requireAdmin() {
  const session = await getSessionProfile()
  if (!session.user || !session.profile) redirect('/admin/login')
  if (session.profile.role !== 'admin') redirect('/admin/login?error=denied')
  return { ...session, user: session.user, profile: session.profile }
}
