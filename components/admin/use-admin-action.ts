'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import type { ActionResult } from '@/app/admin/actions'

export function useAdminAction() {
  const [pending, startTransition] = useTransition()

  function run(action: () => Promise<ActionResult>, successMessage: string, onSuccess?: () => void) {
    startTransition(async () => {
      let result: ActionResult
      try {
        result = await action()
      } catch {
        toast.error('Your session has expired. Please sign in again.')
        window.location.assign('/admin/login')
        return
      }
      if (result.ok) {
        toast.success(successMessage)
        onSuccess?.()
      } else {
        toast.error(result.error)
      }
    })
  }

  return { pending, run }
}
