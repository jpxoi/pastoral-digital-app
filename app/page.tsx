import { FooterNarrow } from '@/components/shared/footer'
import Background from '@/components/shared/background'
import WelcomeScreen from '@/components/home/welcomeScreen'

export default async function Home() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-center'>
      <Background />
      <WelcomeScreen />
    </main>
  )
}
