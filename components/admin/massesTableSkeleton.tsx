import {
  DataTableSkeleton,
  TableActionsSkeleton,
} from '@/components/ui/data-table-skeleton'

export default function MassesTableSkeleton({
  canReview = true,
}: {
  canReview?: boolean
}) {
  return (
    <DataTableSkeleton
      filters={3}
      actions={<TableActionsSkeleton kind='masses' primary={canReview} />}
      columns={[
        { label: 'Nombre Completo', width: 'w-56' },
        { label: 'Categoría', width: 'w-24', badge: 'default' },
        { label: 'Parroquia', width: 'w-60' },
        { label: 'Evidencia', width: 'w-12' },
        { label: 'Domingo', width: 'w-32' },
        { label: 'Fecha de registro', width: 'w-40' },
        { label: 'Estado', width: 'w-28', badge: 'default' },
      ]}
    />
  )
}
