import type { ReactNode } from 'react'
import { getAllMasses } from '@/queries/select'
import MassesTableClient from '@/components/admin/massesTableClient'

export default async function MassesTable({
  children,
}: {
  children?: ReactNode
}) {
  const massesRecords = await getAllMasses()

  return (
    <MassesTableClient massesRecords={massesRecords}>
      {children}
    </MassesTableClient>
  )
}
