'use server'

import { utapi } from '@/server/uploadthing'

export async function deleteFile(key: string) {
  await utapi.deleteFiles(key)
}

export async function deleteFiles(keys: string[]) {
  await utapi.deleteFiles(keys)
}
