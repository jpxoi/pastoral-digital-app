import { getAllUsers } from '@/queries/select'
import UsersTableClient from '@/components/admin/usersTableClient'
import type { ReactNode } from 'react'
import { getAssignmentCatalog } from '@/queries/assignments'

export default async function UsersTable({
  canSetRole,
  children,
}: {
  canSetRole: boolean
  children?: ReactNode
}) {
  const [userRecords, catalog] = await Promise.all([
    getAllUsers(),
    getAssignmentCatalog(),
  ])

  return (
    <UsersTableClient
      canSetRole={canSetRole}
      userRecords={userRecords}
      catalog={catalog}
    >
      {children}
    </UsersTableClient>
  )
}
