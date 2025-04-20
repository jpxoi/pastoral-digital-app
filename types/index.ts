import {
  SelectAttendance,
  SelectEvent,
  SelectLocation,
  SelectSundayMass,
  SelectUser,
} from '@/db/schema'

export interface TableRow {
  row: {
    [key: string]: string
  }
}

export interface FetchAttendanceProps extends SelectAttendance {
  user: SelectUser
  registeredByUser: SelectUser
}

export interface FetchAttendancePropsWithEvent extends SelectAttendance {
  user: SelectUser
  event: SelectEvent
  registeredByUser: SelectUser
}

export interface FetchEventProps extends SelectEvent {
  location: SelectLocation
}

export interface FetchMassesProps extends SelectSundayMass {
  user: SelectUser
  verifier: SelectUser | null
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
  MANAGER = 'manager',
}

export enum UserCategory {
  STUDENT = 'student',
  ALUMNI = 'alumni',
  TEACHER = 'teacher',
}

export enum UserSchedule {
  FULL_TIME = 'full-time',
  PRIMERA_COMUNION = 'primera-comunion',
  CONFIRMACION = 'confirmacion',
}

export enum AttendanceRecordMethod {
  MANUAL = 'manual',
  QR = 'qr',
  NFC = 'nfc',
}
