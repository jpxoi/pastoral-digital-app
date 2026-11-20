import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <main className='flex w-full flex-col items-center justify-center bg-center max-md:h-full'>
      <Spinner className='text-primary size-10 md:text-white' />
    </main>
  )
}
