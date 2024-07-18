'use client'

import { useEffect, useState } from 'react'
import LoginPromptSkeleton from '@/components/home/loginPromptSkeleton'
import { useUser } from '@auth0/nextjs-auth0/client'
import WelcomeBackPrompt from '@/components/home/welcomeBackPrompt'
import ErrorMessage from '@/components/shared/errorMessage'
import Link from 'next/link'

export default function LoginPrompt() {
  const { user, error, isLoading } = useUser()
  const [offline, setOffline] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.clear()
    setLoading(false)
    window.addEventListener('online', () => setOffline(false))
    window.addEventListener('offline', () => setOffline(true))
  }, [user, error])

  if (loading || isLoading) return <LoginPromptSkeleton />
  if (offline)
    return (
      <div className='mt-6'>
        <ErrorMessage message='No hay conexión a internet. Por favor, intenta más tarde.' />
      </div>
    )

  if (error) return <ErrorMessage message={error.message} />

  if (user)
    return (
      <WelcomeBackPrompt
        nickname={user.nickname || (user.given_name as string)}
      />
    )

  return (
    <div className='mt-6 flex flex-col items-center gap-4'>
      <p className='text-center'>Elige una opción para continuar</p>
      <a
        href='/api/auth/login?returnTo=/dashboard'
        className='w-full cursor-pointer rounded-md border border-white bg-white p-3 text-blue-500 transition-colors duration-200 hover:border-gray-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:border-blue-500 sm:bg-blue-500 sm:text-white sm:hover:border-blue-600 sm:hover:bg-blue-600'
      >
        Iniciar Sesión
      </a>
      <Link
        href='/recover'
        className='w-full cursor-pointer rounded-md border border-white bg-transparent p-3 text-white transition-colors duration-200 hover:bg-white hover:bg-opacity-10 disabled:cursor-not-allowed disabled:opacity-50 sm:border-blue-500 sm:bg-white sm:text-blue-500 sm:hover:bg-gray-100 sm:hover:text-blue-500'
      >
        Activar Cuenta
      </Link>
    </div>
  )
}
