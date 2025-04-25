import { AttendanceStatus, UserCategory, UserSchedule } from '@/types'

import {
  IconBackpack,
  IconCalendarBolt,
  IconCalendarHeart,
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconClockHeart,
  IconClockX,
  IconCross,
  IconFlame,
  IconMoodKid,
  IconPackageExport,
  IconSchool,
  IconSchoolOff,
  IconUserStar,
} from '@tabler/icons-react'

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

export const UserScheduleFilterOptions = [
  {
    label: 'Tiempo Completo',
    value: UserSchedule.FULL_TIME,
    icon: IconCalendarBolt,
  },
  {
    label: 'Coordinador',
    value: UserSchedule.COORDINADOR,
    icon: IconUserStar,
  },
  {
    label: 'Primera Comunión',
    value: UserSchedule.PRIMERA_COMUNION,
    icon: IconCross,
  },
  {
    label: 'Confirmación',
    value: UserSchedule.CONFIRMACION,
    icon: IconFlame,
  },
  {
    label: 'Logística',
    value: UserSchedule.LOGISTICA,
    icon: IconPackageExport,
  },
  {
    label: 'Semilleros',
    value: UserSchedule.SEMILLEROS,
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
    label: 'DOBLE TARDANZA',
    value: AttendanceStatus.DOBLE_TARDANZA,
    icon: IconClockX,
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
