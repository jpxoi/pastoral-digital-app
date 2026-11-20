'use client'

import type { ReactNode } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { MassesColumns } from '@/components/admin/massesColumns'
import { type FetchMassesProps, SundayMassStatus } from '@/types'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export default function MassesTableClient({
  massesRecords,
  children,
}: {
  massesRecords: FetchMassesProps[]
  children?: ReactNode
}) {
  return (
    <DataTable
      columns={MassesColumns}
      data={massesRecords}
      autoResetPageIndex={false}
      getRowId={(row) => row.id}
      facetedFilters={[
        {
          columnId: 'massStatus',
          title: 'Estado',
          options: [
            { label: 'Pendiente', value: SundayMassStatus.PENDING },
            { label: 'Aceptado', value: SundayMassStatus.ACCEPTED },
            { label: 'Rechazado', value: SundayMassStatus.REJECTED },
          ],
        },
        {
          columnId: 'sundayDate',
          title: 'Domingo',
          options: [
            ...new Set(massesRecords.map((record) => record.sundayDate)),
          ]
            .sort((a, b) => b.localeCompare(a))
            .map((value) => ({
              label: format(parseISO(value), 'PP', { locale: es }),
              value,
            })),
        },
      ]}
    >
      {children}
    </DataTable>
  )
}
