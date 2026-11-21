'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { DNI_STORAGE_PREFIX } from '@/lib/dni-receipt'

export default function DniReceiptSession() {
  const { isLoaded, user } = useUser()
  const userId = user?.id

  useEffect(() => {
    if (!isLoaded) return
    try {
      const currentKey = userId ? `${DNI_STORAGE_PREFIX}${userId}` : null
      for (const key of Object.keys(sessionStorage)) {
        if (key.startsWith(DNI_STORAGE_PREFIX) && key !== currentKey) sessionStorage.removeItem(key)
      }
    } catch {
      // Browser storage is optional.
    }
  }, [isLoaded, userId])

  return null
}
