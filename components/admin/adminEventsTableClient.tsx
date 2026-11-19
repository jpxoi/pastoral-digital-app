'use client'

import { getAdminEventColumns } from '@/components/admin/adminEventColumns'
import { DataTable } from '@/components/ui/data-table'
import { FetchEventProps } from '@/types'

interface AdminEventsTableClientProps {
  events: FetchEventProps[]
  canViewAttendance: boolean
}

export default function AdminEventsTableClient({
  events,
  canViewAttendance,
}: AdminEventsTableClientProps) {
  return (
    <DataTable
      columns={getAdminEventColumns(canViewAttendance)}
      data={events}
    />
  )
}
