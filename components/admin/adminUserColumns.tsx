'use client'

import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { SelectUser } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { calculateAge } from '@/lib/birthday'
import { IconCopy, IconDots, IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'

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
      <span className='text-nowrap'>
        {calculateAge(row.original.dateOfBirth)} años
      </span>
    ),
  },
  {
    id: 'codigoEstudiante',
    accessorKey: 'studentCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Código' />
    ),
    cell: ({ row }) => (
      <span className='truncate'>{row.original.studentCode}</span>
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
        <DropdownMenu key={row.id}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Abrir menu</span>
              <IconDots className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard
                  .writeText(row.original.id)
                  .then(() =>
                    toast.info(
                      'El ID del catequista ha sido copiado al portapapeles'
                    )
                  )
              }
            >
              <IconCopy />
              Copiar ID de catequista
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className='text-red-500'>
              <IconTrash />
              Eliminar catequista
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]
