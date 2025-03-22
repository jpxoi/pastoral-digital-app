import { SelectAttendance, SelectUser } from '@/db/schema'

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

export interface FetchAttendanceProps extends SelectAttendance {
  user: SelectUser
}
