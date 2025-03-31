import {
  SelectAttendance,
  SelectEvent,
  SelectLocation,
  SelectUser,
} from '@/db/schema'

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

export interface FetchAttendancePropsWithEvent extends SelectAttendance {
  user: SelectUser
  event: SelectEvent
}

export interface FetchEventProps extends SelectEvent {
  location: SelectLocation
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
