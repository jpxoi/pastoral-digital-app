'use client'

import ErrorAlert from '@/components/shared/errorAlert'
import { Button } from '@/components/ui/button'
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
    <main className='bg-destructive flex min-h-screen w-full flex-col items-center justify-center'>
      <div
        role='alert'
        className='animate-fade-in flex w-full max-w-(--breakpoint-sm) flex-col items-center justify-center gap-10 rounded-2xl border border-red-200 bg-white/95 p-8 shadow-2xl backdrop-blur-lg md:p-14'
      >
        <div className='flex flex-col items-center justify-center gap-3'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-extrabold text-red-700 drop-shadow-xs'>
              ¡Algo salió mal!
            </h1>
          </div>
          <h2 className='text-lg font-semibold text-red-900/80'>
            {`Error ${error.digest || 'desconocido'}`}
          </h2>
          <button
            className='text-xs text-blue-700 underline transition-colors hover:text-blue-900 focus:outline-hidden'
            onClick={() => setShowError(!showError)}
            aria-expanded={showError}
            aria-controls='error-details-section'
          >
            {showError
              ? 'Ocultar detalles técnicos'
              : 'Mostrar detalles técnicos'}
          </button>
        </div>
        {showError && (
          <section
            id='error-details-section'
            className='animate-fade-in w-full'
          >
            <ErrorAlert title={error.name} description={error.message} />
          </section>
        )}
        {!showError && (
          <Button size={'lg'} onClick={() => reset()}>
            Intentar de nuevo
          </Button>
        )}
        <div className='space-y-2 text-center text-sm text-gray-500'>
          <p className='font-medium text-gray-700'>
            Si el problema persiste, intente con las siguientes opciones:
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <Link
              className='font-semibold text-blue-600 hover:underline'
              href='/'
            >
              Regresar al inicio
            </Link>
            <span className='mx-1 text-gray-400'>|</span>
            <a
              href='https://wa.me/447787024710'
              className='font-semibold text-yellow-600 hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              Contactar a soporte
            </a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </main>
  )
}
