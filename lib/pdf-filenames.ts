export const PDF_FILENAMES = {
  fotocheck: 'pastoral-fotocheck.pdf',
  fotochecks: 'pastoral-fotochecks.pdf',
  attendanceCatechesis: 'pastoral-reporte-asistencia-catequesis.pdf',
  attendanceMasses: 'pastoral-reporte-asistencia-misas.pdf',
} as const

export function buildFotocheckFilename(personName?: string) {
  if (!personName) return PDF_FILENAMES.fotochecks

  const name = personName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `pastoral-fotocheck-${name || 'catequista'}.pdf`
}

export function buildAttendanceReportFilename(
  report: 'attendanceCatechesis' | 'attendanceMasses',
  date: Date
) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const dateParts = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  )
  const dateStamp = `${dateParts.year}-${dateParts.month}-${dateParts.day}`

  return `${dateStamp}-${PDF_FILENAMES[report]}`
}

export function filenameFromContentDisposition(
  contentDisposition: string | null,
  fallback: string
) {
  return contentDisposition?.match(/filename="([^"]+)"/i)?.[1] ?? fallback
}
