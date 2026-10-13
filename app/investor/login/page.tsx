import { Suspense } from 'react'
import { AuthShell } from '@/components/portal/auth-shell'
import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <AuthShell title="Investor login" subtitle="Sign in to see your investments, crop progress and returns.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  )
}
