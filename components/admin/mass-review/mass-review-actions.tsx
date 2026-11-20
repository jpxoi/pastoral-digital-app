'use client'

import { IconCheck, IconLoader2, IconX } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

export type MassReviewAction = 'approve' | 'reject'

export default function MassReviewActions({
  pendingAction,
  error,
  canApprove,
  canReject,
  onReview,
}: {
  pendingAction: MassReviewAction | null
  error: string | null
  canApprove: boolean
  canReject: boolean
  onReview: (action: MassReviewAction) => void
}) {
  const busy = pendingAction !== null
  return (
    <div className='bg-background fixed inset-x-0 bottom-0 z-20 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:static md:z-auto md:border-0 md:p-0'>
      {error && (
        <p
          role='alert'
          className='mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700'
        >
          {error}
        </p>
      )}
      <div className='grid grid-cols-2 gap-2'>
        <Button
          size='lg'
          className='bg-red-500 text-white hover:bg-red-600 focus-visible:border-red-400 focus-visible:ring-red-500/30'
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
          size='lg'
          className='bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30'
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
