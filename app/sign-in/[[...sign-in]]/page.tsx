import Loading from '@/app/loading'
import Background from '@/components/shared/background'
import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-center p-4'>
      <Background />
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </main>
  )
}
