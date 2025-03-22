'use client'

import { useEffect, useState } from 'react'
import LoginPromptSkeleton from '@/components/home/loginPromptSkeleton'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs'
import ErrorAlert from '@/components/shared/errorAlert'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import RedirectToDashboard from '../dashboard/redirectToDashboard'

export default function LoginPrompt() {
  const [offline, setOffline] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.clear()
    setLoading(false)
    window.addEventListener('online', () => setOffline(false))
    window.addEventListener('offline', () => setOffline(true))
  }, [])

  if (loading) return <LoginPromptSkeleton />

  if (offline)
    return (
      <div className='mt-6'>
        <ErrorAlert
          title='Conexión perdida'
          description='No hay conexión a internet. Por favor, intenta más tarde.'
        />
      </div>
    )

  return (
    <>
      <div className='mt-6 flex flex-col items-center gap-2'>
        <ClerkLoading>
          <Skeleton className='h-11 w-full' />
          <Skeleton className='h-11 w-full' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <Skeleton className='h-11 w-full' />
            <Skeleton className='h-11 w-full' />
            <RedirectToDashboard />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button
                size='lg'
                className='w-full max-sm:bg-primary-foreground max-sm:text-primary max-sm:hover:bg-accent max-sm:hover:text-accent-foreground'
              >
                Iniciar sesión
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                size='lg'
                variant='outline'
                className='w-full max-sm:bg-transparent max-sm:text-primary-foreground'
              >
                Registrarse
              </Button>
            </SignUpButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </>
  )
}
