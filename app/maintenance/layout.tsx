import { IconBarrierBlock } from '@tabler/icons-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='fixed inset-0 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-primary p-4 md:gap-6 md:p-8'>
      <div className='flex max-w-md flex-col items-center'>
        <div className='mb-6'>
          <IconBarrierBlock className='size-24 text-white' />
        </div>

        <h1 className='mb-4 text-4xl font-bold text-white drop-shadow-lg'>
          En Mantenimiento
        </h1>

        <div className='w-full rounded-xl bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/15'>
          <p className='text-center text-lg text-white'>
            La aplicación está en mantenimiento. Por favor, vuelve más tarde.
          </p>

          {children}
        </div>

        <div className='mt-8 text-sm text-white/70'>
          Gracias por su paciencia
        </div>
      </div>
    </main>
  )
}
