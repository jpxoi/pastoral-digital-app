'use server'

import { logger } from '@/lib/logger'
import { auth } from '@clerk/nextjs/server'
import { UTApi } from 'uploadthing/server'
import { db } from '@/db/drizzle'
import { sql } from 'drizzle-orm'

const utapi = new UTApi()

export async function removeFile(key: string): Promise<{ success: boolean }> {
  const { userId } = await auth()
  if (!userId || !key) return { success: false }

  try {
    // Competes with registration for the same evidence row. Attached files cannot be claimed.
    const claimed = await db.execute(sql`
      UPDATE mass_evidence_files SET state = 'deleting', updated_at = now()
      WHERE key = ${key} AND user_id = ${userId} AND state IN ('available', 'deleting', 'deleted')
        AND NOT EXISTS (SELECT 1 FROM sunday_masses WHERE evidence_file_key = ${key})
      RETURNING key
    `)
    if (!claimed.rows.length) return { success: false }

    const result = await utapi.deleteFiles(key)
    if (!result.success) return { success: false }

    await db.execute(sql`
      UPDATE mass_evidence_files SET state = 'deleted', updated_at = now()
      WHERE key = ${key} AND user_id = ${userId} AND state = 'deleting'
    `)
    return { success: true }
  } catch (error) {
    // Keep deleting state on uncertain storage failures: retries are allowed, registration isn't.
    logger.error('Could not delete unregistered mass evidence', { error })
    return { success: false }
  }
}
