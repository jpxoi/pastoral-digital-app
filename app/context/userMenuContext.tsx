'use client'

import { createContext, useContext, useState } from 'react'

const UserMenuContext = createContext<UserMenuContextProps>({
  isOpen: false,
  setIsOpen: () => {},
  userSession: {
    email: null,
    email_verified: false,
    family_name: null,
    given_name: null,
    locale: null,
    name: null,
    nickname: null,
    picture: null,
    sub: null,
    updated_at: null,
  },
  userInfo: {
    avatarURL: null,
    fallbackAvatar: null,
    userID: null,
    userToken: null,
    userCustomAvatar: false,
  },
})

export const useUserMenu = () => {
  return useContext(UserMenuContext)
}

import { ReactNode } from 'react'
import { UserInfoProps, UserMenuContextProps } from '../../types/interfaces'
import { Session } from '@auth0/nextjs-auth0'

export const UserMenuProvider = ({
  children,
  userSession,
  userInfo,
}: {
  children: ReactNode
  userSession: Session['user']
  userInfo: UserInfoProps
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <UserMenuContext.Provider
      value={{ isOpen, setIsOpen, userSession, userInfo }}
    >
      {children}
    </UserMenuContext.Provider>
  )
}
