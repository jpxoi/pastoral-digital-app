import {
  DataTableSkeleton,
  TableActionsSkeleton,
} from '@/components/ui/data-table-skeleton'

export default function AttendanceTableSkeleton() {
  return (
    <DataTableSkeleton
      filters={2}
      actions={<TableActionsSkeleton kind='records' />}
      columns={[
        { label: 'Catequista', width: 'w-56' },
        { label: 'Evento', width: 'w-44' },
        { label: 'Hora de Ingreso', width: 'w-36' },
        { label: 'Estado', width: 'w-32', badge: 'default', align: 'right' },
        { label: '', width: 'w-8', badge: true },
      ]}
    />
  )
}
