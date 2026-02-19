'use server'

import { auth } from '@clerk/nextjs/server'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function removeFile(key: string): Promise<{
  success: boolean
}> {
  try {
    if (!key) return { success: false }
    const { userId } = await auth()

    if (!userId) {
      console.warn('[UploadThing] Unauthorized delete attempt for key:', key)
      return { success: false }
    }

    const res = await utapi.deleteFiles(key)

    if (!res.success) {
      console.error(
        '[UploadThing] Orphaned file failed to delete on backend. Key:',
        key
      )
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    console.error(
      `[Server Error] Exception during file deletion for key ${key}:`,
      errorMessage
    )
    return { success: false }
  }
}
