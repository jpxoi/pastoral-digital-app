import Image from 'next/image'
import { MainFooter } from '@/components/shared/footer'
import { LogoImageWide } from '@/components/shared/logoImage'
import { CheckCircle } from 'lucide-react'
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs'
import Background from '@/components/shared/background'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      {/* Header */}
      <header className='sticky top-0 z-50 flex w-full items-center justify-center bg-white backdrop-blur'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <LogoImageWide width={100} />
          </div>
          <div className='flex items-center gap-4'>
            <Link
              href='/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fhome%23contact'
              className='cursor-pointer text-sm font-medium text-blue-900 underline-offset-4 hover:underline'
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='flex w-screen items-center justify-center bg-primary px-8 py-12 text-white md:py-24 lg:py-32 xl:py-48'>
          <Background />
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Productividad y Colaboración para Catequistas
                  </h1>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                    Nuestra plataforma ofrece un conjunto completo de
                    herramientas para ayudarte en las actividades de la
                    Pastoral.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <ClerkLoading>
                    <div className='h-[3.125rem] w-full animate-pulse rounded-md bg-gray-200'></div>
                    <div className='h-[3.125rem] w-full animate-pulse rounded-md bg-gray-200'></div>
                  </ClerkLoading>
                  <ClerkLoaded>
                    <SignUpButton>
                      <button className='w-full cursor-pointer rounded-md border border-gray-300 p-3 text-white transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50'>
                        Registrarse
                      </button>
                    </SignUpButton>
                    <SignInButton>
                      <button className='w-full cursor-pointer rounded-md border border-white bg-white p-3 text-blue-500 transition-colors duration-200 hover:border-gray-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'>
                        Iniciar sesión
                      </button>
                    </SignInButton>
                  </ClerkLoaded>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Image
                  src='/screenshots/mobile-1.png'
                  width={550}
                  height={550}
                  alt='Hero Image'
                  className='rounded-lg object-cover'
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id='features'
          className='flex w-full items-center justify-center bg-muted py-12 md:py-24 lg:py-32'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground'>
                  Características
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Todo lo que necesitas en un solo lugar
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Nuestra plataforma ofrece un conjunto completo de herramientas
                  para ayudarte en las actividades de la Pastoral.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3'>
              {/* Feature 1 */}
              <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm'>
                <div className='rounded-full bg-primary/10 p-3'>
                  <CheckCircle className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-bold'>Pastoral Digital ID</h3>
                <p className='text-center text-muted-foreground'>
                  Tu identidad digital para acceder y verificar tu identidad en
                  los eventos de la Pastoral.
                </p>
              </div>

              {/* Feature 2 */}
              <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm'>
                <div className='rounded-full bg-primary/10 p-3'>
                  <CheckCircle className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-bold'>Registro de Asistencias</h3>
                <p className='text-center text-muted-foreground'>
                  Detalles de los eventos a los que has asistido y los que están
                  por venir.
                </p>
              </div>

              {/* Feature 3 */}
              <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm'>
                <div className='rounded-full bg-primary/10 p-3'>
                  <CheckCircle className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-bold'>
                  Justificación de Inasistencias
                </h3>
                <p className='text-center text-muted-foreground'>
                  Si no puedes asistir a un evento, puedes justificar tu
                  inasistencia y enviarla a los organizadores desde la
                  plataforma.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  )
}
