import { getAllAttendanceRecords } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './attendance/columns'

export default async function AttendanceTable() {
  const attendanceRecords = await getAllAttendanceRecords()

  return (
    <>
      <DataTable columns={columns} data={attendanceRecords} />
    </>
  )
}
