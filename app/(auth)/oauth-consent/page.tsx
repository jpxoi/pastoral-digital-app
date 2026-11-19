import { OAuthConsent, Show } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  referrer: 'strict-origin-when-cross-origin',
}

export default function OAuthConsentPage() {
  return (
    <Suspense>
      <Show when='signed-in'>
        <OAuthConsent />
      </Show>
    </Suspense>
  )
}
