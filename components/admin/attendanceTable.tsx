import { getAllAttendanceRecords } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'
import { AdminAttendanceColumns } from './adminAttendanceColumns'

export default async function AttendanceTable() {
  const attendanceRecords = await getAllAttendanceRecords()

  return (
    <>
      <DataTable columns={AdminAttendanceColumns} data={attendanceRecords} />
    </>
  )
}
