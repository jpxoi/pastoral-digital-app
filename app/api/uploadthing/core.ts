import { db } from '@/db/drizzle'
import { massEvidenceFilesTable, sundayMassesTable } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import {
  getMassRegistrationWindow,
  MASS_REGISTRATION_CLOSED_MESSAGE,
} from '@/lib/mass-registration'
import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  sundayMassEvidenceUploader: f(
    {
      image: {
        maxFileSize: '4MB',
        maxFileCount: 1,
      },
    },
    { presignedURLTTL: '5 minutes' }
  )
    .middleware(async () => {
      const { userId } = await auth()
      if (!userId) throw new UploadThingError('Unauthorized')

      const window = getMassRegistrationWindow()
      if (!window.isOpen)
        throw new UploadThingError(MASS_REGISTRATION_CLOSED_MESSAGE)

      const [record] = await db
        .select({ id: sundayMassesTable.id })
        .from(sundayMassesTable)
        .where(
          and(
            eq(sundayMassesTable.userId, userId),
            eq(sundayMassesTable.sundayDate, window.sundayDate)
          )
        )
        .limit(1)

      if (record)
        throw new UploadThingError(
          'Ya registraste tu asistencia a misa para este domingo.'
        )

      return { userId, sundayDate: window.sundayDate }
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
