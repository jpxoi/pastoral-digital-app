import { TZDate } from '@date-fns/tz'

// Return plain Dates so Drizzle serializes these boundaries in UTC.
export function getPeruDayRange(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number)
  const start = new TZDate(year, month - 1, day, 'America/Lima')
  const end = new TZDate(year, month - 1, day + 1, 'America/Lima')

  return {
    start: new Date(start.getTime()),
    end: new Date(end.getTime()),
  }
}
