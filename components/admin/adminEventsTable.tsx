import { AdminEventColumns } from '@/components/admin/adminEventColumns'
import { DataTable } from '@/components/ui/data-table'
import { getAllEvents } from '@/queries/select'

export default async function AdminEventsTable() {
  const events = await getAllEvents()

  return <DataTable columns={AdminEventColumns} data={events} />
}
