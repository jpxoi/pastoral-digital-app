'use client'

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import type {
  AssignmentCatalog,
  UserWithAssignments,
} from '@/types/assignments'
import { ColumnDef } from '@tanstack/react-table'
import { calculateAge } from '@/lib/birthday'
import UserCategoryLabel from '../shared/userCategoryLabel'
import UserAssignmentBadges from '../shared/userAssignmentBadges'
import { getAssignmentKey } from '@/lib/assignments'
import { AdminUserRowActions } from './adminUserRowActions'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { UserRole } from '@/types'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import {
  IconUser,
  IconShield,
  IconQrcode,
  IconSchool,
  IconUsers,
  IconCalendar,
} from '@tabler/icons-react'

const roleIcons = {
  [UserRole.MEMBER]: IconUser,
  [UserRole.ADMIN]: IconShield,
  [UserRole.SCANNER]: IconQrcode,
  [UserRole.TEACHER]: IconSchool,
  [UserRole.COORDINATOR]: IconUsers,
  [UserRole.MANAGER]: IconCalendar,
}

const roleVariants: Record<UserRole, BadgeProps['variant']> = {
  [UserRole.MEMBER]: 'slate',
  [UserRole.ADMIN]: 'red',
  [UserRole.SCANNER]: 'sky',
  [UserRole.TEACHER]: 'violet',
  [UserRole.COORDINATOR]: 'emerald',
  [UserRole.MANAGER]: 'amber',
}

const roleLabels: Record<UserRole, string> = {
  [UserRole.MEMBER]: 'Catequista',
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.SCANNER]: 'Responsable de asistencia',
  [UserRole.TEACHER]: 'Docente',
  [UserRole.COORDINATOR]: 'Coordinador',
  [UserRole.MANAGER]: 'Encargado de misas',
}

export const getAdminUserColumns = (
  canSetRole: boolean,
  catalog: AssignmentCatalog
): ColumnDef<UserWithAssignments>[] => [
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
        href={`https://wa.me/${row.original.phoneNumber.trim().replace('+', '')}`}
        target='_blank'
        rel='noreferrer'
        className='text-nowrap hover:underline'
      >
        {formatPhoneNumberIntl(row.original.phoneNumber)}
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
          timeZone: 'UTC',
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
    id: 'role',
    accessorKey: 'role',
    filterFn: (row, id, values: string[]) => values.includes(row.getValue(id)),
    header: () => <span className='text-nowrap'>Rol</span>,
    cell: ({ row }) => {
      const Icon = roleIcons[row.original.role]
      return (
        <Badge
          variant={roleVariants[row.original.role]}
          className='h-8 rounded-lg text-nowrap'
        >
          <Icon className='size-4' />
          {roleLabels[row.original.role]}
        </Badge>
      )
    },
  },
  {
    id: 'programa',
    accessorFn: (row) => row.catechistAssignments.map(getAssignmentKey),
    getUniqueValues: (row) => row.catechistAssignments.map(getAssignmentKey),
    filterFn: (row, id, values: string[]) =>
      (row.getValue(id) as string[]).some((value) => values.includes(value)),
    header: () => <span className='text-nowrap'>Asignaciones</span>,
    cell: ({ row }) => (
      <UserAssignmentBadges assignments={row.original.catechistAssignments} />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <AdminUserRowActions
        row={row}
        canSetRole={canSetRole}
        catalog={catalog}
      />
    ),
  },
]
