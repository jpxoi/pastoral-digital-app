'use client'

import { useEffect, useState } from 'react'
import LoginPromptSkeleton from '@/components/home/loginPromptSkeleton'
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  useUser,
} from '@clerk/nextjs'
import WelcomeBackPrompt from '@/components/home/welcomeBackPrompt'
import ErrorAlert from '@/components/shared/errorAlert'
import { Button } from '../ui/button'

export default function LoginPrompt() {
  const { isSignedIn, user } = useUser()
  const [offline, setOffline] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.clear()
    setLoading(false)
    window.addEventListener('online', () => setOffline(false))
    window.addEventListener('offline', () => setOffline(true))
  }, [user])

  if (loading) return <LoginPromptSkeleton />

  if (offline)
    return (
      <div className='mt-6'>
        <ErrorAlert title="Conexión perdida" description='No hay conexión a internet. Por favor, intenta más tarde.' />
      </div>
      
    )

  if (isSignedIn && user) {
    return <WelcomeBackPrompt nickname={user?.firstName as string} />
  }

  return (
    <>
      <div className='mt-6 flex flex-col items-center gap-2'>
        <ClerkLoading>
          <div className='h-10 w-full animate-pulse rounded-md bg-gray-200'></div>
          <div className='h-10 w-full animate-pulse rounded-md bg-gray-200'></div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignInButton>
            <Button className='w-full max-sm:bg-primary-foreground max-sm:text-primary'>
              Iniciar sesión
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button variant='outline' className='w-full max-sm:bg-transparent max-sm:text-primary-foreground'> 
              Registrarse
            </Button>
          </SignUpButton>
        </ClerkLoaded>
      </div>
    </>
  )
}
