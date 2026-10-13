'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type InvestorSessionState = 'loading' | 'signed-in' | 'signed-out'

export function useInvestorSession(): InvestorSessionState {
  const [state, setState] = useState<InvestorSessionState>('loading')

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setState('signed-out')
      return
    }
    let active = true
    createClient()
      .auth.getSession()
      .then(({ data }) => {
        if (active) setState(data.session ? 'signed-in' : 'signed-out')
      })
      .catch(() => {
        if (active) setState('signed-out')
      })
    return () => {
      active = false
    }
  }, [])

  return state
}
