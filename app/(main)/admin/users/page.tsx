import RevalidateButton from '@/components/shared/revalidateButton'
import { GenerateFotochecksButton } from '@/components/fotochecks/generate-button'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Suspense } from 'react'
import { Metadata } from 'next'
import UsersTable from '@/components/admin/usersTable'
import UserTableSkeleton from '@/components/admin/userTableSkeleton'
import { checkPermission, requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Administrar Catequistas | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.CATECHISTS_VIEW)
  const canSetRole = await checkPermission(Permission.CATECHISTS_ASSIGN_ROLE)

  const canGenerateFotochecks = await checkPermission(
    Permission.CATECHISTS_VIEW_PASTORAL_ID
  )

  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Catequistas' />} />
      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTable canSetRole={canSetRole}>
          <div className='flex items-center gap-2'>
            <RevalidateButton resource='users' />
            {canGenerateFotochecks && <GenerateFotochecksButton />}
          </div>
        </UsersTable>
      </Suspense>
    </>
  )
}
