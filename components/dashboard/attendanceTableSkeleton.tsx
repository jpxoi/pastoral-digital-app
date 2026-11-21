import { DashboardSection } from './dashboard-section'
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton'
import PersonalRecordsPreviewSkeleton from './personal-records-preview-skeleton'

export default function AttendanceTableSkeleton({
  preview = false,
}: {
  preview?: boolean
}) {
  return (
    <DashboardSection
      title='Mis asistencias'
      href={preview ? '/attendance' : undefined}
    >
      {preview ? (
        <PersonalRecordsPreviewSkeleton label='Cargando mis asistencias' />
      ) : (
        <DataTableSkeleton
          label='Cargando mis asistencias'
          columns={[
            { label: 'Evento', width: 'w-40', secondary: true },
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
