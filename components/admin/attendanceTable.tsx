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
  const [canUpdate, canDelete] = await Promise.all([
    checkPermission(Permission.ATTENDANCE_UPDATE_RECORD_STATUS),
    checkPermission(Permission.ATTENDANCE_DELETE_RECORDS),
  ])

  return (
    <>
      <AttendanceTableClient
        canDelete={canDelete}
        canUpdate={canUpdate}
        attendanceRecords={attendanceRecords}
      >
        {children}
      </AttendanceTableClient>
    </>
  )
}
