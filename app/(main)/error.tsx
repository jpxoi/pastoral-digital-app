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
        <SidebarTrigger className='max-sm:size-9 sm:max-md:size-8 max-sm:[&_svg]:size-5!' />
      </header>
      <ErrorFallback error={error} reset={reset} />
    </>
  )
}
