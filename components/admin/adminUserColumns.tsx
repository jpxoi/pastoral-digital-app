'use client'

import type { DataTableFeatures } from '@/components/ui/data-table-features'

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import type {
  AssignmentCatalog,
  UserWithAssignments,
} from '@/types/assignments'
import { createColumnHelper } from '@tanstack/react-table'
import { calculateAge } from '@/lib/birthday'
import UserCategoryLabel from '../shared/userCategoryLabel'
import UserAssignmentBadges from '../shared/userAssignmentBadges'
import { getAssignmentKey } from '@/lib/assignments'
import { AdminUserRowActions } from './adminUserRowActions'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { parseUserRole, UserRole } from '@/types'
import { filterUserRole } from '@/lib/filter'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import {
  IconUser,
  IconShield,
  IconQrcode,
  IconSchool,
  IconUsers,
  IconCalendar,
} from '@tabler/icons-react'

const columnHelper = createColumnHelper<
  DataTableFeatures,
  UserWithAssignments
>()

const roleIcons = {
  [UserRole.MEMBER]: IconUser,
  [UserRole.ADMIN]: IconShield,
  [UserRole.SCANNER]: IconQrcode,
  [UserRole.TEACHER]: IconSchool,
  [UserRole.COORDINATOR]: IconUsers,
  [UserRole.MASS_MANAGER]: IconCalendar,
}

const roleVariants: Record<UserRole, BadgeProps['variant']> = {
  [UserRole.MEMBER]: 'slate',
  [UserRole.ADMIN]: 'red',
  [UserRole.SCANNER]: 'sky',
  [UserRole.TEACHER]: 'violet',
  [UserRole.COORDINATOR]: 'emerald',
  [UserRole.MASS_MANAGER]: 'amber',
}

const roleLabels: Record<UserRole, string> = {
  [UserRole.MEMBER]: 'Catequista',
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.SCANNER]: 'Responsable de asistencia',
  [UserRole.TEACHER]: 'Docente',
  [UserRole.COORDINATOR]: 'Coordinador',
  [UserRole.MASS_MANAGER]: 'Encargado de misas',
}

export const getAdminUserColumns = (
  canSetRole: boolean,
  canDelete: boolean,
  canEditAssignments: boolean,
  canViewPastoralId: boolean,
  canGenerateFotochecks: boolean,
  catalog: AssignmentCatalog
) =>
  columnHelper.columns([
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
      id: 'nombreCompleto',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Nombre Completo' />
      ),
      cell: ({ row }) => (
        <span className='text-nowrap'>{row.getValue('nombreCompleto')}</span>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
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
    }),
    columnHelper.accessor('phoneNumber', {
      id: 'phoneNumber',
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
    }),
    columnHelper.accessor('dateOfBirth', {
      id: 'dateOfBirth',
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
    }),
    columnHelper.accessor((row) => calculateAge(row.dateOfBirth), {
      id: 'age',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Edad' />
      ),
      cell: ({ row }) => (
        <span className='text-nowrap'>{row.getValue('age')} años</span>
      ),
    }),
    columnHelper.accessor('studentCode', {
      id: 'codigoEstudiante',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Código' />
      ),
      cell: ({ row }) => (
        <span className='text-nowrap'>{row.original.studentCode}</span>
      ),
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => <span className='text-nowrap'>Categoría</span>,
      cell: ({ row }) => <UserCategoryLabel category={row.original.category} />,
    }),
    columnHelper.accessor('role', {
      id: 'role',
      filterFn: (row, id, values: string[]) =>
        filterUserRole(row.getValue(id), values),
      header: () => <span className='text-nowrap'>Rol</span>,
      cell: ({ row }) => {
        const role = parseUserRole(row.original.role)
        if (!role) return <Badge variant='slate'>Rol desconocido</Badge>

        const Icon = roleIcons[role]
        return (
          <Badge variant={roleVariants[role]}>
            <Icon />
            {roleLabels[role]}
          </Badge>
        )
      },
    }),
    columnHelper.accessor(
      (row) => row.catechistAssignments.map(getAssignmentKey),
      {
        id: 'programa',
        getUniqueValues: (row) =>
          row.catechistAssignments.map(getAssignmentKey),
        filterFn: (row, id, values: string[]) =>
          (row.getValue(id) as string[]).some((value) =>
            values.includes(value)
          ),
        header: () => <span className='text-nowrap'>Asignaciones</span>,
        cell: ({ row }) => (
          <UserAssignmentBadges
            assignments={row.original.catechistAssignments}
          />
        ),
      }
    ),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <AdminUserRowActions
          row={row}
          canSetRole={canSetRole}
          canDelete={canDelete}
          canEditAssignments={canEditAssignments}
          canViewPastoralId={canViewPastoralId}
          canGenerateFotochecks={canGenerateFotochecks}
          catalog={catalog}
        />
      ),
    }),
  ])
