import type { ReactNode } from 'react'
import AttendanceTableClient from './attendanceTableClient'
import { getAllAttendanceRecords } from '@/queries/select'
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
      <AttendanceTableClient
        canDelete={canDelete}
        attendanceRecords={attendanceRecords}
      >
        {children}
      </AttendanceTableClient>
    </>
  )
}
