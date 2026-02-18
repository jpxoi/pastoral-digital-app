'use client'

import Image from 'next/image'
import { MainFooter } from '@/components/shared/footer'
import { LogoImageWide } from '@/components/shared/logoImage'
import { ClerkLoaded, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'
import {
  IconId,
  IconCalendarEvent,
  IconUserExclamation,
  IconArrowRight,
} from '@tabler/icons-react'
import { motion } from 'motion/react'

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <main className='h-screen overflow-y-scroll scroll-smooth'>
      <div className='flex min-h-screen flex-col bg-slate-50'>
        {/* Header */}
        <header className='sticky top-0 z-50 flex w-full items-center justify-center border-b border-white/20 bg-white/80 backdrop-blur-md'>
          <div className='container flex h-16 items-center justify-between px-4 md:px-6'>
            <div className='flex items-center gap-2'>
              <LogoImageWide variant='dark' className='max-h-10 w-auto' />
            </div>
            <nav className='hidden items-center gap-6 md:flex'>
              <Link
                href='#features'
                className='text-sm font-medium text-slate-600 transition-colors hover:text-blue-900'
              >
                Características
              </Link>
            </nav>
            <div className='flex items-center gap-4'>
              <Link
                href='/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fhome%23contact'
                className='group flex items-center gap-1 text-sm font-medium text-blue-900 transition-colors hover:text-blue-700'
              >
                Ingresar
                <IconArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </div>
          </div>
        </header>

        <div className='flex-1'>
          {/* Hero Section */}
          <section className='relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden py-12 md:py-24 lg:py-32'>
            <div className='pointer-events-none absolute inset-0 bg-linear-to-b from-blue-900/10 to-transparent' />

            <div className='relative z-10 container px-4 md:px-6'>
              <div className='grid gap-12 lg:grid-cols-2 lg:gap-8'>
                <motion.div
                  className='flex flex-col justify-center space-y-8'
                  initial='hidden'
                  animate='visible'
                  variants={containerVariants}
                >
                  <motion.div
                    className='flex flex-col items-center gap-4'
                    variants={itemVariants}
                  >
                    <div className='inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 backdrop-blur-sm'>
                      <span className='mr-2 flex h-2 w-2 rounded-full bg-blue-600'></span>
                      Pastoral Digital 2.0
                    </div>
                    <h1 className='text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl xl:text-6xl'>
                      Gestión Pastoral{' '}
                      <span className='text-primary'>Integrada</span> y{' '}
                      <span className='text-primary'>Eficiente</span>
                    </h1>
                    <p className='max-w-[600px] text-center text-lg text-slate-600 md:text-xl'>
                      Simplifica la coordinación, asistencia identidad digital
                      de tu comunidad pastoral con nuestra plataforma todo en
                      uno.
                    </p>
                  </motion.div>

                  <motion.div
                    className='flex flex-col items-center justify-center gap-3 min-[400px]:flex-row'
                    variants={itemVariants}
                  >
                    <SignUpButton>
                      <button className='shadow-primary/20 bg-primary hover:bg-primary/90 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg px-8 text-base font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 sm:w-auto'>
                        Comenzar ahora
                      </button>
                    </SignUpButton>
                    <SignInButton>
                      <button className='flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-base font-medium text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:text-blue-600 sm:w-auto'>
                        Ya tengo cuenta
                      </button>
                    </SignInButton>
                  </motion.div>
                </motion.div>

                <motion.div
                  className='relative flex items-center justify-center lg:justify-end'
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className='relative z-10 w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px]'>
                    <div className='absolute -inset-1 rotate-6 transform rounded-[2.5rem] bg-linear-to-r from-blue-600 to-cyan-400 opacity-30 blur-2xl'></div>
                    <Image
                      src='/screenshots/mobile-1.png'
                      width={400}
                      height={850}
                      alt='App Screenshot'
                      className='relative z-10 mx-auto rounded-4xl border-8 border-white shadow-2xl'
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section
            id='features'
            className='relative mx-auto w-full bg-white py-20 md:py-32'
          >
            <div className='absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent' />
            <div className='container mx-auto px-4 md:px-6'>
              <div className='mb-16 flex flex-col items-center justify-center space-y-4 text-center'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className='mb-4 inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900'>
                    Características Principales
                  </div>
                  <h2 className='text-3xl font-bold tracking-tighter text-slate-900 md:text-5xl'>
                    Todo lo que necesitas en un solo lugar
                  </h2>
                  <p className='mt-4 max-w-[700px] text-lg text-slate-600 md:text-xl'>
                    Herramientas diseñadas específicamente para optimizar la
                    gestión pastoral y mejorar la experiencia de cada miembro.
                  </p>
                </motion.div>
              </div>

              <div className='mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3'>
                <FeatureCard
                  icon={<IconId className='h-8 w-8' />}
                  title='Pastoral Digital ID'
                  description='Tu identidad digital segura para acceder y verificar tu participación en todos los eventos de la Pastoral.'
                  variant='blue'
                  delay={0.1}
                />
                <FeatureCard
                  icon={<IconCalendarEvent className='h-8 w-8' />}
                  title='Registro de Asistencias'
                  description='Un historial detallado y transparente de tu participación. Visualiza eventos pasados y futuros con facilidad.'
                  variant='indigo'
                  delay={0.2}
                />
                <FeatureCard
                  icon={<IconUserExclamation className='h-8 w-8' />}
                  title='Gestión de Justificaciones'
                  description='Herramienta intuitiva para reportar inasistencias. Mantén a los organizadores informados sin complicaciones.'
                  variant='cyan'
                  delay={0.3}
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className='bg-primary/5 mx-auto py-20 md:py-32'>
            <div className='container mx-auto px-4 md:px-6'>
              <div className='relative overflow-hidden rounded-3xl bg-blue-900 px-6 py-20 shadow-2xl sm:px-12 sm:py-24 md:px-16'>
                <div className='absolute inset-0'>
                  <div className='absolute inset-0 bg-blue-900/90 mix-blend-multiply' />
                  <div className='absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl' />
                  <div className='absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl' />
                </div>
                <div className='relative z-10 flex flex-col items-center text-center'>
                  <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl'>
                    ¿Listo para transformar tu experiencia pastoral?
                  </h2>
                  <p className='mx-auto mt-6 max-w-xl text-lg text-blue-100'>
                    Únete hoy mismo y descubre cómo la tecnología puede servir a
                    nuestra comunidad.
                  </p>
                  <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
                    <ClerkLoaded>
                      <SignUpButton>
                        <button className='group inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-blue-900 shadow-md transition-all hover:bg-blue-50'>
                          Registrarse Ahora
                          <IconArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </button>
                      </SignUpButton>
                    </ClerkLoaded>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <MainFooter />
      </div>
    </main>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  variant: 'blue' | 'indigo' | 'cyan'
  delay: number
}

function FeatureCard({
  icon,
  title,
  description,
  variant,
  delay,
}: FeatureCardProps) {
  const variants = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-500',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-500',
    },
    cyan: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-500',
    },
  }

  const { bg, text } = variants[variant]

  return (
    <motion.div
      className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-xl'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className={`mb-6 inline-flex rounded-xl p-3 ${bg} ${text} bg-opacity-10`}
      >
        <div className={text}>{icon}</div>
      </div>
      <h3 className='mb-3 text-xl font-bold text-slate-900'>{title}</h3>
      <p className='leading-relaxed text-slate-600'>{description}</p>
    </motion.div>
  )
}
