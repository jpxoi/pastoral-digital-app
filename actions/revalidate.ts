'use server'

import { auth } from '@clerk/nextjs/server'
import { refresh, updateTag } from 'next/cache'
import { cacheTags, type RefreshResource } from '@/lib/cache'
import { hasRolePermission } from '@/lib/permissions'
import { Permission } from '@/types/permissions'

const refreshTargets = {
  events: { tag: cacheTags.eventsList(), permission: Permission.EVENTS_EDIT },
  users: { tag: cacheTags.usersList(), permission: Permission.CATECHISTS_VIEW },
  records: {
    tag: cacheTags.attendanceList(),
    permission: Permission.ATTENDANCE_VIEW_RECORDS,
  },
  calendar: {
    tag: cacheTags.attendanceList(),
    permission: Permission.ATTENDANCE_VIEW_CALENDAR,
  },
  masses: {
    tag: cacheTags.massesList(),
    permission: Permission.MASSES_VIEW_RECORDS,
  },
  communities: {
    tag: cacheTags.assignmentCatalog(),
    permission: Permission.COMMUNITIES_MANAGE,
  },
} satisfies Record<RefreshResource, { tag: string; permission: Permission }>

export default async function revalidate(resource: RefreshResource) {
  const { userId, sessionClaims } = await auth()
  if (!userId) return { error: 'Inicia sesión para actualizar los datos.' }
  if (sessionClaims?.metadata?.onboardingComplete !== true) {
    return { error: 'Completa tu registro para actualizar los datos.' }
  }

  // Server Actions are callable directly; validate inputs again at runtime.
  if (
    typeof resource !== 'string' ||
    !Object.hasOwn(refreshTargets, resource)
  ) {
    return { error: 'El recurso solicitado no es válido.' }
  }

  const target = refreshTargets[resource]
  if (
    !hasRolePermission(sessionClaims?.metadata?.role, target.permission) &&
    !(
      resource === 'events' &&
      hasRolePermission(sessionClaims?.metadata?.role, Permission.EVENTS_CREATE)
    )
  ) {
    return { error: 'No estás autorizado para actualizar estos datos.' }
  }

  updateTag(target.tag)
  if (resource === 'events') updateTag(cacheTags.locationsList())
  if (resource === 'users') {
    updateTag(cacheTags.assignments())
    updateTag(cacheTags.assignmentCatalog())
  }
  if (resource === 'communities') {
    updateTag(cacheTags.usersList())
    updateTag(cacheTags.assignments())
  }
  refresh()
  return { success: true }
}
