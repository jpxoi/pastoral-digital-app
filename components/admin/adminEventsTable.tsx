import { getAdminEventColumns } from '@/components/admin/adminEventColumns'
import { DataTable } from '@/components/ui/data-table'
import { getAllEvents } from '@/queries/select'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export default async function AdminEventsTable() {
  const events = await getAllEvents()
  const canViewAttendance = await checkPermission(
    Permission.ATTENDANCE_VIEW_RECORDS
  )

  return (
    <DataTable
      columns={getAdminEventColumns(canViewAttendance)}
      data={events}
    />
  )
}
