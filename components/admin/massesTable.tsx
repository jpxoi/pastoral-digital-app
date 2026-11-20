import type { ReactNode } from 'react'
import { getAllMasses } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'
import { getMassesColumns } from '@/components/admin/massesColumns'

export default async function MassesTable({
  canReview,
  children,
}: {
  canReview: boolean
  children?: ReactNode
}) {
  const massesRecords = await getAllMasses()

  return (
    <>
      <DataTable
        columns={getMassesColumns(canReview)}
        data={massesRecords}
        autoResetPageIndex={false}
      >
        {children}
      </DataTable>
    </>
  )
}
