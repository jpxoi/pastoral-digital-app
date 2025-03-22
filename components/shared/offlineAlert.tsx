'use client'

import { useEffect, useState } from 'react'
import ErrorAlert from '@/components/shared/errorAlert'

export default function OfflineAlert() {
  const [offline, setOffline] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('online', () => setOffline(false))
    window.addEventListener('offline', () => setOffline(true))
  }, [])

  return offline ? (
    <ErrorAlert
      title='Conexión perdida'
      description='No hay conexión a internet. Por favor, intenta más tarde.'
    />
  ) : null
}
