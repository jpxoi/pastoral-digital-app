import Background from '@/components/shared/background'
import { SpinnerLight } from '@/components/shared/spinner'

export default function Loading() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center px-8 md:px-0'>
      <Background />
      <SpinnerLight />
    </main>
  )
}
