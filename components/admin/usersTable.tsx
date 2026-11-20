import { getAllUsers } from '@/queries/select'
import UsersTableClient from '@/components/admin/usersTableClient'
import type { ReactNode } from 'react'
import { getAssignmentCatalog } from '@/queries/assignments'

export default async function UsersTable({
  canSetRole,
  canDelete,
  canEditAssignments,
  canViewPastoralId,
  canGenerateFotochecks,
  children,
}: {
  canSetRole: boolean
  canDelete: boolean
  canEditAssignments: boolean
  canViewPastoralId: boolean
  canGenerateFotochecks: boolean
  children?: ReactNode
}) {
  const [userRecords, catalog] = await Promise.all([
    getAllUsers(),
    getAssignmentCatalog(),
  ])

  return (
    <UsersTableClient
      canSetRole={canSetRole}
      canDelete={canDelete}
      canEditAssignments={canEditAssignments}
      canViewPastoralId={canViewPastoralId}
      canGenerateFotochecks={canGenerateFotochecks}
      userRecords={userRecords}
      catalog={catalog}
    >
      {children}
    </UsersTableClient>
  )
}
