'use server'

import { utapi } from './uploadthing'

export async function deleteFile(key: string) {
  await utapi.deleteFiles(key)
}
