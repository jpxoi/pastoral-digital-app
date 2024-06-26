import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pastoral Digital Services',
    short_name: 'Pastoral Digital',
    description: 'Pastoral Digital es una plataforma digital para uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icons/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icons/icon1.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon2.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon3.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/icon4.png',
        sizes: '32x32',
        type: 'image/png',
      }, {
        src: '/icons/icon5.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      }
    ],
  }
}