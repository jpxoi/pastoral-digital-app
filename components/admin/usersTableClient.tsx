'use client'

import { DataTable } from '@/components/ui/data-table'
import { getAdminUserColumns } from '@/components/admin/adminUserColumns'
import { SelectUser } from '@/db/schema'

export default function UsersTableClient({
  canSetRole,
  userRecords,
}: {
  canSetRole: boolean
  userRecords: SelectUser[]
}) {
  return (
    <DataTable columns={getAdminUserColumns(canSetRole)} data={userRecords} />
  )
}
