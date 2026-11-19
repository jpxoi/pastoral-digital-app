import { AttendanceStatus, UserCategory, UserRole } from '@/types'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

export const OnboardingFormSchema = z.object({
  id: z.string().trim().nonempty('El ID es requerido para crear un usuario'),
  dni: z
    .string()
    .trim()
    .nonempty('El DNI es requerido para crear un usuario.')
    .refine(
      (val) => val.length === 8 && /^[0-9]+$/.test(val),
      'El DNI proporcionado es inválido'
    ),
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
  email: z.string().email('Correo electrónico inválido'),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, 'Número de teléfono inválido'),
  dateOfBirth: z
    .date({
      error: () => ({ message: 'La fecha de nacimiento es requerida' }),
    })
    .refine((val) => {
      const today = new Date()
      const minAge = new Date(
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate()
      )
      return val < today && val <= minAge
    }, 'Debes tener al menos 13 años de edad para registrarte'),
  category: z.enum(
    [UserCategory.STUDENT, UserCategory.ALUMNI, UserCategory.TEACHER],
    {
      error: () => ({
        message: 'Debes seleccionar tu vínculo con la institución',
      }),
    }
  ),
  studentCode: z
    .string()
    .length(5, 'El código de estudiante debe tener 5 caracteres')
    .optional()
    .refine(
      (code) => !code || /^[SP][156][A-H]\d{2}$/.test(code),
      'El código de estudiante debe seguir el formato del colegio. (Ej. S5A01)'
    ),
  role: z.enum([UserRole.ADMIN, UserRole.MEMBER]),
})

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
    .min(3, 'El nombre de la parroquia debe tener al menos 3 caracteres')
    .max(45, 'El nombre de la parroquia no puede exceder los 45 caracteres')
    .nonempty('El nombre de la parroquia es requerido')
    .transform((val) => val.trim()),
  evidenceFileKey: z
    .string()
    .trim()
    .nonempty('La evidencia de asistencia es requerida'),
  evidenceFileHash: z
    .string()
    .trim()
    .nonempty('El hash del archivo es requerido'),
})

const localDateTimeSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'Ingresa una fecha y hora válidas.')
  .refine((value) => {
    const [date, time] = value.split('T')
    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes] = time.split(':').map(Number)
    const normalized = new Date(Date.UTC(year, month - 1, day, hours, minutes))

    return (
      normalized.getUTCFullYear() === year &&
      normalized.getUTCMonth() === month - 1 &&
      normalized.getUTCDate() === day &&
      normalized.getUTCHours() === hours &&
      normalized.getUTCMinutes() === minutes
    )
  }, 'Ingresa una fecha y hora válidas.')

export const NewEventFormSchema = z
  .object({
    name: z.string().trim().min(1, 'El nombre del evento es obligatorio.'),
    description: z.string().trim(),
    firstTurnDate: localDateTimeSchema,
    secondTurnDate: z.union([z.literal(''), localDateTimeSchema]),
    endDate: localDateTimeSchema,
    locationId: z.string().min(1, 'Selecciona una ubicación.'),
  })
  .superRefine((values, context) => {
    const secondTurnDate = values.secondTurnDate || values.firstTurnDate

    if (secondTurnDate < values.firstTurnDate) {
      context.addIssue({
        code: 'custom',
        path: ['secondTurnDate'],
        message: 'El segundo turno no puede ser anterior al primero.',
      })
    }

    if (values.endDate < secondTurnDate) {
      context.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'El fin debe ser posterior o igual al último turno.',
      })
    }
  })
