import { getUserById } from '@/queries/select'
import { currentUser } from '@clerk/nextjs/server'
import { Button } from '../ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import Link from 'next/link'

export default async function RegisterAlert() {
  const user = await currentUser()
  if (!user) return null

  const salutation = user.fullName ? `Hola, ${user.fullName}` : 'Hola'
  const userExistsInDb = await getUserById(user.id)

  if (!userExistsInDb) {
    return (
      <Card className='mb-2 border-l-4 border-yellow-400 bg-yellow-50 text-left text-card-foreground'>
        <CardHeader>
          <CardTitle className='text-lg'>{salutation}</CardTitle>
          <CardDescription className='text-card-foreground'>
            Parece que no has completado tu registro. Por favor, completa tu
            registro para poder acceder a todas las funcionalidades de la
            plataforma.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant='outline'>
            <Link href='/onboarding'>Completar Registro</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return null
}
