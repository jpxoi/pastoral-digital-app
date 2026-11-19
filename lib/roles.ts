'use server'

import { hasRolePermission } from '@/lib/permissions'
import { Permission } from '@/types/permissions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const checkPermission = async (permission: Permission) => {
  const { sessionClaims } = await auth()
  return hasRolePermission(sessionClaims?.metadata?.role, permission)
}

export const requirePermission = async (permission: Permission) => {
  const { sessionClaims } = await auth.protect()

  if (!hasRolePermission(sessionClaims?.metadata?.role, permission)) {
    redirect('/dashboard')
  }
}
