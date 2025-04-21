'use server'

import { deleteFile, UploadcareSimpleAuthSchema } from '@uploadcare/rest-client'
import { generateSecureSignature } from '@uploadcare/signed-uploads'

const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
  secretKey: process.env.UPLOADCARE_SECRET_KEY as string,
})

export async function removeFile(uuid: string): Promise<{
  success?: boolean
  error?: string
}> {
  return await deleteFile(
    {
      uuid: uuid,
    },
    { authSchema: uploadcareSimpleAuthSchema }
  )
    .then((file) => {
      console.log('File deleted successfully:', file.uuid)
      return {
        success: true,
      }
    })
    .catch((error) => {
      console.error('Error deleting file:', error.message)

      if (error.message == '[404 Not Found] Not found.') {
        return {
          success: true,
        }
      }

      return {
        error: error.message,
      }
    })
}

export async function getUploadcareSignature(): Promise<{
  secureSignature: string
  secureExpire: string
}> {
  const { secureSignature, secureExpire } = generateSecureSignature(
    process.env.UPLOADCARE_SECRET_KEY as string,
    {
      lifetime: 60 * 10 * 1000, // expire in 10 minutes
    }
  )

  return {
    secureSignature,
    secureExpire,
  }
}
