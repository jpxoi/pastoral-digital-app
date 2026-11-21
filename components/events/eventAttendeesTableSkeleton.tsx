import { DataTableSkeleton } from '@/components/ui/data-table-skeleton'

export default function EventAttendeesTableSkeleton() {
  return (
    <DataTableSkeleton
      filters={1}
      actions={false}
      columns={[
        { label: 'Catequista', width: 'w-56' },
        { label: 'Hora de Ingreso', width: 'w-20' },
        { label: 'Registrado por', width: 'w-48' },
        { label: 'Estado', width: 'w-32', badge: 'default', align: 'right' },
        { label: '', width: 'w-8', badge: true },
      ]}
    />
  )
}
