import { currentUser } from '@clerk/nextjs/server'
import OnboardingForm from '@/components/home/onboardingForm'
import { CardContent } from '@/components/ui/card'
import ErrorAlert from '@/components/shared/errorAlert'

export default async function OnboardingPrompt() {
  const user = await currentUser()

  if (!user) {
    return (
      <ErrorAlert
        title='Ha ocurrido un error'
        description='No se pudo cargar la información del usuario.'
      />
    )
  }

  return (
    <CardContent>
      <OnboardingForm
        userId={user.id}
        userEmail={user?.primaryEmailAddress?.emailAddress as string}
      />
    </CardContent>
  )
}
