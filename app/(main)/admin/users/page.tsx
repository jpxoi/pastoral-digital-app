import PageActions from '@/components/shared/pageActions'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Suspense } from 'react'
import { Metadata } from 'next'
import UsersTable from '@/components/admin/usersTable'
import UserTableSkeleton from '@/components/admin/userTableSkeleton'
import ExportToCsvUsers from '@/components/shared/exportToCsvUsers'
import RevalidateButton from '@/components/shared/revalidateButton'
import { checkPermission, requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Administrar Catequistas | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.CATECHISTS_VIEW)
  const canSetRole = await checkPermission(Permission.CATECHISTS_ASSIGN_ROLE)

  return (
    <>
      <PageHeader
        breadcrumb={<PageBreadcrumb label='Catequistas' administration />}
      />
      <PageActions>
        <div className='flex flex-wrap items-center gap-2'>
          <RevalidateButton tag='users' />
          <ExportToCsvUsers />
        </div>
      </PageActions>
      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTable canSetRole={canSetRole} />
      </Suspense>
    </>
  )
}
