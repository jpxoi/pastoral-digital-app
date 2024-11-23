import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { UserInfoProps } from '@/types/interfaces'
import { fetchUserInfoByEmail } from '@/utils/fetchUtils'
import AppMenu from '@/components/header/appMenu'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'

export default async function AppHeader() {
  const user = await currentUser()

  if (!user) {
    return (
      <header className='sticky top-0 z-50 flex items-center justify-center bg-[#07309B] px-4 py-4 shadow-md'>
        <p className='text-white'>Cargando...</p>
      </header>
    )
  }

  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email:
      typeof user.primaryEmailAddress === 'string'
        ? user.primaryEmailAddress
        : user.primaryEmailAddress?.emailAddress || '',
  })

  return (
    <header className='sticky top-0 z-50 flex items-center justify-center bg-[#07309B] px-4 py-4 shadow-md'>
      <nav className='flex w-screen max-w-screen-xl items-center justify-between'>
        <Link href='/dashboard' className='flex select-none items-center gap-2'>
          <h1 className='text-xl font-medium text-white sm:text-2xl'>
            Pastoral Digital
          </h1>
        </Link>
        <div className='flex items-center gap-4'>
          <AppMenu />
          <ClerkLoading>
            <div className='h-7 w-7 animate-pulse rounded-full bg-gray-100' />
          </ClerkLoading>
          <ClerkLoaded>
            <div className='flex min-h-7 min-w-7 items-center'>
              <UserButton />
            </div>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  )
}
