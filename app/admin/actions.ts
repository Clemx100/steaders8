'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { STAGE_META, type SeasonStage } from '@/lib/portal'

export type ActionResult = { ok: true } | { ok: false; error: string }

async function adminClient() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not signed in')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') throw new Error('Not allowed')
  return supabase
}

async function run(fn: (supabase: Awaited<ReturnType<typeof createClient>>) => Promise<string | null>): Promise<ActionResult> {
  try {
    const supabase = await adminClient()
    const error = await fn(supabase)
    if (error) return { ok: false, error }
    revalidatePath('/admin')
    revalidatePath('/investor/dashboard')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Something went wrong' }
  }
}

export async function setInvestorStatus(profileId: string, status: 'approved' | 'rejected' | 'pending') {
  return run(async (supabase) => {
    const { error } = await supabase
      .from('profiles')
      .update({ status, approved_at: status === 'approved' ? new Date().toISOString() : null })
      .eq('id', profileId)
    return error?.message ?? null
  })
}

export async function confirmInvestment(investmentId: string) {
  return run(async (supabase) => {
    const { data: investment, error: findError } = await supabase
      .from('investments')
      .select('project_id')
      .eq('id', investmentId)
      .single()
    if (findError || !investment) return 'Investment not found'

    const { data: season } = await supabase
      .from('seasons')
      .select('id')
      .eq('project_id', investment.project_id)
      .eq('is_current', true)
      .maybeSingle()
    if (!season) return 'This project has no current season. Create one in the Seasons tab first.'

    const { error } = await supabase
      .from('investments')
      .update({ status: 'confirmed', season_id: season.id, confirmed_at: new Date().toISOString(), admin_note: '' })
      .eq('id', investmentId)
    return error?.message ?? null
  })
}

export async function rejectInvestment(investmentId: string, note: string) {
  return run(async (supabase) => {
    const { error } = await supabase
      .from('investments')
      .update({ status: 'rejected', admin_note: note.trim() })
      .eq('id', investmentId)
    return error?.message ?? null
  })
}

export async function setSeasonStage(input: {
  seasonId: string
  stage: SeasonStage
  countdownDays: number | null
  title: string
  message: string
}) {
  return run(async (supabase) => {
    const now = new Date()
    const { data: season } = await supabase.from('seasons').select('started_at').eq('id', input.seasonId).single()
    if (!season) return 'Season not found'

    const endsAt =
      input.countdownDays && input.countdownDays > 0
        ? new Date(now.getTime() + input.countdownDays * 86_400_000).toISOString()
        : null

    const { error } = await supabase
      .from('seasons')
      .update({
        stage: input.stage,
        stage_started_at: now.toISOString(),
        stage_ends_at: endsAt,
        started_at: season.started_at ?? (input.stage === 'awaiting_start' ? null : now.toISOString()),
      })
      .eq('id', input.seasonId)
    if (error) return error.message

    const { error: updateError } = await supabase.from('season_updates').insert({
      season_id: input.seasonId,
      stage: input.stage,
      title: input.title.trim() || STAGE_META[input.stage].label,
      message: input.message.trim(),
    })
    return updateError?.message ?? null
  })
}

export async function postSeasonUpdate(seasonId: string, title: string, message: string) {
  return run(async (supabase) => {
    if (!title.trim()) return 'Enter a title for the update'
    const { error } = await supabase
      .from('season_updates')
      .insert({ season_id: seasonId, title: title.trim(), message: message.trim() })
    return error?.message ?? null
  })
}

export async function startNewSeason(projectId: string, label: string) {
  return run(async (supabase) => {
    if (!label.trim()) return 'Enter a name for the new season'
    const { error: closeError } = await supabase
      .from('seasons')
      .update({ is_current: false })
      .eq('project_id', projectId)
      .eq('is_current', true)
    if (closeError) return closeError.message
    const { error } = await supabase.from('seasons').insert({ project_id: projectId, label: label.trim() })
    return error?.message ?? null
  })
}

export async function updateProject(
  projectId: string,
  values: { expected_roi_percent: number | null; min_amount: number; is_open: boolean },
) {
  return run(async (supabase) => {
    const { error } = await supabase.from('projects').update(values).eq('id', projectId)
    return error?.message ?? null
  })
}

export async function recordPayout(investmentId: string, amount: number, note: string) {
  return run(async (supabase) => {
    if (!(amount > 0)) return 'Enter an amount greater than zero'
    const { error } = await supabase
      .from('payouts')
      .insert({ investment_id: investmentId, amount: Math.round(amount), note: note.trim() })
    return error?.message ?? null
  })
}

export async function splitSeasonPayout(seasonId: string, total: number, note: string) {
  return run(async (supabase) => {
    if (!(total > 0)) return 'Enter an amount greater than zero'
    const { data: investments, error: listError } = await supabase
      .from('investments')
      .select('id, amount')
      .eq('season_id', seasonId)
      .eq('status', 'confirmed')
    if (listError) return listError.message
    if (!investments?.length) return 'No confirmed investors in this season'

    const rows = splitByShare(investments, Math.round(total)).map((row) => ({
      investment_id: row.id,
      amount: row.share,
      note: note.trim(),
    }))
    const { error } = await supabase.from('payouts').insert(rows.filter((r) => r.amount > 0))
    return error?.message ?? null
  })
}

function splitByShare(investments: { id: string; amount: number }[], total: number) {
  const invested = investments.reduce((s, i) => s + Number(i.amount), 0)
  let allocated = 0
  return investments.map((inv, index) => {
    const share =
      index === investments.length - 1 ? total - allocated : Math.floor((Number(inv.amount) / invested) * total)
    allocated += share
    return { id: inv.id, share }
  })
}
