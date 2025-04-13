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
import { IconCopy, IconDots, IconQrcode, IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import PastoralIdQRCode from '../dashboard/pastoraldQrCode'
import { DialogTitle } from '@radix-ui/react-dialog'

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
    header: () => <span className='text-nowrap'>Nombre de Usuario</span>,
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
        <Dialog>
          <DropdownMenu>
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
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <IconQrcode />
                  Ver Pastoral ID
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className='text-red-500'>
                <IconTrash />
                Eliminar catequista
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <PastoralIdQRCode userId={row.original.id} />
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
]
