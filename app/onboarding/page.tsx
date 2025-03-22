import OnboardingForm from '@/components/home/onboardingForm'
import Background from '@/components/shared/background'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Onboarding | Pastoral Digital App',
}

export default function OnboardingPage() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-center p-4'>
      <Background />
      <Card className='bg-white'>
        <CardHeader>
          <CardTitle>Completa tu registro</CardTitle>
          <CardDescription>
            Por favor, completa el formulario con información precisa y
            actualizada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
    </main>
  )
}
