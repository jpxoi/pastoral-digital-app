import { getAllUsers } from '@/queries/select'
import UsersTableClient from '@/components/admin/usersTableClient'

export default async function UsersTable({
  canSetRole,
}: {
  canSetRole: boolean
}) {
  const userRecords = await getAllUsers()

  return <UsersTableClient canSetRole={canSetRole} userRecords={userRecords} />
}
