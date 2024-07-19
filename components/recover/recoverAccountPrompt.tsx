'use client'

import { useEffect, useState } from 'react'
import SuccessMessage from '@/components/shared/successMessage'
import ErrorMessage from '@/components/shared/errorMessage'
import RecoverAccountPromptSkeleton from './recoverAccountPromptSkeleton'
import Link from 'next/link'

export default function RecoverAccountPrompt() {
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [userEmail, setUserEmail] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setLoading(false)
    window.addEventListener('online', () => setOffline(false))
    window.addEventListener('offline', () => setOffline(true))
  }, [])

  const handleRecoverAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: 'BxVmRmouE9EYcOlBQtBEriRKE8da4u5V',
        email: userEmail,
        connection: 'Username-Password-Authentication',
      }),
    }

    try {
      const response = await fetch(
        'https://jpxoi.us.auth0.com/dbconnections/change_password',
        options
      )

      if (response.ok) {
        setSuccess(true)
        setError('')
      } else {
        const data = await response.json()
        throw new Error(data.error)
      }
    } catch (error: any) {
      setError(error.message as string)
    }
  }

  if (offline)
    return (
      <div className='mt-6'>
        <ErrorMessage message='No hay conexión a internet. Por favor, intenta más tarde.' />
      </div>
    )
  if (loading) return <RecoverAccountPromptSkeleton />

  return (
    <>
      <form
        className='flex w-full flex-col gap-4'
        onSubmit={handleRecoverAccount}
      >
        <div className='flex w-full flex-col items-center justify-center gap-1'>
          <label htmlFor='email' className='text-sm font-medium'>
            Correo Electrónico
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Correo Electrónico'
            className='w-full rounded-md border border-gray-300 p-2 py-3 transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={userEmail}
            disabled={success}
            required
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <button
          type='submit'
          disabled={userEmail.length < 5 || success}
          className='w-full cursor-pointer rounded-md bg-blue-500 p-2 py-3 text-white transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500'
        >
          Enviar Correo Electrónico
        </button>
      </form>
      {success && (
        <>
          <SuccessMessage message='Si el correo ingresado está asociado a una cuenta, recibirás un mensaje con instrucciones para restablecer tu contraseña.' />
          <p className='flex flex-col text-center text-sm text-gray-600'>
            ¿Ya activaste tu cuenta?{' '}
            <a
              href='/api/auth/login'
              className='text-base text-blue-500 hover:text-blue-600 hover:underline'
            >
              Inicia Sesión
            </a>
          </p>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </>
  )
}
