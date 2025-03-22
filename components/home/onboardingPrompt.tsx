import { currentUser } from '@clerk/nextjs/server'
import OnboardingForm from './onboardingForm'
import { CardContent } from '../ui/card'
import ErrorAlert from '../shared/errorAlert'

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
        userUsername={user.username as string}
        userEmail={user?.primaryEmailAddress?.emailAddress as string}
      />
    </CardContent>
  )
}
