import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LandingFaq } from '@/components/marketing/landing-faq'
import { LandingProduct } from '@/components/marketing/landing-product'
import { LandingShowcase } from '@/components/marketing/landing-showcase'
import { SiteFooter } from '@/components/marketing/site-footer'
import { SiteHeader } from '@/components/marketing/site-header'
import '@/components/marketing/marketing.css'

export function LandingPage() {
  return (
    <div className='marketing-root'>
      <a
        href='#contenido'
        className='focus:bg-background focus:text-foreground sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:p-3'
      >
        Ir al contenido
      </a>
      <SiteHeader />
      <main id='contenido' tabIndex={-1} className='outline-none'>
        <section className='relative'>
          <div className='relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:py-24'>
            <div className='flex max-w-xl flex-col gap-6'>
              <p className='text-primary text-sm font-medium'>
                Pastoral Mariana · CEP Nuestra Señora del Perpetuo Socorro
              </p>
              <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
                Un carnet digital para quien sirve en la pastoral.
              </h1>
              <p className='text-foreground/70 text-base leading-relaxed text-pretty sm:text-lg'>
                Pastoral Digital es la plataforma interna de catequistas y
                coordinadores: identidad QR, registro de asistencias, misas y
                eventos.
              </p>
              <div className='flex flex-col gap-3 sm:flex-row'>
                <Button size='lg' className='h-11 px-5' asChild>
                  <Link href='/sign-up'>Crear cuenta</Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='h-11 px-5'
                  asChild
                >
                  <Link href='/sign-in'>Ya tengo cuenta</Link>
                </Button>
              </div>
            </div>
            <LandingShowcase />
          </div>
        </section>

        <LandingProduct />
        <LandingFaq />

        <section className='border-border border-t'>
          <div className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-6 md:py-20'>
            <div className='max-w-lg'>
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Si formas parte de la Pastoral Mariana, esta es tu plataforma.
              </h2>
              <p className='text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base'>
                Entra con tu cuenta antes de la próxima reunión y lleva tu
                Pastoral ID en el celular.
              </p>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <Button size='lg' className='h-11 px-5' asChild>
                <Link href='/sign-in'>Iniciar sesión</Link>
              </Button>
              <Button size='lg' variant='outline' className='h-11 px-5' asChild>
                <Link href='/sign-up'>Crear cuenta</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
