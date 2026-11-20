'use client'

import { IconCheck, IconLoader2, IconX } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

export type MassReviewAction = 'approve' | 'reject'

export default function MassReviewActions({
  pendingAction,
  canApprove,
  canReject,
  onReview,
}: {
  pendingAction: MassReviewAction | null
  canApprove: boolean
  canReject: boolean
  onReview: (action: MassReviewAction) => void
}) {
  const busy = pendingAction !== null
  return (
    <div className='bg-background fixed inset-x-0 bottom-0 z-20 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:static md:z-auto md:border-0 md:p-0'>
      <div className='grid grid-cols-2 gap-2'>
        <Button
          variant='ghost'
          size='lg'
          className='bg-red-100/70 text-red-700 hover:bg-red-100 hover:text-red-800 focus-visible:border-red-400 focus-visible:ring-red-500/20 dark:hover:bg-red-100'
          disabled={busy || !canReject}
          aria-busy={pendingAction === 'reject'}
          onClick={() => onReview('reject')}
        >
          {pendingAction === 'reject' ? (
            <IconLoader2 className='animate-spin' />
          ) : (
            <IconX />
          )}
          {pendingAction === 'reject' ? 'Rechazando...' : 'Rechazar'}
        </Button>
        <Button
          variant='ghost'
          size='lg'
          className='bg-emerald-100/70 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 focus-visible:border-emerald-400 focus-visible:ring-emerald-500/20 dark:hover:bg-emerald-100'
          disabled={busy || !canApprove}
          aria-busy={pendingAction === 'approve'}
          onClick={() => onReview('approve')}
        >
          {pendingAction === 'approve' ? (
            <IconLoader2 className='animate-spin' />
          ) : (
            <IconCheck />
          )}
          {pendingAction === 'approve' ? 'Aprobando...' : 'Aprobar'}
        </Button>
      </div>
    </div>
  )
}
