'use client'

import { getAdminEventColumns } from '@/components/admin/adminEventColumns'
import { DataTable } from '@/components/ui/data-table'
import { FetchEventProps } from '@/types'
import type { ReactNode } from 'react'

interface AdminEventsTableClientProps {
  events: FetchEventProps[]
  canViewAttendance: boolean
  canEditEvents: boolean
  actions?: ReactNode
}

export default function AdminEventsTableClient({
  events,
  canViewAttendance,
  canEditEvents,
  actions,
}: AdminEventsTableClientProps) {
  return (
    <DataTable
      columns={getAdminEventColumns(canViewAttendance, canEditEvents)}
      data={events}
    >
      {actions}
    </DataTable>
  )
}
