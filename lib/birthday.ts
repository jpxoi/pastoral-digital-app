type BirthdayParts = { year: number; month: number; day: number }

function getBirthdayParts(dateOfBirth: string): BirthdayParts {
  // Database DATE values arrive as YYYY-MM-DD; parse them as calendar dates
  // so JavaScript's UTC parsing cannot shift the birthday in western timezones.
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateOfBirth)
  if (!match) throw new Error('Invalid date format')

  const [, year, month, day] = match
  return { year: Number(year), month: Number(month), day: Number(day) }
}

function getTodayParts(): BirthdayParts {
  const today = new Date()
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  }
}

function createLocalDate({ year, month, day }: BirthdayParts) {
  return new Date(year, month - 1, day)
}

export const getThisYearBirthday = (dateOfBirth: string): Date => {
  const birthdate = getBirthdayParts(dateOfBirth)
  const today = getTodayParts()
  let birthday = createLocalDate({ ...birthdate, year: today.year })

  if (birthday < createLocalDate(today)) {
    birthday = createLocalDate({ ...birthdate, year: today.year + 1 })
  }

  return birthday
}

export const getDaysUntilBirthday = (dateOfBirth: string): number => {
  const birthday = getThisYearBirthday(dateOfBirth)
  const today = getTodayParts()
  const todayUtc = Date.UTC(today.year, today.month - 1, today.day)
  const birthdayUtc = Date.UTC(
    birthday.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  )

  return Math.round((birthdayUtc - todayUtc) / 86_400_000)
}

export const isBirthdayToday = (dateOfBirth: string): boolean =>
  getDaysUntilBirthday(dateOfBirth) === 0

export const getBirthdayRelativeDate = (dateOfBirth: string): string =>
  new Intl.RelativeTimeFormat('es-PE', {
    numeric: 'auto',
    style: 'long',
  }).format(getDaysUntilBirthday(dateOfBirth), 'day')

export const getTurnsAge = (dateOfBirth: string) => {
  const birthdate = getBirthdayParts(dateOfBirth)
  return getThisYearBirthday(dateOfBirth).getFullYear() - birthdate.year
}

export const calculateAge = (dateOfBirth: string) => {
  const today = new Date()
  const birthdate = new Date(dateOfBirth)

  let age = today.getFullYear() - birthdate.getFullYear()
  const m = today.getMonth() - birthdate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--
  }

  return age
}
