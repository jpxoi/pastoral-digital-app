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
  userRecords,
  catalog,
  children,
}: {
  canSetRole: boolean
  userRecords: UserWithAssignments[]
  catalog: AssignmentCatalog
  children?: ReactNode
}) {
  return (
    <DataTable
      columns={getAdminUserColumns(canSetRole, catalog)}
      data={userRecords}
      getRowId={(row) => row.id}
    >
      {children}
    </DataTable>
  )
}
