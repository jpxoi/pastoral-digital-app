import Background from '@/components/shared/background'
import WelcomeScreen from '@/components/home/welcomeScreen'
import RedirectToDashboard from '@/components/shared/redirectToDashboard'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-center'>
      <Background />
      <WelcomeScreen />
      <Suspense fallback={null}>
        <RedirectToDashboard />
      </Suspense>
    </main>
  )
}
