import Link from 'next/link'
import { PastoralSignature } from '@/components/shared/pastoral-signature'
import { Button } from '@/components/ui/button'

const nav = [
  { href: '/#la-app', label: 'La app' },
  { href: '/#preguntas', label: 'Preguntas' },
] as const

export function SiteHeader({
  variant = 'marketing',
}: {
  variant?: 'marketing' | 'legal'
}) {
  const home = variant === 'legal' ? '/' : '/#contenido'

  return (
    <header className='border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md print:hidden'>
      <div className='mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 md:px-6'>
        <Link
          href={home}
          aria-label='Pastoral Digital, ir al inicio'
          className='focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none'
        >
          <PastoralSignature
            variant='dark'
            sizes='96px'
            className='h-8 w-auto object-contain'
          />
        </Link>
        {variant === 'marketing' ? (
          <nav
            aria-label='Secciones'
            className='ml-4 hidden items-center gap-5 md:flex'
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <nav
            aria-label='Documentos'
            className='ml-4 hidden items-center gap-5 md:flex'
          >
            <Link
              href='/terms'
              className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
            >
              Términos
            </Link>
            <Link
              href='/privacy'
              className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
            >
              Privacidad
            </Link>
          </nav>
        )}
        <div className='ml-auto'>
          <Button size='sm' asChild>
            <Link href='/sign-in'>Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
