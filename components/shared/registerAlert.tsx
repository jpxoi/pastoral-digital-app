import { auth, currentUser } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default async function RegisterAlert() {
  const isOnboarded =
    (await auth()).sessionClaims?.metadata.onboardingComplete === true
  const user = await currentUser()
  const salutation = user?.firstName
    ? `¡Hola, ${user.firstName as string}!`
    : '¡Hola!'

  if (!isOnboarded) {
    return (
      <Card className='mb-2 border-l-4 border-yellow-400 bg-yellow-50 text-left text-card-foreground'>
        <CardHeader>
          <CardTitle className='text-lg'>{salutation}</CardTitle>
          <CardDescription className='text-card-foreground'>
            Parece que no has completado tu registro. Por favor, completa tu
            registro para poder acceder a todas las funcionalidades de la
            plataforma.
          </CardDescription>
          <CardDescription className='text-card-foreground'>
            Si necesitas ayuda, no dudes en contactar con el coordinador de
            sistemas.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            asChild
            variant='outline'
            className='bg-yellow-600 text-white hover:bg-yellow-700 hover:text-white'
          >
            <Link href='/onboarding'>Completar Registro</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return null
}
