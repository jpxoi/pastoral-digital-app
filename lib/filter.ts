import { AttendanceStatus, UserCategory, UserRole } from '@/types'

import {
  IconBackpack,
  IconCalendarHeart,
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconClockHeart,
  IconCross,
  IconFlame,
  IconMoodKid,
  IconPackageExport,
  IconSchool,
  IconSchoolOff,
  IconUserStar,
  IconUser,
  IconShield,
  IconQrcode,
  IconUsers,
  IconCalendar,
} from '@tabler/icons-react'

export const UserRoleFilterOptions = [
  { label: 'Catequista', value: UserRole.MEMBER, icon: IconUser },
  {
    label: 'Responsable de asistencia',
    value: UserRole.SCANNER,
    icon: IconQrcode,
  },
  { label: 'Coordinador', value: UserRole.COORDINATOR, icon: IconUsers },
  { label: 'Docente', value: UserRole.TEACHER, icon: IconSchool },
  { label: 'Encargado de misas', value: UserRole.MANAGER, icon: IconCalendar },
  { label: 'Administrador', value: UserRole.ADMIN, icon: IconShield },
]

export const UserCategoryFilterOptions = [
  {
    label: 'Alumno',
    value: UserCategory.STUDENT,
    icon: IconBackpack,
  },
  {
    label: 'Exalumno',
    value: UserCategory.ALUMNI,
    icon: IconSchoolOff,
  },
  {
    label: 'Docente',
    value: UserCategory.TEACHER,
    icon: IconSchool,
  },
]

export const UserAssignmentFilterOptions = [
  {
    label: 'Coordinador',
    value: 'coordinator',
    icon: IconUserStar,
  },
  {
    label: 'Primera Comunión',
    value: 'communion',
    icon: IconCross,
  },
  {
    label: 'Confirmación',
    value: 'confirmation',
    icon: IconFlame,
  },
  {
    label: 'Logística',
    value: 'logistics',
    icon: IconPackageExport,
  },
  {
    label: 'Semilleros',
    value: 'semillero',
    icon: IconMoodKid,
  },
]

export const AttendanceStatusFilterOptions = [
  {
    label: 'A TIEMPO',
    value: AttendanceStatus.A_TIEMPO,
    icon: IconClockCheck,
  },
  {
    label: 'TARDANZA',
    value: AttendanceStatus.TARDANZA,
    icon: IconClockExclamation,
  },
  {
    label: 'FALTA JUSTIFICADA',
    value: AttendanceStatus.FALTA_JUSTIFICADA,
    icon: IconCalendarHeart,
  },
  {
    label: 'TARDANZA JUSTIFICADA',
    value: AttendanceStatus.TARDANZA_JUSTIFICADA,
    icon: IconClockHeart,
  },
  {
    label: 'FALTA NO JUSTIFICADA',
    value: AttendanceStatus.FALTA_INJUSTIFICADA,
    icon: IconCalendarX,
  },
]
