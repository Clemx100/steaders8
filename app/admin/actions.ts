'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { STAGE_META, formatNaira, type SeasonStage } from '@/lib/portal'
import { generateCertificateCode, parseCertificateScan } from '@/lib/certificate'

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
      .select('id, project_id, certificate_code, project:projects(slug)')
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

    const project = investment.project as { slug: string } | { slug: string }[] | null
    const slug = Array.isArray(project) ? project[0]?.slug : project?.slug
    const confirmedAt = new Date().toISOString()
    const certificateCode =
      investment.certificate_code || generateCertificateCode(slug || 'INV', investment.id, confirmedAt)

    const baseUpdate = {
      status: 'confirmed' as const,
      season_id: season.id,
      confirmed_at: confirmedAt,
      admin_note: '',
    }

    const { error } = await supabase
      .from('investments')
      .update({ ...baseUpdate, certificate_code: certificateCode })
      .eq('id', investmentId)

    if (error && /certificate_code/i.test(error.message)) {
      const retry = await supabase.from('investments').update(baseUpdate).eq('id', investmentId)
      return retry.error?.message ?? null
    }
    return error?.message ?? null
  })
}

export type CertificateVerifyResult =
  | {
      valid: true
      certificateCode: string
      investorName: string
      email: string
      projectName: string
      amountLabel: string
      confirmedAt: string
      seasonLabel: string | null
    }
  | { valid: false; reason: string }

export async function verifyCertificateCode(raw: string): Promise<CertificateVerifyResult> {
  try {
    const supabase = await adminClient()
    const code = parseCertificateScan(raw)
    if (!code) {
      return { valid: false, reason: 'Not a Steaders8 certificate code.' }
    }

    const selectCols =
      'id, amount, status, confirmed_at, certificate_code, investor:profiles(full_name, email), project:projects(name, slug), season:seasons(label)'

    let data: Record<string, unknown> | null = null
    const byCode = await supabase.from('investments').select(selectCols).eq('certificate_code', code).maybeSingle()

    if (byCode.error && /certificate_code/i.test(byCode.error.message)) {
      const all = await supabase
        .from('investments')
        .select(
          'id, amount, status, confirmed_at, investor:profiles(full_name, email), project:projects(name, slug), season:seasons(label)',
        )
        .eq('status', 'confirmed')
      if (all.error) return { valid: false, reason: all.error.message }
      data =
        (all.data ?? []).find((row) => {
          const project = row.project as { slug: string } | { slug: string }[] | null
          const slug = Array.isArray(project) ? project[0]?.slug : project?.slug
          return generateCertificateCode(slug || 'INV', row.id, row.confirmed_at) === code
        }) ?? null
    } else if (byCode.error) {
      return { valid: false, reason: byCode.error.message }
    } else {
      data = byCode.data
    }

    if (!data) {
      // Also try deterministic match even when column exists but code was never stored
      const all = await supabase
        .from('investments')
        .select(selectCols)
        .eq('status', 'confirmed')
      if (!all.error) {
        data =
          (all.data ?? []).find((row) => {
            const stored = (row as { certificate_code?: string | null }).certificate_code
            if (stored && stored === code) return true
            const project = row.project as { slug: string } | { slug: string }[] | null
            const slug = Array.isArray(project) ? project[0]?.slug : project?.slug
            return generateCertificateCode(slug || 'INV', row.id, row.confirmed_at) === code
          }) ?? null
      }
    }

    if (!data) return { valid: false, reason: 'No investment matches this certificate. Not a confirmed Steaders8 investor.' }
    if (data.status !== 'confirmed' || !data.confirmed_at) {
      return { valid: false, reason: 'This investment exists but is not confirmed.' }
    }

    const investor = data.investor as { full_name: string; email: string } | { full_name: string; email: string }[] | null
    const project = data.project as { name: string } | { name: string }[] | null
    const season = data.season as { label: string } | { label: string }[] | null
    const person = Array.isArray(investor) ? investor[0] : investor
    const proj = Array.isArray(project) ? project[0] : project
    const sea = Array.isArray(season) ? season[0] : season

    return {
      valid: true,
      certificateCode: (data.certificate_code as string | null) || code,
      investorName: person?.full_name || 'Unknown',
      email: person?.email || '',
      projectName: proj?.name || 'Unknown project',
      amountLabel: formatNaira(Number(data.amount)),
      confirmedAt: data.confirmed_at as string,
      seasonLabel: sea?.label ?? null,
    }
  } catch (e) {
    return { valid: false, reason: e instanceof Error ? e.message : 'Verification failed' }
  }
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
