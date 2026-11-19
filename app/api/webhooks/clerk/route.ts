import { db } from '@/db/drizzle'
import { usersTable } from '@/db/schema'
import { UserRole } from '@/types'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

const validRoles = new Set<string>(Object.values(UserRole))

export async function POST(request: NextRequest) {
  let verified = false

  try {
    const event = await verifyWebhook(request)
    verified = true

    if (event.type === 'user.updated') {
      const role = event.data.public_metadata?.role

      if (typeof role === 'string' && validRoles.has(role)) {
        await db
          .update(usersTable)
          .set({ role: role as UserRole, updatedAt: new Date() })
          .where(eq(usersTable.id, event.data.id))
        revalidateTag('users', 'max')
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Clerk webhook verification or processing failed:', error)
    return NextResponse.json(
      { error: 'Webhook verification or processing failed' },
      { status: verified ? 500 : 400 }
    )
  }
}
