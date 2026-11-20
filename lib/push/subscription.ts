import { z } from 'zod'

// Only browser push services may be contacted; never accept arbitrary URLs.
export const pushEndpointSchema = z
  .string()
  .max(2048)
  .url()
  .refine((value) => {
    let url: URL
    try {
      url = new URL(value)
    } catch {
      return false
    }
    const hosts = [
      'fcm.googleapis.com',
      'updates.push.services.mozilla.com',
      'web.push.apple.com',
    ]
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.port &&
      !url.hash &&
      (hosts.includes(url.hostname) ||
        url.hostname.endsWith('.notify.windows.com'))
    )
  }, 'Servicio de notificaciones no permitido.')

export const pushSubscriptionSchema = z.object({
  endpoint: pushEndpointSchema,
  keys: z.object({
    p256dh: z.string().regex(/^[A-Za-z0-9_-]{87}={0,1}$/),
    auth: z.string().regex(/^[A-Za-z0-9_-]{22}={0,2}$/),
  }),
})
