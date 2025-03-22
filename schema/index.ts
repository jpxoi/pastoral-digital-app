import { z } from 'zod'

export const onboardingFormSchema = z.object({
  id: z.string().trim().nonempty('El ID es requerido para crear un usuario'),
  firstName: z
    .string()
    .nonempty('El nombre es requerido para crear un usuario.'),
  lastName: z
    .string()
    .nonempty('El apellido es requerido para crear un usuario.'),
  nickname: z.string().optional(),
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
    .transform(val => val.replace(/\D/g, '')), // Strip non-digits for consistent storage
  dateOfBirth: z
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
    }, 'El usuario debe tener al menos 14 años de edad para registrarse'),
  category: z.enum(['student', 'alumni'], {
    errorMap: () => ({ message: "La categoría debe ser 'student' o 'alumni'" }),
  }),
  studentCode: z
    .string()
    .optional()
    .refine(
      (code) => !code || /^S5[A-H]\d{2}$/.test(code),
      'El código de estudiante debe seguir el formato del colegio. (Ej. S5A01)'
    ),
  role: z.enum(['member', 'admin']).default('member'),
})
