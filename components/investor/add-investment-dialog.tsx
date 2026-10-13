'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2, Plus, Upload } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatNaira, type Project } from '@/lib/portal'
import { STEADERS8_WHATSAPP } from '@/lib/contacts'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const MAX_FILE_BYTES = 5 * 1024 * 1024

export function AddInvestmentDialog({
  projects,
  userId,
  initialProjectSlug,
}: {
  projects: Project[]
  userId: string
  initialProjectSlug?: string
}) {
  const router = useRouter()
  const initialProject = projects.find((p) => p.slug === initialProjectSlug)
  const [open, setOpen] = useState(Boolean(initialProject) || initialProjectSlug === 'new')
  const [projectId, setProjectId] = useState(initialProject?.id ?? projects[0]?.id ?? '')
  const [amount, setAmount] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const project = projects.find((p) => p.id === projectId)
  const minAmount = Number(project?.min_amount ?? 0)

  function reset() {
    setAmount('')
    setFile(null)
    setError('')
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const value = Number(amount.replace(/,/g, ''))
    if (!project) return setError('Choose a project.')
    if (!Number.isFinite(value) || value <= 0) return setError('Enter the amount you paid.')
    if (minAmount > 0 && value < minAmount) return setError(`The minimum for ${project.name} is ${formatNaira(minAmount)}.`)
    if (!file) return setError('Upload your proof of payment.')
    if (file.size > MAX_FILE_BYTES) return setError('The file is too large. Maximum size is 5 MB.')

    setSaving(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${userId}/${Date.now()}.${ext}`
    const upload = await supabase.storage.from('payment-proofs').upload(path, file, { contentType: file.type })
    if (upload.error) {
      setSaving(false)
      return setError('Could not upload your proof of payment. Please try again.')
    }

    const { error: insertError } = await supabase.from('investments').insert({
      investor_id: userId,
      project_id: project.id,
      amount: value,
      proof_path: path,
    })
    setSaving(false)
    if (insertError) return setError('Could not save your investment. Please try again.')

    reset()
    setOpen(false)
    if (initialProjectSlug) router.replace('/investor/dashboard', { scroll: false })
    router.refresh()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) {
          reset()
          if (initialProjectSlug) router.replace('/investor/dashboard', { scroll: false })
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-600/20 hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add investment
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl bg-white sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Add an investment</DialogTitle>
          <DialogDescription>
            Make your transfer using the account details Steaders8 Farm shared with you, then upload the receipt here.
            We will confirm it and it will appear on your dashboard.
          </DialogDescription>
        </DialogHeader>

        {projects.length === 0 ? (
          <p className="text-sm text-gray-600">There are no open investment windows at the moment.</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="project">Project</Label>
              <select
                id="project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {project?.description && <p className="text-xs text-gray-500">{project.description}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="amount">Amount paid (₦)</Label>
              <Input
                id="amount"
                inputMode="numeric"
                placeholder={minAmount > 0 ? String(minAmount) : 'e.g. 500000'}
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9,]/g, ''))}
              />
              {minAmount > 0 && <p className="text-xs text-gray-500">Minimum {formatNaira(minAmount)}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proof">Proof of payment</Label>
              <label
                htmlFor="proof"
                className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-green-200 bg-green-50/50 px-4 py-6 text-center hover:border-green-400"
              >
                <Upload className="h-5 w-5 text-green-700" />
                <span className="text-sm font-medium text-gray-800">{file ? file.name : 'Tap to upload receipt'}</span>
                <span className="text-xs text-gray-500">Image or PDF, up to 5 MB</span>
              </label>
              <input
                id="proof"
                type="file"
                accept="image/*,application/pdf"
                className="sr-only"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
            {error && <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit for confirmation
            </button>
            <p className="text-center text-xs text-gray-500">
              Need the account details?{' '}
              <a href={STEADERS8_WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-700 hover:underline">
                Ask us on WhatsApp
              </a>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
