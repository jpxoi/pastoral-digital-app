import {
  DataTableSkeleton,
  TableActionsSkeleton,
} from '@/components/ui/data-table-skeleton'

export default function AdminEventsTableSkeleton({
  canCreate = true,
}: {
  canCreate?: boolean
}) {
  return (
    <DataTableSkeleton
      filters={0}
      actions={<TableActionsSkeleton kind='events' primary={canCreate} />}
      columns={[
        { label: 'Evento', width: 'w-48' },
        { label: 'Primer turno', width: 'w-40' },
        { label: 'Segundo turno', width: 'w-40' },
        { label: 'Fin del evento', width: 'w-40' },
        { label: 'Ubicación', width: 'w-48' },
        { label: 'Estado', width: 'w-24', badge: 'default' },
        { label: '', width: 'w-8', badge: true },
      ]}
    />
  )
}
