import Link from 'next/link'
import UserMenu from '@/components/user/userMenu'
import { getSession, Session } from '@auth0/nextjs-auth0'
import { UserInfoProps } from '@/types/interfaces'
import { fetchUserInfoByEmail } from '@/app/utils/fetchUtils'
import { UserMenuProvider } from '@/app/context/userMenuContext'

export default async function AppHeader() {
  const { user } = (await getSession()) as Session
  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email: user.email,
  })

  return (
    <header className='sticky top-0 z-50 flex items-center justify-center bg-[#07309B] px-4 py-4 shadow-md'>
      <nav className='flex w-screen max-w-screen-xl items-center justify-between'>
        <Link href='/dashboard' className='flex select-none items-center gap-2'>
          <h1 className='text-xl font-medium text-white sm:text-2xl'>
            Pastoral Digital
          </h1>
        </Link>
        <UserMenuProvider userSession={user} userInfo={userInfo}>
          <UserMenu />
        </UserMenuProvider>
      </nav>
    </header>
  )
}
