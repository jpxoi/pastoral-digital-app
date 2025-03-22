import Loading from '@/app/loading'
import Background from '@/components/shared/background'
import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-center p-4'>
      <Background />
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
      <ClerkLoaded>
        <div className='overflow-y-scroll rounded-xl'>
          <SignUp />
        </div>
      </ClerkLoaded>
    </main>
  )
}
