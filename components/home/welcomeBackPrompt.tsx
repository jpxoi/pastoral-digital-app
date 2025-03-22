import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function WelcomeBackPrompt({ nickname }: { nickname: string }) {
  return (
    <div className='mt-6 flex flex-col items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-center text-2xl font-medium sm:font-normal'>
          ¡Hola, {nickname}!
        </h1>
        <p className='text-center text-sm text-gray-200 sm:text-gray-500'>
          ¿No eres {nickname}?{' '}
          <SignOutButton>
            <span className='cursor-pointer text-gray-50 hover:text-white hover:underline sm:text-primary sm:hover:text-primary'>
              Cerrar Sesión
            </span>
          </SignOutButton>
        </p>
      </div>
      <Button
        asChild
        size='lg'
        className='w-full max-sm:bg-primary-foreground max-sm:text-primary max-sm:hover:bg-accent max-sm:hover:text-accent-foreground'
      >
        <Link href='/dashboard'>Acceder a la Plataforma</Link>
      </Button>
    </div>
  )
}
