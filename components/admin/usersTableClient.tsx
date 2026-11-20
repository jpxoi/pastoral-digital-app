'use client'

import { DataTable } from '@/components/ui/data-table'
import { getAdminUserColumns } from '@/components/admin/adminUserColumns'
import type { SelectUser } from '@/db/schema'
import type { ReactNode } from 'react'

export default function UsersTableClient({
  canSetRole,
  userRecords,
  children,
}: {
  canSetRole: boolean
  userRecords: SelectUser[]
  children?: ReactNode
}) {
  return (
    <DataTable
      columns={getAdminUserColumns(canSetRole)}
      data={userRecords}
      getRowId={(row) => row.id}
    >
      {children}
    </DataTable>
  )
}
