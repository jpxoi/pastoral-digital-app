export const getRelativeEventDate = (date: Date) => {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const diffDays = diff / (1000 * 60 * 60 * 24)

  return new Intl.RelativeTimeFormat('es-PE', {
    numeric: 'auto',
  }).format(Math.round(diffDays), 'day')
}

export const isEventToday = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    date.getTime() >= today.getTime() &&
    date.getTime() < today.getTime() + 86400000
  )
}