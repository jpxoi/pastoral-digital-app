import { AttendanceStatus, UserCategory, UserRole } from '@/types'
import { z } from 'zod'

export const OnboardingFormSchema = z.object({
  id: z.string().trim().nonempty('El ID es requerido para crear un usuario'),
  firstName: z
    .string()
    .trim()
    .nonempty('El nombre es requerido para crear un usuario.'),
  lastName: z
    .string()
    .trim()
    .nonempty('El apellido es requerido para crear un usuario.'),
  nickname: z.string().trim().optional(),
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phoneNumber: z
    .string()
    .regex(
      /^(?:(?:\+|00)51|51)?[9]\d{8}$/,
      'Formato de número de teléfono peruano inválido. Debe ser un número móvil de 9 dígitos'
    )
    .transform((val) => val.replace(/\D/g, '')), // Strip non-digits for consistent storage
  dateOfBirth: z.coerce
    .date()
    .refine(
      (date) => date < new Date(),
      'La fecha de nacimiento no puede ser en el futuro'
    )
    .refine((date) => {
      const today = new Date()
      const minAge = new Date(
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate()
      )
      return date <= minAge
    }, 'Debes tener al menos 13 años de edad para registrarte')
    .transform((date) => {
      return date.toISOString().split('T')[0]
    }),
  category: z.enum(
    [UserCategory.STUDENT, UserCategory.ALUMNI, UserCategory.TEACHER],
    {
      errorMap: () => ({
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
  role: z.enum([UserRole.ADMIN, UserRole.MEMBER]).default(UserRole.MEMBER),
})

export const NewAttendanceRecordFormSchema = z.object({
  userId: z.string().nonempty('El ID de usuario es requerido'),
  status: z.nativeEnum(AttendanceStatus, {
    errorMap: () => ({
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
  evidenceUrl: z
    .string()
    .trim()
    .nonempty('La evidencia de asistencia es requerida')
    .url('La URL de la evidencia no es válida'),
})
