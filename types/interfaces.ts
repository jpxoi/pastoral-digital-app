import { Session } from '@auth0/nextjs-auth0'
import { Dispatch, SetStateAction } from 'react'

export interface UserInfoProps {
  avatarURL: string | null
  fallbackAvatar: string | null
  userID: string | null
  userToken: string | null
  userCustomAvatar: boolean
}

export interface AttendanceContextProps {
  data: never[]
  loading: boolean
  error: string | null
  refreshButtonText: string
  refreshTable: () => void
}

export interface TableRow {
  row: {
    [key: string]: string
  }
}

export interface StatusLabel {
  status: string
}

export interface UserMenuContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  userSession: Session['user']
  userInfo: UserInfoProps
}
