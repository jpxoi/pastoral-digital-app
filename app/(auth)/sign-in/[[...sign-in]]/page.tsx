import { AuthSignIn } from '@/components/auth/auth-clerk-forms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
}

export default function Page() {
  return <AuthSignIn />
}
