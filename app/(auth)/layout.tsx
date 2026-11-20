import Background from '@/components/shared/background'
import { PastoralSignature } from '@/components/shared/pastoral-signature'
import './auth.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='bg-primary relative isolate flex h-dvh w-full flex-col items-center justify-between gap-4 max-md:overflow-hidden md:min-h-dvh md:gap-8 md:overflow-y-auto md:p-4'>
      <Background className='z-0 h-[38%] md:h-full' />
      <div className='relative z-10 flex shrink-0 items-center justify-center px-6 pt-6 pb-0 md:py-2'>
        <PastoralSignature
          variant='light'
          sizes='(min-width: 48rem) 160px, 176px'
          className='h-auto w-44 md:w-40'
        />
      </div>
      <div className='relative z-10 flex w-full flex-col items-center justify-between gap-6 max-md:min-h-0 max-md:flex-1 max-md:overflow-y-auto max-md:rounded-t-4xl max-md:bg-white max-md:px-6 max-md:pt-8 max-md:pb-8 md:justify-center'>
        {children}
        <p className='text-muted-foreground text-center text-xs md:hidden'>
          © 2026 Pastoral Digital
        </p>
      </div>
      <p className='relative z-10 hidden shrink-0 py-2 text-center text-xs text-white md:block'>
        © 2026 Pastoral Digital
      </p>
    </main>
  )
}
