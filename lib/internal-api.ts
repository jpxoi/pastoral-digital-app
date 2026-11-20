import { timingSafeEqual } from 'node:crypto'
import { z } from 'zod'
import { NextResponse } from 'next/server'

const MAX_LIMIT = 100
const DEFAULT_LIMIT = 50
const MIN_TOKEN_LENGTH = 32

const integerQueryParam = z
  .string()
  .regex(/^\d+$/)
  .transform(Number)
  .pipe(z.number().int())

export const paginationSchema = z
  .object({
    limit: integerQueryParam.pipe(z.number().min(1).max(MAX_LIMIT)).optional(),
    offset: integerQueryParam.optional(),
  })
  .transform(({ limit, offset }) => ({
    limit: limit ?? DEFAULT_LIMIT,
    offset: offset ?? 0,
  }))

export function parsePagination(searchParams: URLSearchParams) {
  return paginationSchema.safeParse({
    limit: searchParams.get('limit') ?? undefined,
    offset: searchParams.get('offset') ?? undefined,
  })
}

export function jsonResponse(
  body: unknown,
  status = 200,
  extraHeaders?: HeadersInit
) {
  const headers = new Headers(extraHeaders)
  headers.set('Cache-Control', 'private, no-store, max-age=0')

  return NextResponse.json(body, { status, headers })
}

export function authorizeInternalRequest(request: Request) {
  const expectedToken = process.env.INTERNAL_API_TOKEN

  if (!expectedToken || expectedToken.length < MIN_TOKEN_LENGTH) {
    console.error('INTERNAL_API_TOKEN is missing or too short')
    return jsonResponse(
      { success: false, error: 'Internal API is misconfigured' },
      503
    )
  }

  const match = request.headers
    .get('authorization')
    ?.trim()
    .match(/^Bearer\s+(\S+)$/i)

  if (!match) {
    return jsonResponse({ success: false, error: 'Unauthorized' }, 401, {
      'WWW-Authenticate': 'Bearer',
    })
  }

  const provided = Buffer.from(match[1])
  const expected = Buffer.from(expectedToken)
  const isAuthorized =
    provided.length === expected.length && timingSafeEqual(provided, expected)

  if (!isAuthorized) {
    return jsonResponse({ success: false, error: 'Unauthorized' }, 401, {
      'WWW-Authenticate': 'Bearer',
    })
  }

  return null
}

export function invalidPaginationResponse(
  issues: { path: PropertyKey[]; message: string }[]
) {
  return jsonResponse(
    {
      success: false,
      error: 'Invalid pagination parameters',
      details: issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    },
    400
  )
}
