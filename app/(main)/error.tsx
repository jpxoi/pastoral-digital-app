'use client'

import ErrorFallback from '@/components/shared/errorFallback'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <header className='flex w-full items-center'>
        <SidebarTrigger />
      </header>
      <ErrorFallback error={error} reset={reset} />
    </>
  )
}
