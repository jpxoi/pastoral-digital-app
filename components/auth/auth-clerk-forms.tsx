'use client'

import { SignIn, SignUp } from '@clerk/nextjs'
import { useIsMobile } from '@/hooks/use-mobile'
import { Spinner } from '@/components/ui/spinner'

const flushAppearance = {
  options: { elevation: 'flush', logoPlacement: 'none' },
  elements: {
    rootBox: 'max-md:w-full',
    card: 'rounded-t-2xl',
    cardBox: 'w-full rounded-2xl shadow-sm max-md:w-full',
    footer: 'rounded-b-2xl',
  },
} as const

const raisedAppearance = {
  options: { elevation: 'raised', logoPlacement: 'none' },
  elements: {
    rootBox: 'max-md:w-full',
    card: 'rounded-t-2xl',
    cardBox: 'w-full rounded-2xl shadow-sm max-md:w-full',
    footer: 'rounded-b-2xl',
  },
} as const

const authFallback = (
  <Spinner className='text-primary my-auto size-10 md:text-white' />
)

function AuthClerkForm({ Component }: { Component: typeof SignIn }) {
  const isMobile = useIsMobile()

  return (
    <Component
      appearance={isMobile ? flushAppearance : raisedAppearance}
      fallback={authFallback}
    />
  )
}

export function AuthSignIn() {
  return <AuthClerkForm Component={SignIn} />
}

export function AuthSignUp() {
  return <AuthClerkForm Component={SignUp} />
}
