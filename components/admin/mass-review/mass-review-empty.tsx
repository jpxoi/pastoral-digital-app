'use client'

import Link from 'next/link'
import { IconCircleCheck, IconLoader2, IconRefresh } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export default function MassReviewEmpty({
  refreshing,
  busy,
  onRefresh,
}: {
  refreshing: boolean
  busy: boolean
  onRefresh: () => void
}) {
  return (
    <Empty className='min-h-[50dvh]' aria-live='polite'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <IconCircleCheck />
        </EmptyMedia>
        <EmptyTitle>No quedan misas pendientes</EmptyTitle>
        <EmptyDescription className='max-w-xs text-pretty'>
          Puedes volver a los registros o comprobar si llegaron nuevas
          evidencias.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className='flex-row flex-wrap justify-center gap-2'>
        <Button asChild>
          <Link href='/admin/masses'>Volver a registros</Link>
        </Button>
        <Button
          variant='outline'
          disabled={refreshing || busy}
          onClick={onRefresh}
        >
          {refreshing ? (
            <IconLoader2 className='animate-spin' />
          ) : (
            <IconRefresh />
          )}
          Actualizar
        </Button>
      </EmptyContent>
    </Empty>
  )
}
