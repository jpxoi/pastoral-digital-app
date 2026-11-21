import CommunitiesTableSkeleton from '@/components/admin/communitiesTableSkeleton'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import CommunitiesTableClient from '@/components/admin/communitiesTableClient'
import { getAssignmentCatalog } from '@/queries/assignments'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Administrar comunidades',
}

async function CommunitiesTable() {
  const catalog = await getAssignmentCatalog()
  return <CommunitiesTableClient catalog={catalog} />
}

export default async function Page() {
  await requirePermission(Permission.COMMUNITIES_MANAGE)

  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Comunidades' />} />
      <Suspense fallback={<CommunitiesTableSkeleton />}>
        <CommunitiesTable />
      </Suspense>
    </>
  )
}
