import PageActions from '@/components/shared/pageActions'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Suspense } from 'react'
import { Metadata } from 'next'
import MassesTable from '@/components/admin/massesTable'
import MassesTableSkeleton from '@/components/admin/massesTableSkeleton'
import RevalidateButton from '@/components/shared/revalidateButton'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import ExportMassesPdfButton from '@/components/admin/exportMassesPdfButton'

export const metadata: Metadata = {
  title: 'Administrar Misas | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.MASSES_MANAGE)

  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Misas' />} />
      <PageActions>
        <div className='flex flex-wrap items-center gap-2'>
          <RevalidateButton resource='masses' />
          <ExportMassesPdfButton />
        </div>
      </PageActions>
      <Suspense fallback={<MassesTableSkeleton />}>
        <MassesTable />
      </Suspense>
    </>
  )
}
