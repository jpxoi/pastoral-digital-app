import { decodeJwt } from 'jose'
import { z } from 'zod'

export const DNI_RECEIPT_TTL = 15 * 60
export const DNI_RECEIPT_ISSUER = 'pastoral-digital'
export const DNI_RECEIPT_AUDIENCE = 'onboarding-dni'
export const DNI_STORAGE_PREFIX = 'pd:s1:'
export const DNI_IN_USE_MESSAGE =
  'No podemos continuar con este DNI. Si ya tienes una cuenta, inicia sesión con tu correo anterior o contacta con soporte.'

export const dniReceiptDataSchema = z.discriminatedUnion('source', [
  z.object({
    source: z.literal('jsonpe'),
    dni: z.string().regex(/^\d{8}$/),
    firstName: z.string().trim().min(1).max(200),
    lastName: z.string().trim().min(1).max(200),
  }),
  z.object({
    source: z.literal('manual'),
    dni: z.string().regex(/^\d{8}$/),
    reason: z.enum(['not_found', 'unavailable']),
  }),
])

export type DniReceiptData = z.infer<typeof dniReceiptDataSchema>

export const dniReceiptClaimsSchema = z
  .object({
    iss: z.literal(DNI_RECEIPT_ISSUER),
    aud: z.literal(DNI_RECEIPT_AUDIENCE),
    sub: z.string().min(1),
    version: z.literal(1),
    iat: z.number().int().nonnegative(),
    exp: z.number().int().nonnegative(),
    data: dniReceiptDataSchema,
  })
  .refine((claims) => claims.exp - claims.iat === DNI_RECEIPT_TTL)

export type DniLookupResult =
  | { success: true; data: DniReceiptData; receipt: string; message?: string }
  | { success: false; error: string; code?: 'DNI_IN_USE' }

// This only restores UI state. The server must verify the signature at registration.
export function readDniReceipt(receipt: string, userId: string) {
  if (!receipt || receipt.length > 4096) throw new Error('Invalid receipt')
  const claims = dniReceiptClaimsSchema.parse(decodeJwt(receipt))
  const now = Math.floor(Date.now() / 1000)
  if (claims.sub !== userId || claims.exp <= now || claims.iat > now + 5) {
    throw new Error('Invalid or expired receipt')
  }
  return claims
}

export function storeDniReceipt(userId: string, receipt: string | null) {
  try {
    const key = `${DNI_STORAGE_PREFIX}${userId}`
    if (receipt) sessionStorage.setItem(key, JSON.stringify({ receipt }))
    else sessionStorage.removeItem(key)
  } catch {
    // Storage may be unavailable; onboarding still works in memory.
  }
}

export function loadDniReceipt(userId: string): string | null {
  try {
    const raw = sessionStorage.getItem(`${DNI_STORAGE_PREFIX}${userId}`)
    if (!raw) return null
    const { receipt } = z
      .object({ receipt: z.string().max(4096) })
      .parse(JSON.parse(raw))
    readDniReceipt(receipt, userId)
    return receipt
  } catch {
    storeDniReceipt(userId, null)
    return null
  }
}
