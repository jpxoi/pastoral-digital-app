'use client'

import { useEffect } from 'react'

export default function PwaServiceWorker() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      !('serviceWorker' in navigator)
    ) {
      return
    }

    navigator.serviceWorker
      .register('/service-worker.js', { scope: '/' })
      .catch((error) => {
        console.error('No se pudo registrar el service worker:', error)
      })
  }, [])

  return null
}
