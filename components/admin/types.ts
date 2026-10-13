import type { Investment, Payout, Profile, Project, Season, SeasonUpdate } from '@/lib/portal'

export type AdminInvestment = Investment & {
  project: Pick<Project, 'name' | 'slug'>
  investor: Pick<Profile, 'full_name' | 'email' | 'phone'>
  proofUrl: string | null
}

export type AdminPayout = Payout & {
  investment: {
    id: string
    amount: number
    investor: Pick<Profile, 'full_name'>
    project: Pick<Project, 'name'>
  }
}

export type AdminProject = Project & {
  season: Season | null
  updates: SeasonUpdate[]
  confirmedTotal: number
  investorCount: number
}

export type AdminData = {
  profiles: Profile[]
  investments: AdminInvestment[]
  projects: AdminProject[]
  payouts: AdminPayout[]
}
