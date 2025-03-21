import Spinner from '@/components/shared/spinner'

export default function Loading() {
  return (
    <main className='flex h-screen w-full flex-1 flex-col items-center justify-center rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10'>
      <Spinner />
    </main>
  )
}
