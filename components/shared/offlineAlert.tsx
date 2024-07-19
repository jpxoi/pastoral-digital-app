'use client'

import { useEffect, useState } from 'react'
import ErrorMessage from '@/components/shared/errorMessage'

export default function OfflineAlert() {
  const [offline, setOffline] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('online', () => setOffline(false))
    window.addEventListener('offline', () => setOffline(true))
  }, [])

  return offline ? (
    <ErrorMessage message='No hay conexión a internet. Por favor, intenta más tarde.' />
  ) : null
}
