import { cacheTags } from '@/lib/cache'
import { clerkClient } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { after, type NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { UTApi } from 'uploadthing/server'
import { db } from '@/db/drizzle'
import { deleteCatechistData } from '@/queries/delete'
import { sql } from 'drizzle-orm'

const utapi = new UTApi()

export async function POST(request: NextRequest) {
  let event

  try {
    // verifyWebhook reads CLERK_WEBHOOK_SIGNING_SECRET by default.
    event = await verifyWebhook(request)
  } catch (error) {
    console.error('Clerk webhook signature verification failed', error)
    return Response.json(
      { error: 'Invalid webhook signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'user.updated': {
        const { data: clerkUser } = event
        const primaryEmail = clerkUser.email_addresses.find(
          ({ id }) => id === clerkUser.primary_email_address_id
        )?.email_address
        const profileResult = await db.execute(sql`
          WITH email_update AS (
            UPDATE users
            SET email = ${primaryEmail ?? null}::text, updated_at = now()
            WHERE id = ${clerkUser.id}
              AND ${primaryEmail ?? null}::text IS NOT NULL
              AND email IS DISTINCT FROM ${primaryEmail ?? null}::text
            RETURNING id
          )
          SELECT
            first_name AS "firstName",
            last_name AS "lastName",
            EXISTS (SELECT 1 FROM email_update) AS "emailUpdated"
          FROM users
          WHERE id = ${clerkUser.id}
        `)
        const dbUser = profileResult.rows[0] as
          | { firstName: string; lastName: string; emailUpdated: boolean }
          | undefined

        // Users who have not completed onboarding do not have an app profile yet.
        if (!dbUser) return Response.json({ received: true })
        if (dbUser.emailUpdated) {
          revalidateTag(cacheTags.usersList(), { expire: 0 })
        }

        const clerkFirstName = clerkUser.first_name ?? ''
        const clerkLastName = clerkUser.last_name ?? ''
        if (
          clerkFirstName !== dbUser.firstName ||
          clerkLastName !== dbUser.lastName
        ) {
          const client = await clerkClient()
          await client.users.updateUser(clerkUser.id, {
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
          })
        }

        return Response.json({ received: true })
      }

      case 'user.deleted': {
        const userId = event.data.id
        if (!userId) {
          return Response.json(
            { error: 'Deleted user event is missing an ID' },
            { status: 400 }
          )
        }

        // The database hard delete is part of the webhook response. File removal
        // runs after the response so Clerk can receive its acknowledgement quickly.
        const evidenceFiles = await deleteCatechistData(userId)
        revalidateTag(cacheTags.usersList(), { expire: 0 })
        revalidateTag(cacheTags.attendance(), { expire: 0 })
        revalidateTag(cacheTags.masses(), { expire: 0 })

        const fileKeys = evidenceFiles
          .filter(({ state }) => state !== 'deleted')
          .map(({ key }) => key)
        if (fileKeys.length) {
          after(async () => {
            try {
              const result = await utapi.deleteFiles(fileKeys)
              if (!result.success) {
                console.error(
                  'UploadThing did not delete user evidence files',
                  {
                    userId,
                    deletedCount: result.deletedCount,
                    requestedCount: fileKeys.length,
                  }
                )
              }
            } catch (error) {
              console.error(
                'Could not delete user evidence files from UploadThing',
                {
                  userId,
                  requestedCount: fileKeys.length,
                  error,
                }
              )
            }
          })
        }

        return Response.json({ received: true })
      }

      default:
        return Response.json({ received: true })
    }
  } catch (error) {
    console.error('Clerk webhook processing failed', {
      eventType: event.type,
      error,
    })
    return Response.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
