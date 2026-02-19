import { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import OnboardingForm from '@/components/home/onboardingForm'

export const metadata: Metadata = {
  title: 'Onboarding | Pastoral Digital App',
}

export default async function OnboardingPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return (
    <OnboardingForm
      userId={user.id}
      userEmail={user?.primaryEmailAddress?.emailAddress as string}
    />
  )
}
