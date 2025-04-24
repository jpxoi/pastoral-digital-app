'use client'

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { SelectUser } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { calculateAge } from '@/lib/birthday'
import UserCategoryLabel from '../shared/userCategoryLabel'
import UserScheduleLabel from '../shared/userScheduleLabel'
import { AdminUserRowActions } from './adminUserRowActions'

export const AdminUserColumns: ColumnDef<SelectUser>[] = [
  {
    id: 'nombreCompleto',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre Completo' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{row.getValue('nombreCompleto')}</span>
    ),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: () => <span className='text-nowrap'>Correo Electrónico</span>,
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        target='_blank'
        rel='noreferrer'
        className='text-nowrap hover:underline'
      >
        {row.original.email}
      </a>
    ),
  },
  {
    id: 'phoneNumber',
    accessorKey: 'phoneNumber',
    header: () => <span className='text-nowrap'>Número de Teléfono</span>,
    cell: ({ row }) => (
      <a
        href={`https://wa.me/51${row.original.phoneNumber}`}
        target='_blank'
        rel='noreferrer'
        className='text-nowrap hover:underline'
      >
        {`+51 ${String(row.original.phoneNumber).replace(
          /(\d{3})(\d{3})(\d{3})/,
          '$1 $2 $3'
        )}`}
      </a>
    ),
  },
  {
    id: 'dateOfBirth',
    accessorKey: 'dateOfBirth',
    header: () => <span className='text-nowrap'>Fecha de Nacimiento</span>,
    cell: ({ row }) => (
      <span className='text-nowrap'>
        {new Date(row.original.dateOfBirth).toLocaleDateString('es-PE', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </span>
    ),
  },
  {
    id: 'age',
    accessorFn: (row) => calculateAge(row.dateOfBirth),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Edad' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{row.getValue('age')} años</span>
    ),
  },
  {
    id: 'codigoEstudiante',
    accessorKey: 'studentCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Código' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{row.original.studentCode}</span>
    ),
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: () => <span className='text-nowrap'>Categoría</span>,
    cell: ({ row }) => <UserCategoryLabel category={row.original.category} />,
  },
  {
    id: 'programa',
    accessorKey: 'schedule',
    header: () => <span className='text-nowrap'>Programa</span>,
    cell: ({ row }) => <UserScheduleLabel schedule={row.original.schedule} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <AdminUserRowActions row={row} />,
  },
]
