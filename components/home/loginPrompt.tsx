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
      <div className='mt-6 flex flex-col items-center gap-4'>
        <ClerkLoading>
          <div className='h-[3.125rem] w-full animate-pulse rounded-md bg-gray-200'></div>
          <div className='h-[3.125rem] w-full animate-pulse rounded-md bg-gray-200'></div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignInButton>
            <button className='w-full cursor-pointer rounded-md border border-white bg-white p-3 text-blue-500 transition-colors duration-200 hover:border-gray-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:border-blue-500 sm:bg-blue-500 sm:text-white sm:hover:border-blue-600 sm:hover:bg-blue-600'>
              Iniciar sesión
            </button>
          </SignInButton>
          <SignUpButton>
            <button className='w-full cursor-pointer rounded-md border border-gray-300 p-3 text-white transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 sm:bg-white sm:text-gray-700'>
              Registrarse
            </button>
          </SignUpButton>
        </ClerkLoaded>
      </div>
    </>
  )
}
