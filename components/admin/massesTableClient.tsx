'use client'

import type { ReactNode } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { getMassesColumns } from '@/components/admin/massesColumns'
import type { FetchMassesProps } from '@/types'

export default function MassesTableClient({
  canReview,
  massesRecords,
  children,
}: {
  canReview: boolean
  massesRecords: FetchMassesProps[]
  children?: ReactNode
}) {
  return (
    <DataTable
      columns={getMassesColumns(canReview)}
      data={massesRecords}
      autoResetPageIndex={false}
    >
      {children}
    </DataTable>
  )
}
