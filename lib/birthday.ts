export const isBirthdayToday = (date: string) => {
  const today = new Date()
  const birthdate = new Date(date)
  return (
    today.getDate() === birthdate.getDate() &&
    today.getMonth() === birthdate.getMonth()
  )
}

export const getThisYearBirthday = (date: string) => {
  const today = new Date()
  const birthdate = new Date(date)
  return new Date(
    today.getFullYear(),
    birthdate.getMonth(),
    birthdate.getDate()
  )
}

export const getBirthdayRelativeDate = (date: string) => {
  const today = new Date()
  const birthdateThisYear = getThisYearBirthday(date)

  const dayDiff = Math.ceil(
    (birthdateThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  return new Intl.RelativeTimeFormat('es-ES', {
    numeric: 'auto',
    style: 'long',
  }).format(dayDiff, 'day')
}

export const getTurnsAge = (date: string) => {
  const today = new Date()
  const birthdate = new Date(date)

  return today.getFullYear() - birthdate.getFullYear()
}
