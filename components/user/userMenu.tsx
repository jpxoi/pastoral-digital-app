'use client'

import UserInfo from '@/components/user/userInfo'
import { UserAvatar } from '@/components/user/userAvatar'
import { useUserMenu } from '@/app/context/userMenuContext'
import UserMenuOptions from './userMenuOptions'

export default function UserMenu() {
  const { userInfo, setIsOpen, isOpen } = useUserMenu()

  return (
    <>
      <div className='flex items-center justify-between'>
        <div
          id='avatar'
          className='flex h-8 w-8 cursor-pointer items-center sm:h-10 sm:w-10'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <UserAvatar
            avatarURL={userInfo.avatarURL}
            fallbackAvatar={userInfo.fallbackAvatar as string}
          />
        </div>
      </div>

      <div
        className={`absolute right-4 top-20 flex w-auto transform-gpu flex-col gap-6 rounded-2xl bg-[#e9eef6] p-3 pt-2 shadow-lg transition-all duration-300 xl:right-[5vw] 2xl:right-[10vw] ${isOpen ? '' : 'hidden'} z-50`}
      >
        <UserInfo />
        <UserMenuOptions />
      </div>
    </>
  )
}
