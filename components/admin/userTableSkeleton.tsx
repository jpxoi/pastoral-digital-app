import { DataTableSkeleton } from '@/components/ui/data-table-skeleton'

export default function UserTableSkeleton() {
  return (
    <DataTableSkeleton
      filters={3}
      actions={true}
      columns={[
        { label: 'Nombre Completo', width: 'w-56' },
        { label: 'Correo Electrónico', width: 'w-48' },
        { label: 'Número de Teléfono', width: 'w-28' },
        { label: 'Fecha de Nacimiento', width: 'w-32' },
        { label: 'Edad', width: 'w-12' },
        { label: 'Código', width: 'w-16' },
        { label: 'Categoría', width: 'w-24', badge: 'default' },
        { label: 'Rol', width: 'w-28', badge: 'default' },
        { label: 'Asignaciones', width: 'w-40', badge: 'default' },
        { label: '', width: 'w-8', badge: true },
      ]}
    />
  )
}
