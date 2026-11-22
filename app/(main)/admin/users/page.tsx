import RevalidateButton from '@/components/shared/revalidateButton'
import { GenerateFotochecksButton } from '@/components/fotochecks/generate-button'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Suspense } from 'react'
import { Metadata } from 'next'
import UsersTable from '@/components/admin/usersTable'
import { ClerkOrphanUsersButton } from '@/components/admin/clerk-orphan-users-button'
import UserTableSkeleton from '@/components/admin/userTableSkeleton'
import { checkPermission, requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import PageActions from '@/components/shared/pageActions'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'

export const metadata: Metadata = {
  title: 'Administrar catequistas',
}

export default async function Page() {
  await requirePermission(Permission.CATECHISTS_VIEW)
  const canSetRole = await checkPermission(Permission.CATECHISTS_ASSIGN_ROLE)
  const canDelete = await checkPermission(Permission.CATECHISTS_DELETE)
  const canEditAssignments = await checkPermission(
    Permission.CATECHISTS_EDIT_ASSIGNMENTS
  )
  const canViewPastoralId = await checkPermission(
    Permission.CATECHISTS_VIEW_PASTORAL_ID
  )

  const canGenerateFotochecks = await checkPermission(
    Permission.CATECHISTS_GENERATE_FOTOCHECKS
  )
  const canCleanClerkUsers = await checkPermission(
    Permission.CLERK_ORPHAN_USERS_DELETE
  )

  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Catequistas' />} />
      <Suspense
        fallback={
          <UserTableSkeleton
            canGenerate={canGenerateFotochecks}
            canClean={canCleanClerkUsers}
          />
        }
      >
        <UsersTable
          canSetRole={canSetRole}
          canDelete={canDelete}
          canEditAssignments={canEditAssignments}
          canViewPastoralId={canViewPastoralId}
          canGenerateFotochecks={canGenerateFotochecks}
        >
          <PageActions className='grid-cols-[auto_minmax(0,1fr)]'>
            <RevalidateButton resource='users' />
            {(canGenerateFotochecks || canCleanClerkUsers) && (
              <ButtonGroup
                aria-label='Acciones de catequistas'
                className='w-full min-w-0 sm:w-auto'
              >
                {canGenerateFotochecks && <GenerateFotochecksButton />}
                {canGenerateFotochecks && canCleanClerkUsers && (
                  <ButtonGroupSeparator className='bg-primary-foreground/25' />
                )}
                {canCleanClerkUsers && (
                  <ClerkOrphanUsersButton grouped={canGenerateFotochecks} />
                )}
              </ButtonGroup>
            )}
          </PageActions>
        </UsersTable>
      </Suspense>
    </>
  )
}
