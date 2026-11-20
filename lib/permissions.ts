import { Permission, PERMISSIONS } from '@/types/permissions'
import { parseUserRole, UserRole } from '@/types'

type RolePermissionMatrix = Readonly<Record<UserRole, readonly Permission[]>>

const basicPermissions = [
  Permission.DASHBOARD_VIEW,
  Permission.EVENTS_VIEW,
  Permission.ATTENDANCE_VIEW_OWN,
  Permission.MASSES_VIEW_OWN,
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
    Permission.CATECHISTS_EDIT_ASSIGNMENTS,
    Permission.COMMUNITIES_MANAGE,
    Permission.CATECHISTS_VIEW_PASTORAL_ID,
    Permission.ATTENDANCE_VIEW_CALENDAR,
  ],
  [UserRole.TEACHER]: [
    ...basicPermissions,
    Permission.CATECHISTS_VIEW,
    Permission.CATECHISTS_EDIT_ASSIGNMENTS,
    Permission.COMMUNITIES_MANAGE,
    Permission.CATECHISTS_VIEW_PASTORAL_ID,
    Permission.CATECHISTS_GENERATE_FOTOCHECKS,
    Permission.ATTENDANCE_VIEW_CALENDAR,
    Permission.ATTENDANCE_EXPORT_CALENDAR_PDF,
    Permission.ATTENDANCE_VIEW_RECORDS,
    Permission.EVENTS_CREATE,
    Permission.EVENTS_EDIT,
    Permission.MASSES_VIEW_RECORDS,
  ],
  [UserRole.MASS_MANAGER]: [
    ...basicPermissions,
    Permission.MASSES_VIEW_RECORDS,
    Permission.MASSES_REVIEW_RECORDS,
  ],
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
  const parsedRole = parseUserRole(role)
  return parsedRole ? hasPermission(parsedRole, permission) : false
}
