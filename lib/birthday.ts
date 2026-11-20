import { TZDate } from '@date-fns/tz'

type BirthdayParts = { year: number; month: number; day: number }

function getBirthdayParts(dateOfBirth: string): BirthdayParts {
  // Database DATE values arrive as YYYY-MM-DD; parse them as calendar dates
  // so JavaScript's UTC parsing cannot shift the birthday in western timezones.
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateOfBirth)
  if (!match) throw new Error('Invalid date format')

  const [, year, month, day] = match
  return { year: Number(year), month: Number(month), day: Number(day) }
}

function getTodayParts(now = new Date()): BirthdayParts {
  const today = new TZDate(now.getTime(), 'America/Lima')
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  }
}

function createLocalDate({ year, month, day }: BirthdayParts) {
  return new TZDate(year, month - 1, day, 'America/Lima')
}

export const getThisYearBirthday = (
  dateOfBirth: string,
  now = new Date()
): Date => {
  const birthdate = getBirthdayParts(dateOfBirth)
  const today = getTodayParts(now)
  let birthday = createLocalDate({ ...birthdate, year: today.year })

  if (birthday < createLocalDate(today)) {
    birthday = createLocalDate({ ...birthdate, year: today.year + 1 })
  }

  return birthday
}

export const getDaysUntilBirthday = (
  dateOfBirth: string,
  now = new Date()
): number => {
  const birthday = getThisYearBirthday(dateOfBirth, now)
  const today = getTodayParts(now)
  const todayUtc = Date.UTC(today.year, today.month - 1, today.day)
  const birthdayUtc = Date.UTC(
    birthday.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  )

  return Math.round((birthdayUtc - todayUtc) / 86_400_000)
}

export const isBirthdayToday = (
  dateOfBirth: string,
  now = new Date()
): boolean => getDaysUntilBirthday(dateOfBirth, now) === 0

export const getBirthdayRelativeDate = (
  dateOfBirth: string,
  now = new Date()
): string =>
  new Intl.RelativeTimeFormat('es-PE', {
    numeric: 'auto',
    style: 'long',
  }).format(getDaysUntilBirthday(dateOfBirth, now), 'day')

export const getTurnsAge = (dateOfBirth: string, now = new Date()) => {
  const birthdate = getBirthdayParts(dateOfBirth)
  return getThisYearBirthday(dateOfBirth, now).getFullYear() - birthdate.year
}

export const calculateAge = (dateOfBirth: string, now = new Date()) => {
  const today = getTodayParts(now)
  const birthdate = getBirthdayParts(dateOfBirth)
  let age = today.year - birthdate.year
  if (
    today.month < birthdate.month ||
    (today.month === birthdate.month && today.day < birthdate.day)
  )
    age--
  return age
}

export function getPeruDateKey(now = new Date()) {
  const { year, month, day } = getTodayParts(now)
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
