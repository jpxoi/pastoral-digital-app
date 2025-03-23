import { UserCategory, UserRole } from '@/types'
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
        today.getFullYear() - 14,
        today.getMonth(),
        today.getDate()
      )
      return date <= minAge
    }, 'Debes tener al menos 14 años de edad para registrarte')
    .transform((date) => {
      return date.toISOString().split('T')[0]
    }),
  category: z.enum([UserCategory.STUDENT, UserCategory.ALUMNI, UserCategory.TEACHER], {
    errorMap: () => ({
      message: 'Debes seleccionar tu vínculo con la institución',
    }),
  }),
  studentCode: z
    .string()
    .optional()
    .refine(
      (code) => !code || /^S5[A-H]\d{2}$/.test(code),
      'El código de estudiante debe seguir el formato del colegio. (Ej. S5A01)'
    ),
  role: z.enum([UserRole.ADMIN, UserRole.MEMBER]).default(UserRole.MEMBER),
})
