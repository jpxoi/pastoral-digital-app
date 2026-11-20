import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { PastoralSignature } from '@/components/shared/pastoral-signature'
import { IconBrandInstagram } from '@tabler/icons-react'

const product = [
  { href: '/#la-app', label: 'La app' },
  { href: '/#preguntas', label: 'Preguntas' },
  { href: '/sign-in', label: 'Iniciar sesión' },
] as const

const legal = [
  { href: '/terms', label: 'Términos y condiciones' },
  { href: '/privacy', label: 'Política de privacidad' },
] as const

export async function SiteFooter() {
  'use cache'
  cacheLife('days')

  return (
    <footer className='border-border bg-muted/40 border-t print:hidden'>
      <div className='mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:px-6 lg:grid-cols-[2fr_1fr_1fr] lg:gap-10'>
        <div className='col-span-2 flex flex-col gap-3 lg:col-span-1'>
          <PastoralSignature
            variant='dark'
            sizes='108px'
            className='h-9 w-auto self-start object-contain'
          />
          <p className='text-muted-foreground max-w-sm text-sm leading-relaxed'>
            Plataforma de la Pastoral Mariana del CEP Nuestra Señora del
            Perpetuo Socorro. Identidad digital, asistencia y coordinación en un
            solo lugar.
          </p>
          <div className='flex flex-col items-start gap-1 pt-2'>
            <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
              Contacto
            </p>
            <a
              href='mailto:pastoral@ps.edu.pe'
              className='text-primary text-sm underline-offset-4 hover:underline'
            >
              pastoral@ps.edu.pe
            </a>
          </div>
        </div>
        <nav aria-label='Producto' className='flex flex-col gap-3'>
          <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
            Producto
          </p>
          <ul className='flex flex-col gap-2'>
            {product.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label='Legal' className='flex flex-col gap-3'>
          <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
            Legal
          </p>
          <ul className='flex flex-col gap-2'>
            {legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='mx-auto w-full max-w-6xl px-4 md:px-6'>
        <div className='text-muted-foreground border-border flex flex-col gap-3 border-t py-5 text-xs sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {new Date().getFullYear()} Pastoral Mariana. Todos los derechos
            reservados.
          </p>
          <div className='flex items-center gap-4'>
            <p>
              Desarrollado por{' '}
              <a
                href='https://jpxoi.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-foreground underline-offset-4 hover:underline'
              >
                Jean Paul Fernandez
                <span className='sr-only'> (se abre en una nueva pestaña)</span>
              </a>
            </p>
            <Link
              href='https://instagram.com/pastoralmarianaps'
              className='text-muted-foreground hover:text-foreground'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconBrandInstagram className='h-4 w-4' />
              <span className='sr-only'>Instagram de Pastoral Mariana</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
