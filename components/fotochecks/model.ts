export interface FotocheckPerson {
  id: string
  name: string
  schedule: string
}

export const BRAND_BLUE = '#07309b'
export const QR_BLUE = '#001944'
export const PRINT_LOGO = '/brand/optimized/logo-horizontal-400.png'

export function getFotocheckLabel(schedule: string) {
  return (
    (
      {
        'full-time': 'Catequista',
        confirmacion: 'Catequista de Confirmación',
        'primera-comunion': 'Catequista de Primera Comunión',
        semilleros: 'Mini Catequista',
        coordinador: 'Coordinador',
        logistica: 'Logística',
      } as Record<string, string>
    )[schedule] ?? 'Catequista'
  )
}

export function getPrintedFotocheckLabel(schedule: string) {
  if (schedule === 'coordinador') return 'Coordinador'
  if (schedule === 'logistica') return 'Logística'
  if (schedule === 'semilleros') return 'Semillero'
  return 'Catequista'
}
