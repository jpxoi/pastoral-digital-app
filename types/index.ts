import {
  SelectAttendance,
  SelectEvent,
  SelectLocation,
  SelectSundayMass,
  SelectUser,
} from '@/db/schema'

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

export enum SundayMassStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum AttendanceStatus {
  A_TIEMPO = 'on-time',
  TARDANZA = 'late',
  FALTA_JUSTIFICADA = 'excused-absence',
  TARDANZA_JUSTIFICADA = 'excused-late',
  FALTA_INJUSTIFICADA = 'unexcused-absence',
}

export enum UserRole {
  MEMBER = 'member',
  ADMIN = 'admin',
  SCANNER = 'scanner',
  TEACHER = 'teacher',
  COORDINATOR = 'coordinator',
  MASS_MANAGER = 'mass_manager',
}

export function parseUserRole(role: unknown): UserRole | null {
  if (typeof role !== 'string') return null

  return Object.values(UserRole).includes(role as UserRole)
    ? (role as UserRole)
    : null
}

export enum UserCategory {
  STUDENT = 'student',
  ALUMNI = 'alumni',
  TEACHER = 'teacher',
}

export enum AttendanceRecordMethod {
  MANUAL = 'manual',
  QR = 'qr',
  NFC = 'nfc',
}
