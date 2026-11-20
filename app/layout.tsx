import { Suspense } from 'react'
import { connection } from 'next/server'
import Loading from './loading'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'
import { esPE } from '@/lib/clerk/localizations/es-PE'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PwaServiceWorker from '@/components/shared/pwaServiceWorker'
import { splashScreens } from '@/lib/pwa/splash-screens'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://id.pastoralmarianaps.net.pe'),
  title: 'Pastoral Digital App',
  description:
    'Pastoral Digital es una plataforma digital para uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro',
  openGraph: {
    title: 'Pastoral Digital App',
    description:
      'Pastoral Digital es una plataforma digital para uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro',
    url: 'https://id.pastoralmarianaps.net.pe',
    siteName: 'Pastoral Digital App',
  },
  appleWebApp: {
    title: 'Pastoral Digital',
    capable: true,
    statusBarStyle: 'default',
    startupImage: splashScreens,
  },
  other: { 'apple-mobile-web-app-capable': 'yes' },
}

export const viewport: Viewport = {
  themeColor: '#07309B',
}

const clerkAppearance = {
  theme: shadcn,
}

// Keep session and clock-dependent UI request-bound; only DB queries opt into caching.
async function RequestContent({ children }: { children: React.ReactNode }) {
  await connection()
  return children
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es-PE' suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <ClerkProvider
          localization={esPE}
          appearance={{
            ...clerkAppearance,
            captcha: { language: 'es-es' },
          }}
        >
          <PwaServiceWorker />
          <Toaster
            className='text-left'
            position='top-right'
            theme='light'
            expand={true}
            richColors
          />
          <Analytics />
          <SpeedInsights />
          <div className='topbar' aria-hidden='true'></div>
          <div className='bottombar' aria-hidden='true'></div>
          <Suspense fallback={<Loading />}>
            <RequestContent>{children}</RequestContent>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  )
}
