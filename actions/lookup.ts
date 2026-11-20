'use server'

import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

const dniDataSchema = z.object({
  numero: z.string().regex(/^[0-9]{8}$/),
  nombres: z.string().trim().min(1),
  apellido_paterno: z.string().trim().min(1),
  apellido_materno: z.string().trim().optional(),
  nombre_completo: z.string().optional(),
})
const lookupResponseSchema = z.discriminatedUnion('success', [
  z.object({ success: z.literal(true), data: dniDataSchema }),
  z.object({ success: z.literal(false), message: z.string().optional() }),
])

const endpoint = 'https://api.json.pe/api/dni'
const token = process.env.JSONPE_API_KEY

function toTitleCase(str: string): string {
  if (!str) return str
  return str
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function lookupDni(dni: string) {
  const { userId } = await auth()
  if (!userId)
    return { success: false, error: 'Inicia sesión para consultar tu DNI.' }

  if (typeof dni !== 'string' || !/^[0-9]{8}$/.test(dni)) {
    return {
      success: false,
      error: 'DNI inválido',
    }
  }

  if (!token) {
    return {
      success: false,
      error: 'Token de API no configurado',
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dni }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    })

    if (response.status === 404)
      return { success: false, error: 'No se encontró el DNI consultado.' }
    if (!response.ok)
      return {
        success: false,
        error:
          'El servicio de consulta no está disponible. Inténtalo más tarde.',
      }

    const parsed = lookupResponseSchema.safeParse(await response.json())
    if (!parsed.success)
      return {
        success: false,
        error: 'El servicio devolvió una respuesta inválida.',
      }
    if (!parsed.data.success)
      return { success: false, error: 'No se pudo validar el DNI consultado.' }
    const data = parsed.data.data
    if (data.numero !== dni)
      return {
        success: false,
        error: 'Los datos recibidos no corresponden al DNI consultado.',
      }

    const firstName = toTitleCase(data.nombres)
    const firstLastName = toTitleCase(data.apellido_paterno)
    const secondLastName = toTitleCase(data.apellido_materno ?? '')
    const fullName = toTitleCase(data.nombre_completo ?? '')
    const lastName = [firstLastName, secondLastName].filter(Boolean).join(' ')

    return {
      success: true,
      data: {
        firstName,
        lastName,
        firstLastName,
        secondLastName,
        fullName,
        documentNumber: data.numero,
      },
    }
  } catch {
    return {
      success: false,
      error:
        'No se pudo consultar el DNI. Puedes ingresar tus datos manualmente.',
    }
  }
}
