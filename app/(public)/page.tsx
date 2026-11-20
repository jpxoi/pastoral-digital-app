import type { Metadata } from 'next'
import { LandingPage } from '@/components/marketing/landing-page'

const title = 'Pastoral Digital App | Gestión pastoral para catequistas'

export const metadata: Metadata = {
  title: { absolute: title },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export default function Home() {
  return <LandingPage />
}
