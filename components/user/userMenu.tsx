'use client'

import UserInfo from '@/components/user/userInfo'
import { UserAvatar } from '@/components/user/userAvatar'
import { useUserMenu } from '@/app/context/userMenuContext'
import UserMenuOptions from './userMenuOptions'
import { useEffect, useRef } from 'react'

export default function UserMenu() {
  const { setIsOpen, isOpen } = useUserMenu()
  const dropdown = useRef<HTMLDivElement>(null)
  const avatarImage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEvent = (event: MouseEvent | KeyboardEvent) => {
      if (
        (event instanceof MouseEvent && !dropdown.current?.contains(event.target as Node) && !avatarImage.current?.contains(event.target as Node)) ||
        (event instanceof KeyboardEvent && event.key === 'Escape')
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleEvent)
      document.addEventListener('keydown', handleEvent)
    }

    return () => {
      document.removeEventListener('mousedown', handleEvent)
      document.removeEventListener('keydown', handleEvent)
    }
  }, [isOpen, setIsOpen])

  return (
    <>
      <div className='flex items-center justify-between' ref={avatarImage}>
        <div
          id='avatar'
          className='flex h-8 w-8 cursor-pointer items-center sm:h-10 sm:w-10'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <UserAvatar />
        </div>
      </div>

      <div
        className={`absolute right-4 top-20 flex w-auto transform-gpu flex-col gap-6 rounded-2xl bg-[#e9eef6] p-3 pt-2 shadow-lg transition-all duration-300 xl:right-[5vw] 2xl:right-[10vw] ${isOpen ? '' : 'hidden'} z-50`}
        ref={dropdown}
      >
        <UserInfo />
        <UserMenuOptions />
      </div>
    </>
  )
}
