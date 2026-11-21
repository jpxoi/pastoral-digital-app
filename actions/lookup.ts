'use server'

import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { db } from '@/db/drizzle'
import { usersTable } from '@/db/schema'
import { and, eq, ne } from 'drizzle-orm'
import { issueDniReceipt } from '@/lib/dni-receipt-server'
import {
  DNI_IN_USE_MESSAGE,
  type DniLookupResult,
  type DniReceiptData,
} from '@/lib/dni-receipt'

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

async function manualResult(
  userId: string,
  dni: string,
  reason: 'not_found' | 'unavailable',
  context: { status?: number; cause?: 'timeout' | 'network' }
): Promise<DniLookupResult> {
  const data: DniReceiptData = { source: 'manual', dni, reason }
  const receipt = await issueDniReceipt(userId, data)
  logger.warn('DNI lookup enabled manual entry', {
    userId,
    reason,
    ...context,
  })
  return {
    success: true,
    data,
    receipt,
    message:
      reason === 'not_found'
        ? 'No encontramos información para este DNI. Puedes ingresar tus nombres manualmente.'
        : 'No pudimos consultar tu DNI en este momento. Puedes ingresar tus nombres manualmente.',
  }
}

export async function lookupDni(dni: string): Promise<DniLookupResult> {
  const { userId } = await auth()
  if (!userId)
    return { success: false, error: 'Inicia sesión para consultar tu DNI.' }

  if (typeof dni !== 'string' || !/^[0-9]{8}$/.test(dni)) {
    return {
      success: false,
      error: 'DNI inválido',
    }
  }

  try {
    const existingUser = await db.query.usersTable.findFirst({
      columns: { id: true },
      where: and(eq(usersTable.dni, dni), ne(usersTable.id, userId)),
    })

    if (existingUser) {
      return {
        success: false,
        code: 'DNI_IN_USE' as const,
        error: DNI_IN_USE_MESSAGE,
      }
    }

    if (!token) {
      logger.error('DNI lookup API key is not configured', { userId })
      return {
        success: false,
        error: 'Token de API no configurado',
      }
    }

    let response: Response
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni }),
        cache: 'no-store',
        signal: AbortSignal.timeout(15_000),
      })
    } catch (error) {
      return await manualResult(userId, dni, 'unavailable', {
        cause:
          error instanceof Error && error.name === 'TimeoutError'
            ? 'timeout'
            : 'network',
      })
    }

    if (response.status === 404)
      return await manualResult(userId, dni, 'not_found', {
        status: response.status,
      })
    if (response.status === 429 || response.status >= 500)
      return await manualResult(userId, dni, 'unavailable', {
        status: response.status,
      })

    if (!response.ok) {
      logger.error('DNI lookup service request failed', {
        userId,
        status: response.status,
      })
      return {
        success: false,
        error: 'No se pudo consultar tu DNI. Inténtalo nuevamente.',
      }
    }

    const parsed = lookupResponseSchema.safeParse(await response.json())
    if (!parsed.success) {
      logger.error('DNI lookup service returned an invalid response', {
        userId,
      })
      return {
        success: false,
        error: 'El servicio devolvió una respuesta inválida.',
      }
    }
    if (!parsed.data.success)
      return { success: false, error: 'No se pudo validar el DNI consultado.' }
    const data = parsed.data.data
    if (data.numero !== dni) {
      logger.error('DNI lookup returned mismatched document data', { userId })
      return {
        success: false,
        error: 'Los datos recibidos no corresponden al DNI consultado.',
      }
    }

    const dataToSign: DniReceiptData = {
      source: 'jsonpe',
      dni: data.numero,
      firstName: toTitleCase(data.nombres),
      lastName: [data.apellido_paterno, data.apellido_materno ?? '']
        .filter(Boolean)
        .map(toTitleCase)
        .join(' '),
    }

    return {
      success: true,
      data: dataToSign,
      receipt: await issueDniReceipt(userId, dataToSign),
    }
  } catch (error) {
    logger.error('DNI lookup failed', {
      userId,
      errorName: error instanceof Error ? error.name : 'UnknownError',
    })
    return {
      success: false,
      error: 'No se pudo consultar tu DNI. Inténtalo nuevamente.',
    }
  }
}
