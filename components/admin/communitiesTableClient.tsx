'use client'

import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { AssignmentCatalog } from '@/types/assignments'
import CommunityDialog from '@/components/admin/communityDialog'
import CommunityRowActions from '@/components/admin/communityRowActions'
import RevalidateButton from '@/components/shared/revalidateButton'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export default function CommunitiesTableClient({
  catalog,
}: {
  catalog: AssignmentCatalog
}) {
  const [creating, setCreating] = useState(false)
  const columns: ColumnDef<AssignmentCatalog['communities'][number]>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Comunidad' />
      ),
      cell: ({ row }) => (
        <span className='font-medium'>{row.original.name}</span>
      ),
    },
    {
      id: 'program',
      accessorFn: (community) =>
        catalog.programs.find((program) => program.id === community.programId)
          ?.name ?? '',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Programa' />
      ),
      filterFn: (row, columnId, values: string[]) =>
        values.includes(row.getValue<string>(columnId)),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CommunityRowActions community={row.original} catalog={catalog} />
      ),
    },
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={catalog.communities}
        getRowId={(community) => community.id}
        facetedFilters={[
          {
            columnId: 'program',
            title: 'Programa',
            options: catalog.programs.map((program) => ({
              label: program.name,
              value: program.name,
            })),
          },
        ]}
      >
        <div className='flex flex-wrap items-center justify-end gap-2'>
          <RevalidateButton resource='communities' />
          <Button
            size='sm'
            disabled={!catalog.programs.length}
            onClick={() => setCreating(true)}
          >
            <IconPlus />
            Crear comunidad
          </Button>
        </div>
      </DataTable>
      {!catalog.programs.length && (
        <p className='text-muted-foreground text-sm'>
          No hay programas disponibles para crear comunidades.
        </p>
      )}
      {creating && (
        <CommunityDialog catalog={catalog} onClose={() => setCreating(false)} />
      )}
    </>
  )
}
