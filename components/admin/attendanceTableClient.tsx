'use client'

import type { ReactNode } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { getAdminAttendanceColumns } from './adminAttendanceColumns'
import type { FetchAttendancePropsWithEvent } from '@/types'

export default function AttendanceTableClient({
  attendanceRecords,
  canDelete,
  canUpdate,
  children,
}: {
  attendanceRecords: FetchAttendancePropsWithEvent[]
  canDelete: boolean
  canUpdate: boolean
  children?: ReactNode
}) {
  return (
    <DataTable
      columns={getAdminAttendanceColumns(canUpdate, canDelete)}
      data={attendanceRecords}
    >
      {children}
    </DataTable>
  )
}
