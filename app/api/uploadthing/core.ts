import { db } from '@/db/drizzle'
import { massEvidenceFilesTable } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  massEvidenceUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const { userId } = await auth()
      if (!userId) throw new UploadThingError('Unauthorized')
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db
        .insert(massEvidenceFilesTable)
        .values({ key: file.key, userId: metadata.userId, hash: file.fileHash })
        .onConflictDoNothing({ target: massEvidenceFilesTable.key })
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
