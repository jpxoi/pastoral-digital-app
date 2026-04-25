import Background from '@/components/shared/background'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-center'>
      <Background />
      <Spinner className='size-10 text-white' />
    </main>
  )
}
