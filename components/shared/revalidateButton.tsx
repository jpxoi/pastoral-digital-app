'use client'

import { IconRefresh } from '@tabler/icons-react'
import { Button } from '../ui/button'
import revalidate from '@/actions/revalidate'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'

export default function RevalidateButton({ tag }: { tag: string }) {
  const [isPending, startTransition] = useTransition()

  const handleClick = async () => {
    startTransition(async () => {
      await revalidate(tag)
    })
  }

  return (
    <Button
      variant='ghost'
      disabled={isPending}
      size='icon'
      aria-label={isPending ? 'Actualizando...' : 'Actualizar'}
      title={isPending ? 'Actualizando...' : 'Actualizar'}
      aria-busy={isPending}
      onClick={handleClick}
    >
      <IconRefresh className={cn('h-4 w-4', isPending && 'animate-spin')} />
    </Button>
  )
}
