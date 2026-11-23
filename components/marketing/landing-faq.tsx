'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { IconChevronDown } from '@tabler/icons-react'
import { cn } from 'cn'

const linkClass =
  'text-foreground underline decoration-border underline-offset-4 hover:decoration-current'

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: '¿Quién puede usar Pastoral Digital?',
    a: 'La plataforma es de uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro. Catequistas, coordinadores, logística y el equipo pastoral acceden con su cuenta.',
  },
  {
    q: '¿Cómo registro mi asistencia?',
    a: 'Abre tu Pastoral ID y muestra el código QR al coordinador. Al escanearlo, la asistencia queda registrada en tu historial. No hace falta pasar lista en papel.',
  },
  {
    q: '¿Qué hago si no pude asistir?',
    a: 'Puedes enviar una justificación desde la aplicación para que el equipo quede informado. Las fechas sin registro válido se consideran falta, según las normas de la pastoral.',
  },
  {
    q: '¿Funciona en el celular?',
    a: 'Sí. Pastoral Digital está pensada para usarse en el teléfono: puedes instalarla como aplicación y llevar tu carnet QR a cada reunión. También funciona en computadora.',
  },
  {
    q: '¿Mis datos están protegidos?',
    a: (
      <>
        Usamos autenticación segura y solo tratamos los datos necesarios para la
        vida pastoral. No vendemos información personal. El detalle está en la{' '}
        <Link href='/privacy' className={linkClass}>
          Política de privacidad
        </Link>
        .
      </>
    ),
  },
  {
    q: '¿A quién contacto si tengo un problema?',
    a: (
      <>
        Escríbenos a{' '}
        <a href='mailto:pastoral@ps.edu.pe' className={linkClass}>
          pastoral@ps.edu.pe
        </a>
        . También puedes revisar los{' '}
        <Link href='/terms' className={linkClass}>
          términos de uso
        </Link>{' '}
        si tienes una consulta sobre la cuenta o el servicio.
      </>
    ),
  },
]

export function LandingFaq() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section
      id='preguntas'
      className='mx-auto w-full max-w-6xl scroll-mt-24 px-4 pt-8 pb-20 md:px-6 md:pt-12 md:pb-24'
    >
      <div className='grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16'>
        <div className='max-w-md'>
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
            Preguntas frecuentes
          </h2>
          <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
            Lo esencial para entrar, registrar asistencia y cuidar tu cuenta.
          </p>
        </div>
        <div>
          {faqs.map((item, index) => {
            const isOpen = open === item.q
            return (
              <div key={item.q} className='border-border border-b first:pt-0'>
                <button
                  type='button'
                  id={`faq-${index}-trigger`}
                  aria-controls={`faq-${index}-answer`}
                  aria-expanded={isOpen}
                  className='focus-visible:ring-ring flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-medium focus-visible:ring-2 focus-visible:outline-none'
                  onClick={() => setOpen(isOpen ? null : item.q)}
                >
                  {item.q}
                  <IconChevronDown
                    aria-hidden='true'
                    className={cn(
                      'text-muted-foreground size-4 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <section
                  id={`faq-${index}-answer`}
                  aria-labelledby={`faq-${index}-trigger`}
                  inert={!isOpen}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className='min-h-0 overflow-hidden'>
                    <p className='text-foreground/75 max-w-prose pb-5 text-sm leading-relaxed'>
                      {item.a}
                    </p>
                  </div>
                </section>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
