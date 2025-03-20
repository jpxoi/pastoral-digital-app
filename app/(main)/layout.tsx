import type { Metadata } from 'next'
import AppHeader from '@/components/header/appHeader'
import { Suspense } from 'react'
import AppHeaderSkeleton from '@/components/header/appHeaderSkeleton'
import { FooterWide } from '@/components/shared/footer'

export const metadata: Metadata = {
  title: 'Dashboard | Pastoral Digital App',
  description:
    'Pastoral Digital es una plataforma digital para uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppHeader />
      {children}
      <footer className='mt-8 pb-8 lg:pb-4'>
        <FooterWide />
      </footer>
    </>
  )
}
