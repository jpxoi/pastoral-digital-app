const SHELL_CACHE = 'pastoral-pwa-shell-v2'
const NEXT_STATIC_CACHE = 'pastoral-pwa-next-static-v1'
const PUBLIC_ASSET_CACHE = 'pastoral-pwa-public-v1'
const OFFLINE_URL = '/offline.html'
const PUBLIC_ASSET_PREFIXES = [
  '/icons/',
  '/graphics/',
  '/images/',
  '/screenshots/',
  '/splash_screens/',
  '/sounds/',
]
const MAX_NEXT_STATIC_ENTRIES = 150

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                (cacheName.startsWith('workbox-') ||
                  cacheName.startsWith('pastoral-pwa-')) &&
                ![SHELL_CACHE, NEXT_STATIC_CACHE, PUBLIC_ASSET_CACHE].includes(
                  cacheName
                )
            )
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/data/')
  ) {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const offlinePage = await caches.match(OFFLINE_URL)
        return offlinePage || Response.error()
      })
    )
    return
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, NEXT_STATIC_CACHE, true))
    return
  }

  if (PUBLIC_ASSET_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
    event.respondWith(staleWhileRevalidate(request, PUBLIC_ASSET_CACHE, event))
  }
})

async function cacheFirst(request, cacheName, limitEntries) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  if (cachedResponse) return cachedResponse

  const response = await fetch(request)
  if (response.ok) {
    await cache.put(request, response.clone())
    if (limitEntries) await trimCache(cache, MAX_NEXT_STATIC_ENTRIES)
  }
  return response
}

async function staleWhileRevalidate(request, cacheName, event) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  const networkResponse = fetch(request)
    .then(async (response) => {
      if (response.ok) await cache.put(request, response.clone())
      return response
    })
    .catch(() => null)

  event.waitUntil(networkResponse.then(() => undefined))
  return cachedResponse || (await networkResponse) || Response.error()
}

async function trimCache(cache, maxEntries) {
  const requests = await cache.keys()
  const excessRequests = requests.slice(
    0,
    Math.max(0, requests.length - maxEntries)
  )
  await Promise.all(excessRequests.map((request) => cache.delete(request)))
}

self.addEventListener('push', (event) => {
  if (!event.data) return
  let message
  try {
    message = event.data.json()
  } catch {
    return
  }
  if (typeof message.title !== 'string' || typeof message.body !== 'string')
    return
  event.waitUntil(
    self.registration.showNotification(message.title, {
      body: message.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: typeof message.tag === 'string' ? message.tag : undefined,
      data: { url: safeNotificationUrl(message.url) },
    })
  )
})

function safeNotificationUrl(value) {
  try {
    const url = new URL(
      typeof value === 'string' ? value : '/dashboard',
      self.location.origin
    )
    if (
      url.origin === self.location.origin &&
      [
        '/dashboard',
        '/events',
        '/masses',
        '/attendance',
        '/birthdays',
      ].includes(url.pathname)
    )
      return url.href
  } catch {
    /* Fall back to the dashboard for invalid URLs. */
  }
  return new URL('/dashboard', self.location.origin).href
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = safeNotificationUrl(event.notification.data?.url)
  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      for (const client of windows) {
        if (new URL(client.url).origin !== self.location.origin) continue
        const navigated = await client.navigate(url)
        if (navigated) return navigated.focus()
      }
      return self.clients.openWindow(url)
    })()
  )
})
