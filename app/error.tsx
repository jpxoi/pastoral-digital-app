'use client'

import ErrorFallback from '@/components/shared/errorFallback'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='h-dvh'>
      <ErrorFallback error={error} reset={reset} />
    </div>
  )
}
