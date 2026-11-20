import { TZDate } from '@date-fns/tz'
import { getPeruDateKey } from '@/lib/birthday'

export const MASS_REGISTRATION_CLOSED_MESSAGE =
  'El registro de misa está disponible desde el domingo a las 00:00 hasta antes del lunes a las 12:00 p. m.'

export function getMassRegistrationWindow(now = new Date()) {
  const peruNow = new TZDate(now.getTime(), 'America/Lima')
  const opensAt = new TZDate(
    peruNow.getFullYear(),
    peruNow.getMonth(),
    peruNow.getDate() - peruNow.getDay(),
    'America/Lima'
  )
  const closesAt = new Date(opensAt.getTime() + 36 * 60 * 60 * 1000)
  return {
    sundayDate: getPeruDateKey(opensAt),
    closesAt,
    isOpen: now.getTime() >= opensAt.getTime() && now < closesAt,
  }
}
