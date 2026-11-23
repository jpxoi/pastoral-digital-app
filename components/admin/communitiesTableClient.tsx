'use client'

import type { DataTableFeatures } from '@/components/ui/data-table-features'

import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { createColumnHelper } from '@tanstack/react-table'
import type { AssignmentCatalog } from '@/types/assignments'
import CommunityDialog from '@/components/admin/communityDialog'
import CommunityRowActions from '@/components/admin/communityRowActions'
import RevalidateButton from '@/components/shared/revalidateButton'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import PageActions from '@/components/shared/pageActions'

const columnHelper = createColumnHelper<
  DataTableFeatures,
  AssignmentCatalog['communities'][number]
>()

export default function CommunitiesTableClient({
  catalog,
}: {
  catalog: AssignmentCatalog
}) {
  const [creating, setCreating] = useState(false)
  const columns = columnHelper.columns([
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Comunidad' />
      ),
      cell: ({ row }) => (
        <span className='font-medium'>{row.original.name}</span>
      ),
    }),
    columnHelper.accessor(
      (community) =>
        catalog.programs.find((program) => program.id === community.programId)
          ?.name ?? '',
      {
        id: 'program',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Programa' />
        ),
        filterFn: (row, columnId, values: string[]) =>
          values.includes(row.getValue<string>(columnId)),
      }
    ),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <CommunityRowActions community={row.original} catalog={catalog} />
      ),
    }),
  ])

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
        <PageActions>
          <RevalidateButton resource='communities' />
          <Button
            size='sm'
            className='h-9 w-full sm:h-8 sm:w-auto'
            disabled={!catalog.programs.length}
            onClick={() => setCreating(true)}
          >
            <IconPlus />
            Crear comunidad
          </Button>
        </PageActions>
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
