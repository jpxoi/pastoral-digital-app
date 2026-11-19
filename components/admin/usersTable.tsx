import { getAllUsers } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'
import { getAdminUserColumns } from '@/components/admin/adminUserColumns'

export default async function UsersTable({
  canSetRole,
}: {
  canSetRole: boolean
}) {
  const userRecords = await getAllUsers()

  return (
    <>
      <DataTable columns={getAdminUserColumns(canSetRole)} data={userRecords} />
    </>
  )
}
