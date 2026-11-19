import { Permission, PERMISSIONS } from '@/types/permissions'
import { UserRole } from '@/types'

type RolePermissionMatrix = Readonly<Record<UserRole, readonly Permission[]>>

const basicPermissions = [
  Permission.DASHBOARD_VIEW,
  Permission.EVENTS_VIEW,
  Permission.BIRTHDAYS_VIEW,
]

export const ROLE_PERMISSIONS: RolePermissionMatrix = {
  [UserRole.MEMBER]: basicPermissions,
  [UserRole.SCANNER]: [
    ...basicPermissions,
    Permission.ATTENDANCE_SCAN,
    Permission.EVENTS_VIEW_TODAY,
  ],
  [UserRole.COORDINATOR]: [
    ...basicPermissions,
    Permission.CATECHISTS_VIEW,
    Permission.CATECHISTS_EDIT_PROGRAM,
    Permission.CATECHISTS_VIEW_PASTORAL_ID,
    Permission.ATTENDANCE_VIEW_CALENDAR,
  ],
  [UserRole.TEACHER]: [
    ...basicPermissions,
    Permission.CATECHISTS_VIEW,
    Permission.CATECHISTS_EDIT_PROGRAM,
    Permission.CATECHISTS_VIEW_PASTORAL_ID,
    Permission.ATTENDANCE_VIEW_CALENDAR,
    Permission.EVENTS_MANAGE,
  ],
  [UserRole.MANAGER]: [...basicPermissions, Permission.MASSES_MANAGE],
  [UserRole.ADMIN]: PERMISSIONS,
}

export function getRolePermissions(role: UserRole): readonly Permission[] {
  return ROLE_PERMISSIONS[role]
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return getRolePermissions(role).includes(permission)
}

export function hasRolePermission(
  role: unknown,
  permission: Permission
): boolean {
  return (
    typeof role === 'string' &&
    Object.values(UserRole).includes(role as UserRole) &&
    hasPermission(role as UserRole, permission)
  )
}
