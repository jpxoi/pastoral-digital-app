import { getAllMasses } from '@/queries/select'
import { DataTable } from '@/components/ui/data-table'
import { MassesColumns } from '@/components/admin/massesColumns'

export default async function MassesTable() {
  const massesRecords = await getAllMasses()

  return (
    <>
      <DataTable columns={MassesColumns} data={massesRecords} />
    </>
  )
}
