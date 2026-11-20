'use client'

import { DataTable } from '@/components/ui/data-table'
import { getEventAttendeesColumns } from './eventAttendeesColumns'
import type { FetchAttendanceProps } from '@/types'

export default function EventAttendeesTableClient({
  attendanceRecords,
  canDelete,
}: {
  attendanceRecords: FetchAttendanceProps[]
  canDelete: boolean
}) {
  return (
    <DataTable
      columns={getEventAttendeesColumns(canDelete)}
      data={attendanceRecords}
      globalFilterColumnId='catequista'
    />
  )
}
