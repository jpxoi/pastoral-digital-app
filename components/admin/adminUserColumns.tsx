'use client'

import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { SelectUser } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { calculateAge } from '@/lib/birthday'
import { IconCopy, IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'

export const AdminUserColumns: ColumnDef<SelectUser>[] = [
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombres' />
    ),
    cell: ({ row }) => (
      <span className='truncate'>{row.original.firstName}</span>
    ),
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Apellidos' />
    ),
    cell: ({ row }) => (
      <span className='truncate'>{row.original.lastName}</span>
    ),
  },
  {
    id: 'username',
    accessorKey: 'username',
    header: 'Nombre de Usuario',
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Correo Electrónico',
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        target='_blank'
        rel='noreferrer'
        className='truncate hover:underline'
      >
        {row.original.email}
      </a>
    ),
  },
  {
    id: 'phoneNumber',
    accessorKey: 'phoneNumber',
    header: 'Número de Teléfono',
    cell: ({ row }) => (
      <a
        href={`https://wa.me/51${row.original.phoneNumber}`}
        target='_blank'
        rel='noreferrer'
        className='truncate hover:underline'
      >
        {`+51 ${String(row.original.phoneNumber).replace(
          /(\d{3})(\d{3})(\d{3})/,
          '$1 $2 $3'
        )}`}
        {/* Format as +51 987 654 321 */}
      </a>
    ),
  },
  {
    id: 'dateOfBirth',
    accessorKey: 'dateOfBirth',
    header: 'Fecha de Nacimiento',
    cell: ({ row }) => (
      <span className='truncate'>
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
    accessorKey: 'dateOfBirth',
    header: 'Edad',
    cell: ({ row }) => (
      <span className='truncate'>
        {calculateAge(row.original.dateOfBirth)} años
      </span>
    ),
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.original.category === 'alumni' && 'bg-blue-600 hover:bg-blue-500',
          row.original.category === 'student' &&
            'bg-green-600 hover:bg-green-500',
          row.original.category === 'teacher' &&
            'bg-yellow-600 hover:bg-yellow-500'
        )}
      >
        {row.original.category === 'alumni'
          ? 'Exalumno'
          : row.original.category === 'student'
            ? 'Alumno'
            : row.original.category === 'teacher'
              ? 'Docente'
              : row.original.category === 'other'
                ? 'Otro'
                : 'Desconocido'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex gap-4' key={row.id}>
        <Button
          variant='ghost'
          size='icon'
          className='h-5 w-5 p-0'
          onClick={() => {
            navigator.clipboard.writeText(row.original.id).then(() => {
              toast.info('El ID del catequista ha sido copiado al portapapeles')
            })
          }}
        >
          <IconCopy />
        </Button>
        <Button variant='ghost' size='icon' className='h-5 w-5 p-0' disabled>
          <IconTrash className='text-red-500' />
        </Button>
      </div>
    ),
  },
]
