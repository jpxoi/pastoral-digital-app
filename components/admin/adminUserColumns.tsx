'use client'

import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { SelectUser } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { calculateAge } from '@/lib/birthday'
import { IconCopy, IconDots, IconQrcode, IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import PastoralIdQRCode from '../dashboard/pastoraldQrCode'
import UserCategoryLabel from '../shared/userCategoryLabel'

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
    cell: ({ row }) => <UserCategoryLabel category={row.original.category} />,
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
