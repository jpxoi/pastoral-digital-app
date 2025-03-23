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

export enum AttendanceStatus {
  A_TIEMPO = 'A TIEMPO',
  TARDANZA = 'TARDANZA',
  DOBLE_TARDANZA = 'DOBLE TARDANZA',
  FALTA_JUSTIFICADA = 'FALTA JUSTIFICADA',
  TARDANZA_JUSTIFICADA = 'TARDANZA JUSTIFICADA',
  FALTA_INJUSTIFICADA = 'FALTA INJUSTIFICADA',
}

export enum UserRole {
  MEMBER = 'member',
  ADMIN = 'admin',
}

export enum UserCategory {
  STUDENT = 'student',
  ALUMNI = 'alumni',
  TEACHER = 'teacher',
}
