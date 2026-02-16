import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import OfflineAlert from '@/components/shared/offlineAlert'
import { Suspense } from 'react'

export default function LoginPrompt() {
  return (
    <>
      <Suspense fallback={null}>
        <OfflineAlert />
      </Suspense>
      <div className='mt-6 flex flex-col items-center gap-2'>
        <ClerkLoading>
          <Skeleton className='h-11 w-full' />
          <Skeleton className='h-11 w-full' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignInButton>
            <Button
              size='lg'
              className='max-sm:bg-primary-foreground max-sm:text-primary max-sm:hover:bg-accent max-sm:hover:text-accent-foreground w-full'
            >
              Iniciar sesión
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button
              size='lg'
              variant='outline'
              className='max-sm:text-primary-foreground w-full max-sm:bg-transparent'
            >
              Registrarse
            </Button>
          </SignUpButton>
        </ClerkLoaded>
      </div>
    </>
  )
}
