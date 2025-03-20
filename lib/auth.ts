import { currentUser } from '@clerk/nextjs/server'
import { getUserById } from '@/queries/select'

export async function getUserRole() {
  const user = await currentUser()
  const userDb = await getUserById(user?.id || '')
  const { role } = userDb[0]

  return role
}
