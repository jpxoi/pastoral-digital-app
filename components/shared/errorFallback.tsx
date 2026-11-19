'use client'

import ErrorAlert from '@/components/shared/errorAlert'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  IconAlertTriangle,
  IconChevronDown,
  IconHome,
  IconRefresh,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'

const SUPPORT_WHATSAPP = 'https://wa.me/447787024710'

export default function ErrorFallback({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [showError, setShowError] = useState(false)

  return (
    <Empty role='alert' className='h-full min-h-0'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <IconAlertTriangle />
        </EmptyMedia>
        <EmptyTitle>
          <h1>¡Algo salió mal!</h1>
        </EmptyTitle>
        <EmptyDescription>
          Ocurrió un error inesperado. Inténtalo de nuevo o vuelve al inicio.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        {error.digest ? (
          <p className='text-muted-foreground font-mono text-xs'>
            Código {error.digest}
          </p>
        ) : null}

        <div className='flex flex-wrap items-center justify-center gap-2'>
          <Button onClick={() => reset()}>
            <IconRefresh />
            Intentar de nuevo
          </Button>
          <Button variant='outline' asChild>
            <Link href='/'>
              <IconHome />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <button
          type='button'
          className='text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors'
          onClick={() => setShowError((open) => !open)}
          aria-expanded={showError}
          aria-controls='error-details-section'
        >
          {showError
            ? 'Ocultar detalles técnicos'
            : 'Mostrar detalles técnicos'}
          <IconChevronDown
            className={`size-3.5 transition-transform duration-200 ${showError ? 'rotate-180' : ''}`}
          />
        </button>

        {showError ? (
          <section id='error-details-section' className='w-full text-left'>
            <ErrorAlert title={error.name} description={error.message} />
          </section>
        ) : null}

        <EmptyDescription>
          Si el problema continúa,{' '}
          <a href={SUPPORT_WHATSAPP} target='_blank' rel='noopener noreferrer'>
            contacta a soporte
          </a>
          .
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
