import { AuthShell } from '@/components/portal/auth-shell'
import { RegisterForm } from './register-form'

export default function RegisterPage() {
  return (
    <AuthShell
      title="Register as an investor"
      subtitle="Fill in your details. Your account will be activated once Steaders8 Farm confirms you are an investor."
    >
      <RegisterForm />
    </AuthShell>
  )
}
