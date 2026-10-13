export type SeasonStage =
  | 'awaiting_start'
  | 'nursery'
  | 'transplanted'
  | 'planted'
  | 'growing'
  | 'harvesting'
  | 'route_to_market'
  | 'sold'
  | 'paid_out'
  | 'completed'

export type Profile = {
  id: string
  full_name: string
  email: string
  phone: string
  address: string
  state: string
  occupation: string
  bank_name: string
  account_number: string
  account_name: string
  next_of_kin_name: string
  next_of_kin_phone: string
  role: 'investor' | 'admin'
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  approved_at: string | null
}

export type Project = {
  id: string
  slug: string
  name: string
  category: 'crop' | 'livestock'
  description: string
  image: string
  expected_roi_percent: number | null
  min_amount: number
  is_open: boolean
  stages: SeasonStage[]
  sort_order: number
}

export type Season = {
  id: string
  project_id: string
  label: string
  stage: SeasonStage
  stage_started_at: string
  stage_ends_at: string | null
  started_at: string | null
  is_current: boolean
  created_at: string
}

export type SeasonUpdate = {
  id: string
  season_id: string
  stage: SeasonStage | null
  title: string
  message: string
  created_at: string
}

export type Investment = {
  id: string
  investor_id: string
  project_id: string
  season_id: string | null
  amount: number
  proof_path: string | null
  status: 'pending' | 'confirmed' | 'rejected'
  admin_note: string
  created_at: string
  confirmed_at: string | null
}

export type Payout = {
  id: string
  investment_id: string
  amount: number
  note: string
  sent_at: string
  confirmed_by_investor_at: string | null
}

export type InvestmentWithRelations = Investment & {
  project: Project
  season: Season | null
}

type StageMeta = {
  label: string
  description: string
  defaultCountdownDays?: number
  defaultMessage: string
}

export const STAGE_META: Record<SeasonStage, StageMeta> = {
  awaiting_start: {
    label: 'Awaiting start',
    description: 'Your investment is secured. The season begins when planting starts.',
    defaultMessage: 'The season has not started yet. We will update you as soon as planting begins.',
  },
  nursery: {
    label: 'Nursery',
    description: 'Seeds are planted in the nursery and growing into seedlings.',
    defaultCountdownDays: 30,
    defaultMessage: 'Seeds have been planted in the nursery. Seedlings will be ready for transplanting in about one month.',
  },
  transplanted: {
    label: 'Transplanted',
    description: 'Seedlings have been moved into the greenhouse and are growing to harvest.',
    defaultCountdownDays: 90,
    defaultMessage: 'Seedlings have been transplanted into the greenhouse. Harvest is expected in about three months.',
  },
  planted: {
    label: 'Planted',
    description: 'Planting is complete on the field.',
    defaultCountdownDays: 14,
    defaultMessage: 'Planting is complete. Germination and early growth are under way.',
  },
  growing: {
    label: 'Growing',
    description: 'Crops or animals are growing and being cared for daily.',
    defaultCountdownDays: 60,
    defaultMessage: 'Everything is growing well and receiving daily care from our farm team.',
  },
  harvesting: {
    label: 'Harvesting',
    description: 'Harvest has started.',
    defaultMessage: 'Harvesting has started.',
  },
  route_to_market: {
    label: 'Route to market',
    description: 'Produce has been harvested and is on its way to market.',
    defaultMessage: 'Harvested and on route to market today.',
  },
  sold: {
    label: 'Sold',
    description: 'Produce has been sold. Payment is being processed.',
    defaultMessage: 'Sold today. Expect your payment within 48 hours.',
  },
  paid_out: {
    label: 'Paid out',
    description: 'Returns have been sent to investors.',
    defaultMessage: 'Your returns have been sent. Please confirm once you receive them.',
  },
  completed: {
    label: 'Season completed',
    description: 'This season is complete. Thank you for investing with Steaders8.',
    defaultMessage: 'This season is complete. Thank you for investing with Steaders8 Farm.',
  },
}

export const ALL_STAGES = Object.keys(STAGE_META) as SeasonStage[]

export function formatNaira(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

// Fixed time zone so server-rendered and browser-rendered dates always match.
export const FARM_TIME_ZONE = 'Africa/Lagos'

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: FARM_TIME_ZONE,
  })
}

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: FARM_TIME_ZONE,
  })
}
