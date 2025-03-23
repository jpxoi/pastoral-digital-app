import { getAllAttendanceRecords, getAllUsers } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'
import { AdminUserColumns } from './adminUserColumns'

export default async function UsersTable() {
  const userRecords = await getAllUsers()

  return (
    <>
      <DataTable columns={AdminUserColumns} data={userRecords} />
    </>
  )
}
