export const isBirthdayToday = (dateOfBirth: string): boolean => {
  const today = new Date()
  const birthdate = new Date(dateOfBirth)

  if (isNaN(birthdate.getTime())) return false

  return (
    today.getDate() === birthdate.getDate() &&
    today.getMonth() === birthdate.getMonth()
  )
}

export const getThisYearBirthday = (dateOfBirth: string): Date => {
  const today = new Date()
  const birthdate = new Date(dateOfBirth)

  if (isNaN(birthdate.getTime())) throw new Error('Invalid date format')

  return new Date(
    today.getFullYear(),
    birthdate.getMonth(),
    birthdate.getDate()
  )
}

export const getBirthdayRelativeDate = (dateOfBirth: string): string => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const birthdateThisYear = getThisYearBirthday(dateOfBirth)

  if (birthdateThisYear < today) {
    birthdateThisYear.setFullYear(today.getFullYear() + 1)
  }

  const dayDiff = Math.ceil(
    (birthdateThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  return new Intl.RelativeTimeFormat('es-ES', {
    numeric: 'auto',
    style: 'long',
  }).format(dayDiff, 'day')
}

export const getTurnsAge = (dateOfBirth: string) => {
  const today = new Date()
  const birthdate = new Date(dateOfBirth)

  const age = today.getFullYear() - birthdate.getFullYear();


  return age
}
