import { SpinnerLight } from '@/components/shared/spinner'

export default function Loading() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-[url(/graphics/narrow-wave.svg)] bg-cover bg-center px-8 sm:bg-[url(/graphics/wide-wave.svg)] md:px-0'>
      <SpinnerLight />
    </main>
  )
}
