import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from 'pdf-lib'
import { UserCategory } from '@/types'

export type AttendanceCalendarPdfPerson = {
  fullName: string
  category: UserCategory
  studentCode: string | null
  attendance: Record<string, string | null>
}

const PAGE_WIDTH = 841.89
const PAGE_HEIGHT = 595.28
const MARGIN = 28
const HEADER_HEIGHT = 50
const TABLE_HEADER_HEIGHT = 22
const ROW_HEIGHT = 18
const FIXED_WIDTHS = [25, 171, 66, 62]
const MAX_DATES_PER_PAGE = 20

function printable(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function drawText(
  page: PDFPage,
  text: string,
  x: number,
  top: number,
  options: { font: PDFFont; size: number; color?: ReturnType<typeof rgb> }
) {
  page.drawText(printable(text), {
    x,
    y: PAGE_HEIGHT - top - options.size,
    font: options.font,
    size: options.size,
    color: options.color ?? rgb(0.12, 0.16, 0.14),
  })
}

function drawCenteredText(
  page: PDFPage,
  text: string,
  x: number,
  width: number,
  top: number,
  font: PDFFont,
  size: number,
  color = rgb(0.12, 0.16, 0.14)
) {
  const label = printable(text)
  const textWidth = font.widthOfTextAtSize(label, size)
  drawText(page, label, x + Math.max(2, (width - textWidth) / 2), top, {
    font,
    size,
    color,
  })
}

function drawCellText(
  page: PDFPage,
  text: string,
  x: number,
  width: number,
  top: number,
  font: PDFFont,
  size: number,
  color = rgb(0.12, 0.16, 0.14)
) {
  let label = printable(text)
  while (label.length > 1 && font.widthOfTextAtSize(label, size) > width - 8) {
    label = `${label.slice(0, -2)}...`
  }
  drawText(page, label, x + 4, top, { font, size, color })
}

function categoryLabel(category: UserCategory) {
  switch (category) {
    case UserCategory.STUDENT:
      return 'Alumno'
    case UserCategory.ALUMNI:
      return 'Exalumno'
    case UserCategory.TEACHER:
      return 'Profesor'
  }
}

function attendanceLabel(status: string | null | undefined) {
  switch (status) {
    case 'A TIEMPO':
      return 'A'
    case 'TARDANZA':
      return 'T'
    case 'DOBLE TARDANZA':
      return 'TT'
    case 'FALTA INJUSTIFICADA':
      return 'F'
    case 'FALTA JUSTIFICADA':
      return 'FJ'
    case 'TARDANZA JUSTIFICADA':
      return 'TJ'
    default:
      return '-'
  }
}

function statusColor(status: string | null | undefined) {
  switch (status) {
    case 'A TIEMPO':
      return rgb(0.13, 0.45, 0.29)
    case 'TARDANZA':
      return rgb(0.63, 0.43, 0.02)
    case 'DOBLE TARDANZA':
      return rgb(0.73, 0.31, 0.06)
    case 'FALTA INJUSTIFICADA':
      return rgb(0.68, 0.18, 0.18)
    case 'FALTA JUSTIFICADA':
      return rgb(0.16, 0.36, 0.67)
    case 'TARDANZA JUSTIFICADA':
      return rgb(0.45, 0.25, 0.63)
    default:
      return rgb(0.42, 0.45, 0.44)
  }
}

function formatDateKey(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('es-PE', {
    timeZone: 'UTC',
    day: '2-digit',
    month: '2-digit',
  })
}

function drawPageHeader(
  page: PDFPage,
  generatedAt: string,
  reportTitle: string,
  bold: PDFFont
) {
  drawText(page, reportTitle, MARGIN, 22, {
    font: bold,
    size: 9,
    color: rgb(0.03, 0.19, 0.61),
  })
  const labelWidth = bold.widthOfTextAtSize(printable(generatedAt), 6.5)
  drawText(page, generatedAt, PAGE_WIDTH - MARGIN - labelWidth, 24, {
    font: bold,
    size: 6.5,
    color: rgb(0.35, 0.39, 0.37),
  })
}

export async function generateAttendanceCalendarPdf(
  people: AttendanceCalendarPdfPerson[],
  dateKeys: string[],
  generatedAt: string,
  reportTitle = 'REPORTE ASISTENCIA CATEQUESIS'
) {
  const pdf = await PDFDocument.create()
  pdf.setTitle(reportTitle)
  pdf.setAuthor('Pastoral Mariana')
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const orderedPeople = [...people].sort((a, b) =>
    a.fullName.localeCompare(b.fullName, 'es', { sensitivity: 'base' })
  )
  const dateGroups: string[][] = []
  for (let index = 0; index < dateKeys.length; index += MAX_DATES_PER_PAGE) {
    dateGroups.push(dateKeys.slice(index, index + MAX_DATES_PER_PAGE))
  }
  if (dateGroups.length === 0) dateGroups.push([])

  const fixedWidth = FIXED_WIDTHS.reduce((sum, width) => sum + width, 0)
  const rowCapacity = Math.max(
    1,
    Math.floor(
      (PAGE_HEIGHT - HEADER_HEIGHT - TABLE_HEADER_HEIGHT - MARGIN) / ROW_HEIGHT
    )
  )
  const rowGroups: AttendanceCalendarPdfPerson[][] = []
  for (let index = 0; index < orderedPeople.length; index += rowCapacity) {
    rowGroups.push(orderedPeople.slice(index, index + rowCapacity))
  }
  if (rowGroups.length === 0) rowGroups.push([])

  const generatedLabel = generatedAt

  for (const dates of dateGroups) {
    const dateWidth = dates.length
      ? (PAGE_WIDTH - MARGIN * 2 - fixedWidth) / dates.length
      : 0
    for (
      let rowGroupIndex = 0;
      rowGroupIndex < rowGroups.length;
      rowGroupIndex += 1
    ) {
      const rows = rowGroups[rowGroupIndex]
      const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])
      drawPageHeader(page, generatedLabel, reportTitle, bold)

      const tableTop = HEADER_HEIGHT
      const totalTableWidth = PAGE_WIDTH - MARGIN * 2
      page.drawRectangle({
        x: MARGIN,
        y: PAGE_HEIGHT - tableTop - TABLE_HEADER_HEIGHT,
        width: totalTableWidth,
        height: TABLE_HEADER_HEIGHT,
        color: rgb(0.03, 0.19, 0.61),
      })

      const headers = ['N.', 'Nombre completo', 'Tipo', 'Código']
      let x = MARGIN
      headers.forEach((header, index) => {
        drawText(page, header, x + 4, tableTop + 7, {
          font: bold,
          size: 7,
          color: rgb(1, 1, 1),
        })
        x += FIXED_WIDTHS[index]
      })
      dates.forEach((dateKey) => {
        drawCenteredText(
          page,
          formatDateKey(dateKey),
          x,
          dateWidth,
          tableTop + 8,
          bold,
          6,
          rgb(1, 1, 1)
        )
        x += dateWidth
      })

      rows.forEach((person, rowIndex) => {
        const top = tableTop + TABLE_HEADER_HEIGHT + rowIndex * ROW_HEIGHT
        const fill = rowIndex % 2 === 0 ? rgb(0.94, 0.96, 1) : rgb(1, 1, 1)
        page.drawRectangle({
          x: MARGIN,
          y: PAGE_HEIGHT - top - ROW_HEIGHT,
          width: totalTableWidth,
          height: ROW_HEIGHT,
          color: fill,
        })
        let cellX = MARGIN
        drawCenteredText(
          page,
          String(rowGroupIndex * rowCapacity + rowIndex + 1),
          cellX,
          FIXED_WIDTHS[0],
          top + 5,
          regular,
          7
        )
        cellX += FIXED_WIDTHS[0]
        drawCellText(
          page,
          person.fullName,
          cellX,
          FIXED_WIDTHS[1],
          top + 5,
          regular,
          7
        )
        cellX += FIXED_WIDTHS[1]
        drawCellText(
          page,
          categoryLabel(person.category),
          cellX,
          FIXED_WIDTHS[2],
          top + 5,
          regular,
          7
        )
        cellX += FIXED_WIDTHS[2]
        drawCellText(
          page,
          person.category === UserCategory.STUDENT
            ? (person.studentCode ?? '')
            : '',
          cellX,
          FIXED_WIDTHS[3],
          top + 5,
          regular,
          7
        )
        cellX += FIXED_WIDTHS[3]

        dates.forEach((dateKey) => {
          const status = person.attendance[dateKey]
          drawCenteredText(
            page,
            attendanceLabel(status),
            cellX,
            dateWidth,
            top + 5,
            bold,
            7,
            statusColor(status)
          )
          cellX += dateWidth
        })
      })
    }
  }

  return pdf.save()
}
