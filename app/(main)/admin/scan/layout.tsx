import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export default async function ScanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requirePermission(Permission.ATTENDANCE_SCAN)
  return children
}
