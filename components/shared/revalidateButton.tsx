'use client'

import { IconRefresh } from '@tabler/icons-react'
import { Button } from '../ui/button'
import revalidate from '@/actions/revalidate'
import { useTransition } from 'react'
import type { RefreshResource } from '@/lib/cache'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function RevalidateButton({
  resource,
}: {
  resource: RefreshResource
}) {
  const [isPending, startTransition] = useTransition()

  const handleClick = async () => {
    startTransition(async () => {
      try {
        const result = await revalidate(resource)
        if (result.error) toast.error(result.error)
      } catch {
        toast.error(
          'No se pudieron actualizar los datos. Inténtalo nuevamente.'
        )
      }
    })
  }

  return (
    <Button
      variant='outline'
      disabled={isPending}
      size='icon-sm'
      className='h-9 w-full gap-1.5 px-2.5 sm:size-8 sm:border-transparent sm:bg-transparent sm:px-0 sm:shadow-none'
      aria-label={isPending ? 'Actualizando...' : 'Actualizar'}
      title={isPending ? 'Actualizando...' : 'Actualizar'}
      aria-busy={isPending}
      onClick={handleClick}
    >
      <IconRefresh className={cn('h-4 w-4', isPending && 'animate-spin')} />
      <span className='sm:hidden'>
        {isPending ? 'Actualizando…' : 'Actualizar'}
      </span>
    </Button>
  )
}
