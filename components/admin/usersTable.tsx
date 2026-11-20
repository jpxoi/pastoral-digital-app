import { getAllUsers } from '@/queries/select'
import UsersTableClient from '@/components/admin/usersTableClient'
import type { ReactNode } from 'react'

export default async function UsersTable({
  canSetRole,
  children,
}: {
  canSetRole: boolean
  children?: ReactNode
}) {
  const userRecords = await getAllUsers()

  return (
    <UsersTableClient canSetRole={canSetRole} userRecords={userRecords}>
      {children}
    </UsersTableClient>
  )
}
