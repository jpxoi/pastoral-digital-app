'use client'

import ErrorMessage from '@/components/shared/errorMessage'
import Link from 'next/link'
import { useState } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [showError, setShowError] = useState(false)
  return (
    <main className='flex w-full flex-col items-center justify-center'>
      <div
        role='alert'
        className='flex h-screen max-w-screen-sm flex-col items-center justify-center gap-6 p-8'
      >
        <div className='flex flex-col items-center justify-center gap-2'>
          <h1 className='text-3xl font-bold'>¡Algo salió mal!</h1>
          <h2 className='text-xl font-semibold text-red-950'>
            {`Error ${error.digest || 'desconocido'}`}
          </h2>

          <button
            className='text-sm text-gray-500 hover:underline'
            onClick={() => setShowError(!showError)}
          >
            {showError ? 'Ocultar detalles' : 'Mostrar detalles'}
          </button>
        </div>
        {showError && <ErrorMessage message={`${error.message}`} />}
        <button
          className='max-w-fit rounded-md border-none bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => reset()}
        >
          Intentar de nuevo
        </button>
        <div className='text-sm text-gray-500'>
          <p>Si el problema persiste, intente con las siguientes opciones</p>
          <Link className='text-blue-600 hover:underline' href='/'>
            Regresar al inicio
          </Link>
          <span className='mx-1'>|</span>
          <a
            href='https://wa.me/447787024710'
            className='text-yellow-600 hover:underline'
          >
            Contactar a soporte
          </a>
        </div>{' '}
      </div>
    </main>
  )
}
