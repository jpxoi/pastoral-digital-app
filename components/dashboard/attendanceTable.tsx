import { currentUser } from '@clerk/nextjs/server'
import { getAttendanceRecordsByUserId } from '@/queries/select'
import { SimpleDataTable } from '../ui/simple-data-table'
import { columns } from './attendance/columns'

export default async function AttendanceTable() {
  const user = await currentUser()
  const attendanceRecords = await getAttendanceRecordsByUserId(
    user?.id as string
  )

  return <SimpleDataTable columns={columns} data={attendanceRecords} />
}
