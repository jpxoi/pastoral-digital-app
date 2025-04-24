'use client'

import { IconRefresh } from '@tabler/icons-react'
import { Button } from '../ui/button'
import revalidate from '@/actions/revalidate'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'

export default function RevalidateButton({ tag }: { tag: string }) {
  const [isPending, startTransition] = useTransition()

  const handleClick = async () => {
    startTransition(() => {
      revalidate(tag)
    })
  }

  return (
    <Button
      variant='outline'
      disabled={isPending}
      size='sm'
      onClick={handleClick}
    >
      <IconRefresh className={cn('h-4 w-4', isPending && 'animate-spin')} />
      <span className=''>{isPending ? 'Actualizando...' : 'Actualizar'}</span>
    </Button>
  )
}
