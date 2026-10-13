import { requireAdmin } from '@/lib/portal-auth'
import type { Profile, Project, Season, SeasonUpdate } from '@/lib/portal'
import { PortalHeader } from '@/components/portal/portal-header'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import type { AdminInvestment, AdminPayout, AdminProject } from '@/components/admin/types'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const { supabase, profile } = await requireAdmin()

  const [profilesRes, investmentsRes, projectsRes, seasonsRes, payoutsRes] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase
      .from('investments')
      .select('*, project:projects(name, slug), investor:profiles(full_name, email, phone)')
      .order('created_at', { ascending: false }),
    supabase.from('projects').select('*').order('sort_order'),
    supabase.from('seasons').select('*').eq('is_current', true),
    supabase
      .from('payouts')
      .select('*, investment:investments(id, amount, investor:profiles(full_name), project:projects(name))')
      .order('sent_at', { ascending: false })
      .limit(200),
  ])

  const seasons = (seasonsRes.data ?? []) as Season[]
  const { data: updateRows } = seasons.length
    ? await supabase
        .from('season_updates')
        .select('*')
        .in('season_id', seasons.map((s) => s.id))
        .order('created_at', { ascending: false })
        .limit(100)
    : { data: [] }
  const updates = (updateRows ?? []) as SeasonUpdate[]

  const rawInvestments = (investmentsRes.data ?? []) as Omit<AdminInvestment, 'proofUrl'>[]
  const proofPaths = rawInvestments.map((i) => i.proof_path).filter(Boolean) as string[]
  const signed = proofPaths.length
    ? (await supabase.storage.from('payment-proofs').createSignedUrls(proofPaths, 60 * 60)).data ?? []
    : []
  const urlByPath = new Map(signed.map((s) => [s.path, s.signedUrl]))
  const investments: AdminInvestment[] = rawInvestments.map((i) => ({
    ...i,
    proofUrl: i.proof_path ? urlByPath.get(i.proof_path) ?? null : null,
  }))

  const projects: AdminProject[] = ((projectsRes.data ?? []) as Project[]).map((project) => {
    const season = seasons.find((s) => s.project_id === project.id) ?? null
    const seasonInvestments = season
      ? investments.filter((i) => i.season_id === season.id && i.status === 'confirmed')
      : []
    return {
      ...project,
      season,
      updates: season ? updates.filter((u) => u.season_id === season.id).slice(0, 5) : [],
      confirmedTotal: seasonInvestments.reduce((s, i) => s + Number(i.amount), 0),
      investorCount: new Set(seasonInvestments.map((i) => i.investor_id)).size,
    }
  })

  return (
    <>
      <PortalHeader profile={profile} area="admin" />
      <AdminDashboard
        data={{
          profiles: (profilesRes.data ?? []) as Profile[],
          investments,
          projects,
          payouts: (payoutsRes.data ?? []) as AdminPayout[],
        }}
      />
    </>
  )
}
