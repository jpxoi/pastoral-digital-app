import { AdminAttendanceColumns } from '@/components/admin/adminAttendanceColumns'
import { getAllAttendanceRecords } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'

export default async function AttendanceTable() {
  const attendanceRecords = await getAllAttendanceRecords()

  return (
    <>
      <DataTable columns={AdminAttendanceColumns} data={attendanceRecords} />
    </>
  )
}
