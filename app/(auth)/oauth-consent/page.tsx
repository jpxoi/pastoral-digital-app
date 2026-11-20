import { Show } from '@clerk/nextjs'
import { AuthOAuthConsent } from '@/components/auth/auth-clerk-forms'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Autorizar acceso',
  referrer: 'strict-origin-when-cross-origin',
}

export default function OAuthConsentPage() {
  return (
    <Suspense>
      <Show when='signed-in'>
        <AuthOAuthConsent />
      </Show>
    </Suspense>
  )
}
