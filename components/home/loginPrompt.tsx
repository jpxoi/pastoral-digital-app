import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function LoginPrompt() {
  return (
    <div className='flex flex-col items-center gap-2'>
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
    </div>
  )
}
