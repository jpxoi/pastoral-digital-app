'use client'

import { DataTable } from '@/components/ui/data-table'
import { getAdminUserColumns } from '@/components/admin/adminUserColumns'
import type {
  AssignmentCatalog,
  UserWithAssignments,
} from '@/types/assignments'
import type { ReactNode } from 'react'

export default function UsersTableClient({
  canSetRole,
  canDelete,
  canEditAssignments,
  canViewPastoralId,
  canGenerateFotochecks,
  userRecords,
  catalog,
  children,
}: {
  canSetRole: boolean
  canDelete: boolean
  canEditAssignments: boolean
  canViewPastoralId: boolean
  canGenerateFotochecks: boolean
  userRecords: UserWithAssignments[]
  catalog: AssignmentCatalog
  children?: ReactNode
}) {
  return (
    <DataTable
      columns={getAdminUserColumns(
        canSetRole,
        canDelete,
        canEditAssignments,
        canViewPastoralId,
        canGenerateFotochecks,
        catalog
      )}
      data={userRecords}
      getRowId={(row) => row.id}
    >
      {children}
    </DataTable>
  )
}
