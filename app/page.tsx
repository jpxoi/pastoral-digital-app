import Background from '@/components/shared/background'
import WelcomeScreen from '@/components/home/welcomeScreen'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const { userId } = await auth()
  if (userId) redirect('/dashboard')

  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-center'>
      <Background />
      <WelcomeScreen />
    </main>
  )
}
