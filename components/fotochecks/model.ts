import type { CatechistAssignment } from '@/types/assignments'
import { getAssignmentLabel } from '@/lib/assignments'

export interface FotocheckPerson {
  id: string
  name: string
  assignments: CatechistAssignment[]
}

export const BRAND_BLUE = '#07309b'
export const QR_BLUE = '#001944'
export const PRINT_LOGO = '/brand/optimized/logo-horizontal-400.png'

export function getFotocheckLabel(assignments: readonly CatechistAssignment[]) {
  return assignments.map(getAssignmentLabel).join(' · ') || 'Sin asignaciones'
}

export function getPrintedFotocheckLabel(
  assignments: readonly CatechistAssignment[]
) {
  const services = assignments.filter(
    (assignment) => assignment.type !== 'program'
  )
  return services.map(getAssignmentLabel).join(' · ') || 'Catequista'
}
