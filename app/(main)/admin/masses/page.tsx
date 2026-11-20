import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Suspense } from 'react'
import { Metadata } from 'next'
import MassesTable from '@/components/admin/massesTable'
import MassesTableSkeleton from '@/components/admin/massesTableSkeleton'
import RevalidateButton from '@/components/shared/revalidateButton'
import { checkPermission, requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import ExportMassesPdfButton from '@/components/admin/exportMassesPdfButton'

export const metadata: Metadata = {
  title: 'Administrar misas',
}

export default async function Page() {
  await requirePermission(Permission.MASSES_VIEW_RECORDS)
  const canReview = await checkPermission(Permission.MASSES_REVIEW_RECORDS)

  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Misas' />} />
      <Suspense fallback={<MassesTableSkeleton />}>
        <MassesTable canReview={canReview}>
          <div className='flex flex-wrap items-center gap-2'>
            <RevalidateButton resource='masses' />
            <ExportMassesPdfButton />
          </div>
        </MassesTable>
      </Suspense>
    </>
  )
}
