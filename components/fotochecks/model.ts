import type { CatechistAssignment } from '@/types/assignments'
import { assignmentLabels, getAssignmentLabel } from '@/lib/assignments'

export interface FotocheckPerson {
  id: string
  name: string
  assignments: Pick<CatechistAssignment, 'type'>[]
}

export const BRAND_BLUE = '#07309b'
export const QR_BLUE = '#001944'
export const PRINT_LOGO = '/brand/optimized/logo-horizontal-400.png'

export function getFotocheckLabel(assignments: readonly CatechistAssignment[]) {
  return assignments.map(getAssignmentLabel).join(' · ') || 'Sin asignaciones'
}

export function getPrintedFotocheckLabel(
  assignments: readonly Pick<CatechistAssignment, 'type'>[]
) {
  return (
    assignments
      .flatMap((assignment) =>
        assignment.type === 'program' ? [] : [assignmentLabels[assignment.type]]
      )
      .join(' · ') || 'Catequista'
  )
}
