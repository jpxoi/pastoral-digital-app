import Link from 'next/link'
import AppMenu from '@/components/header/appMenu'

export default async function AppHeaderSkeleton() {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-center bg-[#07309B] px-4 py-4 shadow-md'>
      <nav className='flex w-screen max-w-screen-xl items-center justify-between'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <h1 className='text-xl font-semibold text-white sm:text-2xl'>
            Pastoral Digital
          </h1>
        </Link>
        <div className='flex items-center gap-4'>
          <AppMenu />
          <div className='h-7 w-7 animate-pulse rounded-full bg-gray-100' />
        </div>
      </nav>
    </header>
  )
}
