import { ReturnIcon } from '@/components/icons/icons16'
import RecoverAccountPrompt from '@/components/recover/recoverAccountPrompt'
import RecoverAccountPromptSkeleton from '@/components/recover/recoverAccountPromptSkeleton'
import Link from 'next/link'
import { Suspense } from 'react'

export default function RecoverAccountScreen() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center bg-white bg-[url(/graphics/narrow-wave.svg)] bg-cover bg-center px-8 sm:bg-[url(/graphics/wide-wave.svg)] md:px-0'>
      <div className='flex flex-col items-center gap-2'>
        <Link
          href='/'
          className='flex flex-row items-center justify-start self-start rounded-md px-2 py-1.5 text-white transition-colors duration-200 hover:bg-white/20'
        >
          <ReturnIcon />
          Volver
        </Link>
        <div className='flex w-full max-w-md flex-col items-center gap-4 rounded-xl bg-white p-6 md:p-8'>
          <h1 className='text-center text-2xl font-medium'>Activar Cuenta</h1>
          <p className='text-center text-sm'>
            Ingresa el correo electrónico asociado a tu cuenta de Pastoral
            Digital para activarla.
          </p>
          <Suspense fallback={<RecoverAccountPromptSkeleton />}>
            <RecoverAccountPrompt />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
