import type { Metadata } from 'next'
import { Suspense } from 'react'
import BreadcrumbTrail from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import MassReviewClient from '@/components/admin/massReviewClient'
import { Skeleton } from '@/components/ui/skeleton'
import { requirePermission } from '@/lib/roles'
import { getPendingMasses } from '@/queries/select'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = { title: 'Revisar misas' }

async function PendingMassReview() {
  const records = await getPendingMasses()
  return <MassReviewClient records={records} />
}

export default async function Page() {
  await requirePermission(Permission.MASSES_REVIEW_RECORDS)

  return (
    <>
      <PageHeader
        breadcrumb={
          <BreadcrumbTrail
            crumbs={[
              { label: 'Misas', href: '/admin/masses' },
              { label: 'Revisar pendientes' },
            ]}
          />
        }
      />
      <Suspense
        fallback={
          <div
            role='status'
            aria-label='Cargando misas pendientes'
            className='space-y-4'
          >
            <Skeleton className='h-8 w-56' />
            <Skeleton className='h-[65dvh] w-full rounded-xl' />
          </div>
        }
      >
        <PendingMassReview />
      </Suspense>
    </>
  )
}
