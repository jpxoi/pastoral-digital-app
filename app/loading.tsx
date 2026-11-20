import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-center'>
      <Spinner className='text-primary size-10' />
    </main>
  )
}
