import {
  DataTableSkeleton,
  TableActionsSkeleton,
} from '@/components/ui/data-table-skeleton'

export default function CommunitiesTableSkeleton() {
  return (
    <DataTableSkeleton
      filters={1}
      actions={<TableActionsSkeleton kind='communities' />}
      columns={[
        { label: 'Comunidad', width: 'w-56' },
        { label: 'Programa', width: 'w-44' },
        { label: '', width: 'w-8', badge: true },
      ]}
    />
  )
}
