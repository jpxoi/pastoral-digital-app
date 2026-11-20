'use client'

import { useCallback, useEffect, useState } from 'react'
import { IconBell } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { isAppleTouchDevice, isRunningAsInstalledPwa } from '@/lib/pwa-platform'
import {
  decodeVapidPublicKey,
  removeDevicePushSubscription,
} from '@/lib/push/client'

type Status =
  | 'loading'
  | 'unsupported'
  | 'install'
  | 'blocked'
  | 'unavailable'
  | 'on'
  | 'off'
  | 'error'

const descriptions: Record<Status, string> = {
  loading: 'Consultando el estado de las notificaciones…',
  unsupported:
    'Este navegador no admite notificaciones. Prueba desde un navegador compatible.',
  install:
    'Para recibir notificaciones, añade la app a tu pantalla de inicio y ábrela desde su icono.',
  blocked:
    'Las notificaciones están bloqueadas. Permítelas en los ajustes del navegador o del dispositivo.',
  unavailable: 'Las notificaciones todavía no están disponibles.',
  on: 'Recibirás avisos de eventos, misas, asistencias y cumpleaños en este dispositivo.',
  off: 'Activa los avisos de eventos, misas, asistencias y cumpleaños en este dispositivo.',
  error: 'No se pudo consultar el estado de las notificaciones.',
}

export default function PushNotificationsControl() {
  const [status, setStatus] = useState<Status>('loading')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY

  const refresh = useCallback(async () => {
    // Defer browser checks until after hydration.
    await Promise.resolve()
    if (
      isAppleTouchDevice(
        navigator.userAgent,
        navigator.platform,
        navigator.maxTouchPoints
      ) &&
      !isRunningAsInstalledPwa()
    ) {
      setStatus('install')
      return
    }
    if (
      !window.isSecureContext ||
      !('Notification' in window) ||
      !('serviceWorker' in navigator) ||
      !('PushManager' in window)
    ) {
      setStatus('unsupported')
      return
    }
    if (Notification.permission === 'denied') {
      setStatus('blocked')
      return
    }
    if (!publicKey) {
      setStatus('unavailable')
      return
    }
    try {
      const response = await fetch('/api/push/subscriptions', {
        cache: 'no-store',
      })
      if (!response.ok) throw new Error()
      const data: { configured: boolean; endpoints: string[] } =
        await response.json()
      if (!data.configured) {
        setStatus('unavailable')
        return
      }
      const registration = await navigator.serviceWorker.getRegistration('/')
      const subscription = await registration?.pushManager.getSubscription()
      // An existing subscription may belong to another account on this device.
      if (subscription && !data.endpoints.includes(subscription.endpoint)) {
        if (!(await subscription.unsubscribe())) throw new Error()
        setStatus('off')
        return
      }
      setStatus(
        subscription &&
          data.endpoints.includes(subscription.endpoint) &&
          Notification.permission === 'granted'
          ? 'on'
          : 'off'
      )
    } catch {
      setStatus('error')
    }
  }, [publicKey])

  useEffect(() => {
    const timer = window.setTimeout(() => void refresh(), 0)
    const onVisibility = () => {
      if (!document.hidden) void refresh()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [refresh])

  async function toggle() {
    setBusy(true)
    setError('')
    try {
      if (status === 'on') {
        await removeDevicePushSubscription()
        setStatus('off')
        return
      }
      // Request permission directly from the click, before any network awaits.
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setStatus(permission === 'denied' ? 'blocked' : 'off')
        return
      }
      await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
      })
      const registration = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise<never>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error('La app aún no está lista. Vuelve a intentarlo.')
              ),
            10_000
          )
        ),
      ])
      let subscription = await registration.pushManager.getSubscription()
      const key = decodeVapidPublicKey(publicKey!)
      if (
        subscription?.options.applicationServerKey &&
        String(new Uint8Array(subscription.options.applicationServerKey)) !==
          String(key)
      ) {
        if (!(await subscription.unsubscribe()))
          throw new Error(
            'No se pudo actualizar el permiso. Vuelve a intentarlo.'
          )
        subscription = null
      }
      subscription ??= await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key,
      })
      const response = await fetch('/api/push/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription.toJSON()),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        await subscription.unsubscribe()
        throw new Error(
          data?.error ?? 'No se pudieron activar las notificaciones.'
        )
      }
      setStatus('on')
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'No se pudo cambiar el permiso. Vuelve a intentarlo.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section
      id='notifications'
      aria-labelledby='notifications-title'
      className='border-border flex scroll-mt-4 flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between'
    >
      <div className='flex items-start gap-3'>
        <IconBell
          className='text-primary mt-0.5 size-5 shrink-0'
          aria-hidden='true'
        />
        <div className='space-y-1 text-left'>
          <h2 id='notifications-title' className='font-semibold'>
            Notificaciones
          </h2>
          <p className='text-muted-foreground text-sm' aria-live='polite'>
            {descriptions[status]}
          </p>
          {error && (
            <p className='text-destructive text-sm' role='alert'>
              {error}
            </p>
          )}
        </div>
      </div>
      {status === 'on' || status === 'off' ? (
        <Button
          type='button'
          variant={status === 'on' ? 'outline' : 'default'}
          className='shrink-0'
          disabled={busy}
          onClick={() => void toggle()}
        >
          {busy
            ? 'Actualizando…'
            : status === 'on'
              ? 'Desactivar notificaciones'
              : 'Permitir notificaciones'}
        </Button>
      ) : status === 'error' ? (
        <Button type='button' variant='outline' onClick={() => void refresh()}>
          Reintentar
        </Button>
      ) : null}
    </section>
  )
}
