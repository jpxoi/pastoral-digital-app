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
    .min(7, 'El número de teléfono debe tener al menos 7 dígitos')
    .max(15, 'El número de teléfono no debe exceder 15 dígitos')
    .regex(/^\+?[0-9\s\-()]+$/, 'Formato de número de teléfono inválido')
    .refine(
      (val) => val.replace(/[\s\-()]/g, '').length >= 7,
      'El número debe contener al menos 7 dígitos'
    ),
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
