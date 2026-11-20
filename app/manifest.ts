import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pastoral Digital App',
    short_name: 'Pastoral Digital',
    description:
      'Pastoral Digital App permite a catequistas de la Pastoral Mariana acceder a su perfil e identificación digital para actividades y reuniones.',
    start_url: '/dashboard',
    id: '/',
    scope: '/',
    lang: 'es',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#07309B',
    orientation: 'portrait',
    display_override: ['window-controls-overlay'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/mobile-1.png',
        sizes: '1080x1920',
        type: 'image/png',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/mobile-2.png',
        sizes: '1080x1920',
        type: 'image/png',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/mobile-3.png',
        sizes: '1080x1920',
        type: 'image/png',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/mobile-4.png',
        sizes: '1080x1920',
        type: 'image/png',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/desktop-1.png',
        sizes: '1920x1218',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/screenshots/desktop-2.png',
        sizes: '1920x1218',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
  }
}
