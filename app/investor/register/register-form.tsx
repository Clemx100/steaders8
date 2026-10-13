'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9 ]{10,15}$/, 'Enter a valid phone number')

const schema = z
  .object({
    full_name: z.string().trim().min(3, 'Enter your full name'),
    email: z.string().trim().email('Enter a valid email'),
    phone,
    occupation: z.string().trim().min(2, 'Enter your occupation'),
    address: z.string().trim().min(5, 'Enter your home address'),
    state: z.string().trim().min(2, 'Enter your state'),
    bank_name: z.string().trim().min(2, 'Enter your bank name'),
    account_number: z.string().trim().regex(/^[0-9]{10}$/, 'Account number must be 10 digits'),
    account_name: z.string().trim().min(3, 'Enter the account name'),
    next_of_kin_name: z.string().trim().min(3, 'Enter next of kin name'),
    next_of_kin_phone: phone,
    password: z.string().min(8, 'Use at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((v) => v.password === v.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

type FormValues = z.infer<typeof schema>

type FieldDef = { name: keyof FormValues; label: string; type?: string; autoComplete?: string; full?: boolean }

const sections: { title: string; fields: FieldDef[] }[] = [
  {
    title: 'Personal details',
    fields: [
      { name: 'full_name', label: 'Full name', autoComplete: 'name', full: true },
      { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
      { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
      { name: 'occupation', label: 'Occupation' },
      { name: 'state', label: 'State of residence' },
      { name: 'address', label: 'Home address', autoComplete: 'street-address', full: true },
    ],
  },
  {
    title: 'Bank details (for your returns)',
    fields: [
      { name: 'bank_name', label: 'Bank name' },
      { name: 'account_number', label: 'Account number', type: 'text' },
      { name: 'account_name', label: 'Account name', full: true },
    ],
  },
  {
    title: 'Next of kin',
    fields: [
      { name: 'next_of_kin_name', label: 'Full name' },
      { name: 'next_of_kin_phone', label: 'Phone number', type: 'tel' },
    ],
  },
  {
    title: 'Password',
    fields: [
      { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
      { name: 'confirm_password', label: 'Confirm password', type: 'password', autoComplete: 'new-password' },
    ],
  },
]

export function RegisterForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setServerError('')
    const { password, confirm_password: _confirm, email, ...details } = values
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: details,
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/investor/pending`,
      },
    })
    if (error) {
      setServerError(error.message)
      return
    }
    if (!data.session) {
      setNeedsEmailConfirm(true)
      return
    }
    router.replace('/investor/pending')
    router.refresh()
  }

  if (needsEmailConfirm) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm border border-green-100 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
        <p className="text-gray-600 text-sm">
          We sent you a confirmation link. Click it to verify your email. Your account will then wait for approval
          from Steaders8 Farm.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-green-100 space-y-8" noValidate>
      {sections.map((section) => (
        <fieldset key={section.title} className="space-y-4">
          <legend className="text-xs font-semibold uppercase tracking-wider text-green-700 mb-1">{section.title}</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.name} className={field.full ? 'sm:col-span-2 space-y-1.5' : 'space-y-1.5'}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  type={field.type ?? 'text'}
                  autoComplete={field.autoComplete}
                  inputMode={field.name === 'account_number' ? 'numeric' : undefined}
                  aria-invalid={Boolean(errors[field.name])}
                  {...register(field.name)}
                />
                {errors[field.name] && <p className="text-xs text-red-600">{errors[field.name]?.message}</p>}
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      {serverError && (
        <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60 transition-colors"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Create investor account
      </button>
      <p className="text-center text-sm text-gray-600">
        Already registered?{' '}
        <Link href="/investor/login" className="font-semibold text-green-700 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
