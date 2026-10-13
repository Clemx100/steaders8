'use client'

import { useState } from 'react'
import { Loader2, Megaphone, PlayCircle, Settings2 } from 'lucide-react'
import { STAGE_META, formatDateTime, formatNaira, type SeasonStage } from '@/lib/portal'
import { postSeasonUpdate, setSeasonStage, startNewSeason, updateProject } from '@/app/admin/actions'
import { GrowthStageAnimation } from '@/components/investor/growth-stage-animation'
import { StageTracker } from '@/components/investor/stage-tracker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { AdminProject } from './types'
import { useAdminAction } from './use-admin-action'

const QUICK_UPDATES = [
  { title: 'Harvested and on route to market', message: 'Today\'s harvest is packed and on its way to market.' },
  { title: 'Sold today', message: 'Produce sold today. Expect your payment within 48 hours.' },
  { title: 'Crops are doing well', message: 'Our team inspected the farm today. Plants are healthy and growing well.' },
  { title: 'Weather update', message: '' },
]

export function SeasonsTab({ projects }: { projects: AdminProject[] }) {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectSeasonCard key={project.id} project={project} />
      ))}
    </div>
  )
}

function ProjectSeasonCard({ project }: { project: AdminProject }) {
  const season = project.season
  const currentStage = season?.stage ?? 'awaiting_start'
  const nextStage = project.stages[project.stages.indexOf(currentStage) + 1] ?? currentStage
  const [showSettings, setShowSettings] = useState(false)

  return (
    <section className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">
      <div className="grid md:grid-cols-[220px_1fr]">
        <div className="relative min-h-[160px] bg-[#e3f4ea]">
          <GrowthStageAnimation stage={currentStage} category={project.category} className="absolute inset-0 h-full w-full" />
        </div>
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-green-700">
                {project.category} · {project.is_open ? 'Open for investment' : 'Closed for investment'}
              </p>
              <h2 className="font-serif text-2xl font-bold text-gray-900">{project.name}</h2>
              <p className="text-sm text-gray-500">
                {season ? season.label : 'No current season'} · {project.investorCount} investors ·{' '}
                {formatNaira(project.confirmedTotal)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Settings2 className="h-3.5 w-3.5" /> Project settings
            </button>
          </div>
          {season && <StageTracker stages={project.stages} current={currentStage} />}
          {season?.stage_ends_at && (
            <p className="text-xs text-gray-500">
              Countdown ends {formatDateTime(season.stage_ends_at)}
            </p>
          )}
        </div>
      </div>

      {showSettings && <ProjectSettings project={project} />}

      {season ? (
        <div className="grid gap-6 border-t border-green-50 p-5 lg:grid-cols-2">
          <StageForm key={`${season.id}-${currentStage}`} project={project} seasonId={season.id} suggested={nextStage} currentStage={currentStage} />
          <div className="space-y-6">
            <UpdateForm seasonId={season.id} />
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Recent updates</h3>
              {project.updates.length === 0 ? (
                <p className="text-sm text-gray-500">No updates posted yet.</p>
              ) : (
                <ul className="space-y-2">
                  {project.updates.map((u) => (
                    <li key={u.id} className="rounded-xl bg-gray-50 p-3 text-sm">
                      <p className="font-medium text-gray-900">{u.title}</p>
                      {u.message && <p className="text-gray-600">{u.message}</p>}
                      <p className="mt-1 text-xs text-gray-400">{formatDateTime(u.created_at)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <NewSeasonForm projectId={project.id} projectName={project.name} hasSeason={Boolean(season)} />
    </section>
  )
}

function StageForm({
  project,
  seasonId,
  suggested,
  currentStage,
}: {
  project: AdminProject
  seasonId: string
  suggested: SeasonStage
  currentStage: SeasonStage
}) {
  const { pending, run } = useAdminAction()
  const [stage, setStage] = useState<SeasonStage>(suggested)
  const [days, setDays] = useState(String(STAGE_META[suggested].defaultCountdownDays ?? ''))
  const [title, setTitle] = useState(STAGE_META[suggested].label)
  const [message, setMessage] = useState(STAGE_META[suggested].defaultMessage)

  function pickStage(next: SeasonStage) {
    setStage(next)
    setDays(String(STAGE_META[next].defaultCountdownDays ?? ''))
    setTitle(STAGE_META[next].label)
    setMessage(STAGE_META[next].defaultMessage)
  }

  const isStart = currentStage === 'awaiting_start'

  return (
    <form
      className="space-y-3 rounded-2xl border border-green-100 bg-green-50/40 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        run(
          () => setSeasonStage({ seasonId, stage, countdownDays: days ? Number(days) : null, title, message }),
          `${project.name} moved to ${STAGE_META[stage].label}`,
        )
      }}
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <PlayCircle className="h-4 w-4 text-green-700" />
        {isStart ? `Start ${project.name}` : 'Move to a new stage'}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor={`stage-${seasonId}`}>Stage</Label>
          <select
            id={`stage-${seasonId}`}
            value={stage}
            onChange={(e) => pickStage(e.target.value as SeasonStage)}
            className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
          >
            {project.stages.map((s) => (
              <option key={s} value={s}>
                {STAGE_META[s].label}
                {s === currentStage ? ' (current)' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <Label htmlFor={`days-${seasonId}`}>Countdown (days)</Label>
          <Input
            id={`days-${seasonId}`}
            inputMode="numeric"
            placeholder="No countdown"
            value={days}
            onChange={(e) => setDays(e.target.value.replace(/[^0-9]/g, ''))}
            className="bg-white"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor={`title-${seasonId}`}>Update title</Label>
        <Input id={`title-${seasonId}`} value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white" />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`msg-${seasonId}`}>Message to investors</Label>
        <Textarea id={`msg-${seasonId}`} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-white" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isStart && stage !== 'awaiting_start' ? 'Start season and notify investors' : 'Update stage'}
      </button>
      <p className="text-xs text-gray-500">The countdown starts from now. Investors see the change immediately.</p>
    </form>
  )
}

function UpdateForm({ seasonId }: { seasonId: string }) {
  const { pending, run } = useAdminAction()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        run(() => postSeasonUpdate(seasonId, title, message), 'Update posted', () => {
          setTitle('')
          setMessage('')
        })
      }}
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Megaphone className="h-4 w-4 text-green-700" />
        Post an update (stage stays the same)
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {QUICK_UPDATES.map((q) => (
          <button
            key={q.title}
            type="button"
            onClick={() => {
              setTitle(q.title)
              setMessage(q.message)
            }}
            className="rounded-full border border-green-200 bg-white px-2.5 py-1 text-xs text-green-800 hover:bg-green-50"
          >
            {q.title}
          </button>
        ))}
      </div>
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="Message" rows={2} value={message} onChange={(e) => setMessage(e.target.value)} />
      <button
        type="submit"
        disabled={pending || !title.trim()}
        className="inline-flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Post update
      </button>
    </form>
  )
}

function ProjectSettings({ project }: { project: AdminProject }) {
  const { pending, run } = useAdminAction()
  const [roi, setRoi] = useState(project.expected_roi_percent === null ? '' : String(project.expected_roi_percent))
  const [min, setMin] = useState(String(project.min_amount ?? 0))
  const [open, setOpen] = useState(project.is_open)

  return (
    <form
      className="grid gap-3 border-t border-green-50 bg-gray-50/60 p-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end"
      onSubmit={(e) => {
        e.preventDefault()
        run(
          () =>
            updateProject(project.id, {
              expected_roi_percent: roi === '' ? null : Number(roi),
              min_amount: Number(min) || 0,
              is_open: open,
            }),
          'Project settings saved',
        )
      }}
    >
      <div className="space-y-1">
        <Label htmlFor={`roi-${project.id}`}>Expected ROI % (leave blank if unknown)</Label>
        <Input id={`roi-${project.id}`} inputMode="decimal" value={roi} onChange={(e) => setRoi(e.target.value.replace(/[^0-9.]/g, ''))} className="bg-white" />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`min-${project.id}`}>Minimum investment (₦)</Label>
        <Input id={`min-${project.id}`} inputMode="numeric" value={min} onChange={(e) => setMin(e.target.value.replace(/[^0-9]/g, ''))} className="bg-white" />
      </div>
      <label className="flex h-10 items-center gap-2 text-sm font-medium text-gray-700">
        <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} className="h-4 w-4 accent-green-600" />
        Open for investment
      </label>
      <button
        type="submit"
        disabled={pending}
        className="h-10 rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
      >
        Save
      </button>
    </form>
  )
}

function NewSeasonForm({ projectId, projectName, hasSeason }: { projectId: string; projectName: string; hasSeason: boolean }) {
  const { pending, run } = useAdminAction()
  const [label, setLabel] = useState('')
  const [open, setOpen] = useState(!hasSeason)

  if (!open) {
    return (
      <div className="border-t border-green-50 px-5 py-3 text-right">
        <button type="button" onClick={() => setOpen(true)} className="text-xs font-medium text-gray-500 hover:text-green-700">
          Start a brand new season for {projectName}
        </button>
      </div>
    )
  }

  return (
    <form
      className="flex flex-wrap items-end gap-3 border-t border-green-50 px-5 py-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (hasSeason && !confirm('This closes the current season. Its investors keep their history. Continue?')) return
        run(() => startNewSeason(projectId, label), 'New season created', () => setLabel(''))
      }}
    >
      <div className="min-w-[220px] flex-1 space-y-1">
        <Label htmlFor={`season-${projectId}`}>New season name</Label>
        <Input
          id={`season-${projectId}`}
          placeholder={`${projectName} - ${new Date().getFullYear()} Season 2`}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={pending || !label.trim()}
        className="h-10 rounded-lg border border-gray-300 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Create season
      </button>
    </form>
  )
}
