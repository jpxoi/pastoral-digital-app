import OnboardingPrompt from '@/components/home/onboardingPrompt'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Suspense } from 'react'
import { Metadata } from 'next'
import OnboardingPromptSkeleton from '@/components/home/onboardingPromptSkeleton'

export const metadata: Metadata = {
  title: 'Onboarding | Pastoral Digital App',
}

export default function OnboardingPage() {
  return (
    <Card className='max-h-full overflow-y-scroll bg-white'>
      <CardHeader>
        <CardTitle>Completa tu registro</CardTitle>
        <CardDescription>
          Por favor, completa el formulario con información precisa y
          actualizada.
        </CardDescription>
      </CardHeader>
      <Suspense fallback={<OnboardingPromptSkeleton />}>
        <OnboardingPrompt />
      </Suspense>
    </Card>
  )
}
