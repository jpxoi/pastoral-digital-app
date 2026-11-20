'use client'

import { DataTable } from '@/components/ui/data-table'
import { getEventAttendeesColumns } from './eventAttendeesColumns'
import type { FetchAttendanceProps } from '@/types'

export default function EventAttendeesTableClient({
  attendanceRecords,
  canDelete,
  canUpdate,
}: {
  attendanceRecords: FetchAttendanceProps[]
  canDelete: boolean
  canUpdate: boolean
}) {
  return (
    <DataTable
      columns={getEventAttendeesColumns(canUpdate, canDelete)}
      data={attendanceRecords}
      globalFilterColumnId='catequista'
    />
  )
}
