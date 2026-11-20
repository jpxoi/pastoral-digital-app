'use client'

import { getAdminEventColumns } from '@/components/admin/adminEventColumns'
import { DataTable } from '@/components/ui/data-table'
import { FetchEventProps } from '@/types'
import type { ReactNode } from 'react'

interface AdminEventsTableClientProps {
  events: FetchEventProps[]
  canViewAttendance: boolean
  actions?: ReactNode
}

export default function AdminEventsTableClient({
  events,
  canViewAttendance,
  actions,
}: AdminEventsTableClientProps) {
  return (
    <DataTable columns={getAdminEventColumns(canViewAttendance)} data={events}>
      {actions}
    </DataTable>
  )
}
