import 'server-only'

import { SignJWT, jwtVerify, errors } from 'jose'
import {
  DNI_RECEIPT_AUDIENCE,
  DNI_RECEIPT_ISSUER,
  DNI_RECEIPT_TTL,
  dniReceiptClaimsSchema,
  dniReceiptDataSchema,
  type DniReceiptData,
} from '@/lib/dni-receipt'

function signingKey() {
  const value = process.env.ONBOARDING_DNI_SIGNING_SECRET
  if (!value || !/^[A-Za-z0-9+/]+={0,2}$/.test(value)) {
    throw new Error('DNI signing secret is not configured')
  }
  const key = Buffer.from(value, 'base64')
  if (key.length < 32) throw new Error('DNI signing secret is too short')
  return key
}

export class DniReceiptError extends Error {
  constructor(public code: 'DNI_RECEIPT_INVALID' | 'DNI_RECEIPT_EXPIRED') {
    super(
      code === 'DNI_RECEIPT_EXPIRED'
        ? 'Tu consulta de DNI venció. Consulta nuevamente para continuar.'
        : 'Tu comprobante de DNI no es válido. Consulta nuevamente para continuar.'
    )
  }
}

export async function issueDniReceipt(userId: string, data: DniReceiptData) {
  const validated = dniReceiptDataSchema.parse(data)
  const now = Math.floor(Date.now() / 1000)
  return new SignJWT({ version: 1, data: validated })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuer(DNI_RECEIPT_ISSUER)
    .setAudience(DNI_RECEIPT_AUDIENCE)
    .setSubject(userId)
    .setIssuedAt(now)
    .setExpirationTime(now + DNI_RECEIPT_TTL)
    .sign(signingKey())
}

export async function verifyDniReceipt(
  receipt: unknown,
  userId: string,
  dni: string
) {
  if (typeof receipt !== 'string' || !receipt || receipt.length > 4096)
    throw new DniReceiptError('DNI_RECEIPT_INVALID')
  // Configuration failures must not be mistaken for a bad client receipt.
  const key = signingKey()
  try {
    const { payload } = await jwtVerify(receipt, key, {
      algorithms: ['HS256'],
      typ: 'JWT',
      issuer: DNI_RECEIPT_ISSUER,
      audience: DNI_RECEIPT_AUDIENCE,
      subject: userId,
      requiredClaims: ['iat', 'exp'],
      maxTokenAge: `${DNI_RECEIPT_TTL}s`,
    })
    const claims = dniReceiptClaimsSchema.parse(payload)
    if (claims.data.dni !== dni) throw new Error('Mismatched DNI')
    return claims.data
  } catch (error) {
    throw new DniReceiptError(
      error instanceof errors.JWTExpired
        ? 'DNI_RECEIPT_EXPIRED'
        : 'DNI_RECEIPT_INVALID'
    )
  }
}
