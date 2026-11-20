'use client'

import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'

import PageHeader from '@/components/shared/pageHeader'

import ErrorFallback from '@/components/shared/errorFallback'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Ocurrió un error' />} />
      <ErrorFallback error={error} reset={reset} />
    </>
  )
}
