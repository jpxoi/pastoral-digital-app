'use client'

import type { ReactNode } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { getAdminAttendanceColumns } from './adminAttendanceColumns'
import type { FetchAttendancePropsWithEvent } from '@/types'

export default function AttendanceTableClient({
  attendanceRecords,
  canDelete,
  children,
}: {
  attendanceRecords: FetchAttendancePropsWithEvent[]
  canDelete: boolean
  children?: ReactNode
}) {
  return (
    <DataTable
      columns={getAdminAttendanceColumns(canDelete)}
      data={attendanceRecords}
    >
      {children}
    </DataTable>
  )
}
