import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,

} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import OfflineAlert from '@/components/shared/offlineAlert'

export default function LoginPrompt() {
  return (
    <>
      <OfflineAlert />
      <div className='mt-6 flex flex-col items-center gap-2'>
        <ClerkLoading>
          <Skeleton className='h-11 w-full' />
          {/* <Skeleton className='h-11 w-full' /> */}
        </ClerkLoading>
        <ClerkLoaded>
          <SignInButton>
            <Button
              size='lg'
              className='w-full max-sm:bg-primary-foreground max-sm:text-primary max-sm:hover:bg-accent max-sm:hover:text-accent-foreground'
            >
              Iniciar sesión
            </Button>
          </SignInButton>
          {/* <SignUpButton>
            <Button
              size='lg'
              variant='outline'
              className='w-full max-sm:bg-transparent max-sm:text-primary-foreground'
            >
              Registrarse
            </Button>
          </SignUpButton> */}
        </ClerkLoaded>
      </div>
    </>
  )
}
