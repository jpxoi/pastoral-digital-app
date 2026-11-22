import { AttendanceStatus, UserCategory, UserRole } from '@/types'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'
import { normalizeStudentCode } from '@/lib/student-code'

const onboardingDateSchema = z
  .string()
  .transform((value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? value.split('-').reverse().join('/')
      : value
  )
  .pipe(
    z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Ingresa tu fecha como DD/MM/AAAA.')
  )
  .refine((value) => {
    const [day, month, year] = value.split('/').map(Number)
    const date = new Date(year, month - 1, day)

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    )
  }, 'Ingresa una fecha válida.')
  .transform((value) => {
    const [day, month, year] = value.split('/')
    return `${year}-${month}-${day}`
  })

export const OnboardingFormSchema = z
  .object({
    id: z.string().trim().nonempty('El ID es requerido para crear un usuario'),
    dni: z
      .string()
      .trim()
      .nullable()
      .transform((value) => value || null),
    firstName: z
      .string()
      .trim()
      .nonempty('El nombre es requerido para crear un usuario.')
      .transform((val) => val.trim()),
    lastName: z
      .string()
      .trim()
      .nonempty('El apellido es requerido para crear un usuario.')
      .transform((val) => val.trim()),
    email: z.email('Correo electrónico inválido'),
    phoneNumber: z
      .string()
      .refine(isValidPhoneNumber, 'Número de teléfono inválido'),
    dateOfBirth: onboardingDateSchema,
    category: z.enum(
      [UserCategory.STUDENT, UserCategory.ALUMNI, UserCategory.TEACHER],
      {
        error: () => ({
          message: 'Debes seleccionar tu vínculo con la institución',
        }),
      }
    ),
    studentCode: z.string().transform(normalizeStudentCode).nullish(),
    role: z.literal(UserRole.MEMBER).default(UserRole.MEMBER),
  })
  .superRefine((values, context) => {
    if (values.dni && !/^\d{8}$/.test(values.dni)) {
      context.addIssue({
        code: 'custom',
        path: ['dni'],
        message: 'El DNI debe tener 8 dígitos.',
      })
    }

    const studentCode = values.studentCode?.trim() ?? ''
    if (
      values.category === UserCategory.STUDENT &&
      !/^(?:P6|S[1-5])[A-H](?:0[1-9]|[1-3]\d|40)$/.test(studentCode)
    ) {
      context.addIssue({
        code: 'custom',
        path: ['studentCode'],
        message: 'Usa el formato de código de estudiante, por ejemplo S5B01.',
      })
    }

    const minimumAge = {
      [UserCategory.STUDENT]: 13,
      [UserCategory.ALUMNI]: 16,
      [UserCategory.TEACHER]: 18,
    }[values.category]
    const today = new Date()
    const earliestBirthDate = new Date(
      today.getFullYear() - minimumAge,
      today.getMonth(),
      today.getDate()
    )

    if (
      values.dateOfBirth >
      `${earliestBirthDate.getFullYear()}-${String(earliestBirthDate.getMonth() + 1).padStart(2, '0')}-${String(earliestBirthDate.getDate()).padStart(2, '0')}`
    ) {
      context.addIssue({
        code: 'custom',
        path: ['dateOfBirth'],
        message: `Debes tener al menos ${minimumAge} años para registrarte como ${values.category === UserCategory.TEACHER ? 'docente' : values.category === UserCategory.ALUMNI ? 'exalumno' : 'alumno'}.`,
      })
    }
  })
  .transform((values) => ({
    ...values,
    studentCode:
      values.category === UserCategory.STUDENT
        ? values.studentCode?.trim() || null
        : null,
  }))

export const NewAttendanceRecordFormSchema = z.object({
  userId: z.string().nonempty('El ID de usuario es requerido'),
  status: z.enum(AttendanceStatus, {
    error: () => ({
      message: 'Debes seleccionar un estado para el registro',
    }),
  }),
})

export const NewSundayMassFormSchema = z.object({
  parish: z
    .string()
    .trim()
    .nonempty('Ingresa el nombre de la parroquia.')
    .min(3, 'Ingresa al menos 3 caracteres.')
    .max(45, 'El nombre de la parroquia debe tener como máximo 45 caracteres.')
    .transform((val) => val.trim()),
  evidenceFileKey: z
    .string()
    .trim()
    .nonempty('Adjunta una imagen como evidencia de tu asistencia a misa.'),
})

const localDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ingresa una fecha válida.')
  .refine((value) => {
    const [year, month, day] = value.split('-').map(Number)
    const normalized = new Date(Date.UTC(year, month - 1, day))

    return (
      normalized.getUTCFullYear() === year &&
      normalized.getUTCMonth() === month - 1 &&
      normalized.getUTCDate() === day
    )
  }, 'Ingresa una fecha válida.')

const localTimeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Ingresa una hora válida.')

const EventScheduleSchema = z
  .object({
    firstTurnDate: localDateSchema,
    firstTurnTime: localTimeSchema,
    secondTurnDate: z.union([z.literal(''), localDateSchema]),
    secondTurnTime: z.union([z.literal(''), localTimeSchema]),
    endDate: localDateSchema,
    endTime: localTimeSchema,
  })
  .superRefine((values, context) => {
    const hasSecondTurnDate = values.secondTurnDate.length > 0
    const hasSecondTurnTime = values.secondTurnTime.length > 0

    if (hasSecondTurnDate !== hasSecondTurnTime) {
      const missingField = hasSecondTurnDate
        ? 'secondTurnTime'
        : 'secondTurnDate'
      context.addIssue({
        code: 'custom',
        path: [missingField],
        message:
          'Completa la fecha y la hora del segundo turno, o déjalas vacías.',
      })
    }

    const firstTurnDateTime = `${values.firstTurnDate}T${values.firstTurnTime}`
    const secondTurnDateTime =
      hasSecondTurnDate && hasSecondTurnTime
        ? `${values.secondTurnDate}T${values.secondTurnTime}`
        : firstTurnDateTime
    const endDateTime = `${values.endDate}T${values.endTime}`

    if (secondTurnDateTime < firstTurnDateTime) {
      context.addIssue({
        code: 'custom',
        path: ['secondTurnDate'],
        message: 'El segundo turno no puede ser anterior al primero.',
      })
    }

    if (endDateTime < secondTurnDateTime) {
      context.addIssue({
        code: 'custom',
        path: ['endTime'],
        message: 'El fin debe ser posterior o igual al último turno.',
      })
    }
  })

export const NewEventFormSchema = EventScheduleSchema.safeExtend({
  name: z.string().trim().min(1, 'El nombre del evento es obligatorio.'),
  description: z.string().trim(),
  locationId: z.uuid('Selecciona una ubicación válida.'),
})

export const UpdateEventFormSchema = EventScheduleSchema.safeExtend({
  id: z.uuid(),
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5000),
})
