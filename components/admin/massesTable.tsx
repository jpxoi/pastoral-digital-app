import type { ReactNode } from 'react'
import { getAllMasses } from '@/queries/select'
import MassesTableClient from '@/components/admin/massesTableClient'

export default async function MassesTable({
  canReview,
  children,
}: {
  canReview: boolean
  children?: ReactNode
}) {
  const massesRecords = await getAllMasses()

  return (
    <MassesTableClient canReview={canReview} massesRecords={massesRecords}>
      {children}
    </MassesTableClient>
  )
}
