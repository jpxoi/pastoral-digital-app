import { DashboardSection } from './dashboard-section'
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton'
import PersonalRecordsPreviewSkeleton from './personal-records-preview-skeleton'

export default function SundayMassTableSkeleton({
  preview = false,
}: {
  preview?: boolean
}) {
  return (
    <DashboardSection title='Mis misas' href={preview ? '/masses' : undefined}>
      {preview ? (
        <PersonalRecordsPreviewSkeleton label='Cargando mis misas' evidence />
      ) : (
        <DataTableSkeleton
          label='Cargando mis misas'
          columns={[
            { label: 'Parroquia', width: 'w-40', secondary: true },
            { label: 'Evidencia', width: 'w-12' },
            {
              label: 'Estado',
              width: 'w-24',
              badge: 'default',
              align: 'right',
            },
          ]}
        />
      )}
    </DashboardSection>
  )
}
