import type { ReactNode } from 'react'
import { getAllMasses } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'
import { MassesColumns } from '@/components/admin/massesColumns'

export default async function MassesTable({
  children,
}: {
  children?: ReactNode
}) {
  const massesRecords = await getAllMasses()

  return (
    <>
      <DataTable
        columns={MassesColumns}
        data={massesRecords}
        autoResetPageIndex={false}
      >
        {children}
      </DataTable>
    </>
  )
}
