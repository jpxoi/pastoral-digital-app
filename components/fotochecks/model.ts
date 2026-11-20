import type { CatechistAssignment } from '@/types/assignments'

export interface FotocheckPerson {
  id: string
  name: string
  assignments: Pick<CatechistAssignment, 'type'>[]
}

export const BRAND_BLUE = '#07309b'
export const QR_BLUE = '#001944'
export const PRINT_LOGO = '/brand/optimized/logo-horizontal-400.png'

export function getFotocheckLabel(
  assignments: readonly Pick<CatechistAssignment, 'type'>[]
) {
  if (!assignments.length) return 'Catequista en Formación'
  if (assignments.some((assignment) => assignment.type === 'coordinator'))
    return 'Coordinador'
  if (assignments.length === 1 && assignments[0].type === 'logistics')
    return 'Logística'
  return 'Catequista'
}
