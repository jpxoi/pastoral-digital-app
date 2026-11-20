import type { ReactNode } from 'react'
import { getAdminAttendanceColumns } from '@/components/admin/adminAttendanceColumns'
import { getAllAttendanceRecords } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export default async function AttendanceTable({
  children,
}: {
  children?: ReactNode
}) {
  const attendanceRecords = await getAllAttendanceRecords()
  const canDelete = await checkPermission(Permission.ATTENDANCE_MANAGE_RECORDS)

  return (
    <>
      <DataTable
        columns={getAdminAttendanceColumns(canDelete)}
        data={attendanceRecords}
      >
        {children}
      </DataTable>
    </>
  )
}
