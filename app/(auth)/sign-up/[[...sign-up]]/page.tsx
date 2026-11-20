import { AuthSignUp } from '@/components/auth/auth-clerk-forms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear cuenta',
}

export default function Page() {
  return <AuthSignUp />
}
