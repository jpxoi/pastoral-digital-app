import { FooterNarrow } from '@/components/shared/footer'
import WelcomeScreen from '@/components/home/welcomeScreen'

export default async function Home() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-white bg-none bg-cover bg-center sm:bg-[url(/graphics/wide-wave.svg)]'>
      <WelcomeScreen />
      <footer className='mt-4 hidden sm:block'>
        <FooterNarrow />
      </footer>
    </main>
  )
}
