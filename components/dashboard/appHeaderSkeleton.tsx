import Link from 'next/link'
import { UserAvatarSkeleton } from '@/components/user/userAvatarSkeleton'

export default async function AppHeaderSkeleton() {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-center bg-[#07309B] px-4 py-4 shadow-md'>
      <nav className='flex w-screen max-w-screen-xl items-center justify-between'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <h1 className='text-xl font-bold text-white sm:text-2xl'>
            Pastoral Digital
          </h1>
        </Link>
        <div className='flex items-center justify-between'>
          <div
            id='avatar'
            className='flex h-8 w-8 cursor-pointer items-center sm:h-10 sm:w-10'
          >
            <UserAvatarSkeleton />
          </div>
        </div>
      </nav>
    </header>
  )
}
