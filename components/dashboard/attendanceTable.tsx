import { currentUser } from '@clerk/nextjs/server'
import { getAttendanceRecordsByUserId } from '@/queries/select'
import { SimpleDataTable } from '@/components/ui/simple-data-table'
import { UserAttendanceColumns } from '@/components/dashboard/userAttendanceColumns'

export default async function AttendanceTable() {
  const user = await currentUser()
  const attendanceRecords = await getAttendanceRecordsByUserId(
    user?.id as string
  )

  return (
    <SimpleDataTable columns={UserAttendanceColumns} data={attendanceRecords} />
  )
}
