'use client'

import { Button } from '@/components/ui/button'
import { IconWifiOff } from '@tabler/icons-react'

export default function OfflinePage() {
  return (
    // Use a neutral background
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-primary p-4'>
      <div className='flex max-w-md flex-col items-center justify-center gap-6 rounded-lg bg-background p-10 text-center shadow-lg transition-shadow duration-300'>
        <IconWifiOff className='h-20 w-20 text-destructive' stroke={2} />
        <h1 className='mt-4 text-balance text-xl font-extrabold tracking-tight md:text-2xl'>
          ¡Oops! Sin conexión
        </h1>
        <p className='text-muted-foreground'>
          Parece que no estás conectado a internet. Revisa tu conexión y vuelve
          a intentarlo.
        </p>
        <Button
          onClick={() => location.reload()}
          // Larger, rounded, more padding, hover effect
          size='lg'
        >
          Reintentar
        </Button>
      </div>
    </div>
  )
}
