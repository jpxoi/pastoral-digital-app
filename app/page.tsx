import { FooterNarrow } from '@/components/shared/footer';
import WelcomeScreen from '@/components/home/welcomeScreen';

export default async function Home() {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center bg-white bg-none sm:bg-[url(/graphics/wide-wave.svg)] bg-cover bg-center">
      <WelcomeScreen />
      <footer className="hidden sm:block mt-4">
        <FooterNarrow />
      </footer>
    </main>
  );
}
