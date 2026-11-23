import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from 'pdf-lib'
import { AttendanceStatus, UserCategory } from '@/types'

export type AttendanceCalendarPdfPerson = {
  userId: string
  fullName: string
  category: UserCategory
  studentCode: string | null
  attendance: Record<string, string | null>
}

const A4_SHORT_SIDE = 595.28
const A4_LONG_SIDE = 841.89
const MAX_PORTRAIT_DATES = 8
const MARGIN = 28
const HEADER_HEIGHT = 50
const TABLE_HEADER_HEIGHT = 20
const ROW_HEIGHT = 18
const FIXED_WIDTHS = [25, 237, 62]
const GROUP_HEADER_HEIGHT = 18
const SUMMARY_HEIGHT = 48
const SUMMARY_GAP = 14
const MAX_DATES_PER_PAGE = 30
const GROUP_GAP = 12

function drawTableBackground(
  page: PDFPage,
  top: number,
  height: number,
  color: ReturnType<typeof rgb>,
  roundTop = false,
  roundBottom = false
) {
  const width = page.getWidth() - MARGIN * 2
  const upper = roundTop ? 3 : 0
  const lower = roundBottom ? 3 : 0
  const curve = 0.5522847498
  page.drawSvgPath(
    `M ${upper} 0 H ${width - upper}
     C ${width - upper * (1 - curve)} 0 ${width} ${upper * (1 - curve)} ${width} ${upper}
     V ${height - lower}
     C ${width} ${height - lower * (1 - curve)} ${width - lower * (1 - curve)} ${height} ${width - lower} ${height}
     H ${lower}
     C ${lower * (1 - curve)} ${height} 0 ${height - lower * (1 - curve)} 0 ${height - lower}
     V ${upper}
     C 0 ${upper * (1 - curve)} ${upper * (1 - curve)} 0 ${upper} 0 Z`,
    { x: MARGIN, y: page.getHeight() - top, color }
  )
}

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
    y: page.getHeight() - top - options.size,
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

function attendanceLabel(status: string | null | undefined) {
  switch (status) {
    case AttendanceStatus.A_TIEMPO:
      return 'A'
    case AttendanceStatus.TARDANZA:
      return 'T'
    case AttendanceStatus.FALTA_INJUSTIFICADA:
      return 'F'
    case AttendanceStatus.FALTA_JUSTIFICADA:
      return 'FJ'
    case AttendanceStatus.TARDANZA_JUSTIFICADA:
      return 'TJ'
    default:
      return '-'
  }
}

function statusColor(status: string | null | undefined) {
  switch (status) {
    case AttendanceStatus.A_TIEMPO:
      return rgb(0.13, 0.45, 0.29)
    case AttendanceStatus.TARDANZA:
      return rgb(0.63, 0.43, 0.02)
    case AttendanceStatus.FALTA_INJUSTIFICADA:
      return rgb(0.68, 0.18, 0.18)
    case AttendanceStatus.FALTA_JUSTIFICADA:
      return rgb(0.16, 0.36, 0.67)
    case AttendanceStatus.TARDANZA_JUSTIFICADA:
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
  drawText(page, generatedAt, page.getWidth() - MARGIN - labelWidth, 24, {
    font: bold,
    size: 6.5,
    color: rgb(0.35, 0.39, 0.37),
  })
}

function drawSummary(
  page: PDFPage,
  items: { label: string; value: number }[],
  regular: PDFFont,
  bold: PDFFont
) {
  const gap = 8
  const width =
    (page.getWidth() - MARGIN * 2 - gap * (items.length - 1)) / items.length
  items.forEach((item, index) => {
    const x = MARGIN + index * (width + gap)
    const height = SUMMARY_HEIGHT
    const radius = 4
    const control = radius * (1 - 0.5522847498)
    page.drawSvgPath(
      `M ${radius} 0 H ${width - radius}
       C ${width - control} 0 ${width} ${control} ${width} ${radius}
       V ${height - radius}
       C ${width} ${height - control} ${width - control} ${height} ${width - radius} ${height}
       H ${radius}
       C ${control} ${height} 0 ${height - control} 0 ${height - radius}
       V ${radius}
       C 0 ${control} ${control} 0 ${radius} 0 Z`,
      {
        x,
        y: page.getHeight() - HEADER_HEIGHT,
        color: rgb(0.97, 0.97, 0.97),
        borderColor: rgb(0.87, 0.87, 0.87),
        borderWidth: 0.5,
      }
    )
    drawText(page, item.label.toUpperCase(), x + 10, HEADER_HEIGHT + 8, {
      font: regular,
      size: 7,
      color: rgb(0.42, 0.42, 0.42),
    })
    drawText(page, String(item.value), x + 10, HEADER_HEIGHT + 21, {
      font: bold,
      size: 17,
      color: rgb(0.18, 0.18, 0.18),
    })
  })
}

export async function generateAttendanceCalendarPdf(
  people: AttendanceCalendarPdfPerson[],
  dateKeys: string[],
  generatedAt: string,
  reportTitle = 'REPORTE ASISTENCIA CATEQUESIS'
) {
  const portrait = dateKeys.length <= MAX_PORTRAIT_DATES
  const pageWidth = portrait ? A4_SHORT_SIDE : A4_LONG_SIDE
  const pageHeight = portrait ? A4_LONG_SIDE : A4_SHORT_SIDE
  const tableBottom = pageHeight - MARGIN - 12
  const pdf = await PDFDocument.create()
  pdf.setTitle(reportTitle)
  pdf.setAuthor('Pastoral Mariana')
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const collator = new Intl.Collator('es', { sensitivity: 'base' })
  const categories = [
    { category: UserCategory.STUDENT, label: 'Alumnos' },
    { category: UserCategory.ALUMNI, label: 'Exalumnos' },
    { category: UserCategory.TEACHER, label: 'Profesores' },
  ]
  const groups = categories.map(({ category, label }) => ({
    category,
    label,
    people: people
      .filter((person) => person.category === category)
      .sort(
        (a, b) =>
          collator.compare(a.fullName, b.fullName) ||
          a.userId.localeCompare(b.userId)
      ),
  }))
  const dateGroups: string[][] = []
  for (let index = 0; index < dateKeys.length; index += MAX_DATES_PER_PAGE) {
    dateGroups.push(dateKeys.slice(index, index + MAX_DATES_PER_PAGE))
  }
  if (dateGroups.length === 0) dateGroups.push([])

  for (const dates of dateGroups) {
    let page: PDFPage | undefined
    let tableTop = HEADER_HEIGHT

    for (const group of groups) {
      const widths =
        group.category === UserCategory.STUDENT
          ? FIXED_WIDTHS
          : [FIXED_WIDTHS[0], FIXED_WIDTHS[1] + FIXED_WIDTHS[2]]
      const fixedWidth = widths.reduce((sum, width) => sum + width, 0)
      const totalTableWidth = pageWidth - MARGIN * 2
      const dateWidth = dates.length
        ? (totalTableWidth - fixedWidth) / dates.length
        : 0
      let offset = 0

      if (page && group.people.length > 0) tableTop += GROUP_GAP

      while (offset < group.people.length) {
        if (
          !page ||
          tableTop + GROUP_HEADER_HEIGHT + TABLE_HEADER_HEIGHT + ROW_HEIGHT >
            tableBottom
        ) {
          page = pdf.addPage([pageWidth, pageHeight])
          drawPageHeader(page, generatedAt, reportTitle, bold)
          tableTop = HEADER_HEIGHT
          if (pdf.getPageCount() === 1) {
            drawSummary(
              page,
              [
                { label: 'Total de catequistas', value: people.length },
                ...groups.map((item) => ({
                  label: item.label,
                  value: item.people.length,
                })),
              ],
              regular,
              bold
            )
            tableTop += SUMMARY_HEIGHT + SUMMARY_GAP
          }
        }

        drawTableBackground(
          page,
          tableTop,
          GROUP_HEADER_HEIGHT,
          rgb(0.88, 0.93, 1),
          true
        )
        const groupLabel = group.label.toUpperCase()
        const groupLabelSize = 6.5
        drawText(
          page,
          groupLabel,
          MARGIN + 4,
          tableTop + (GROUP_HEADER_HEIGHT - groupLabelSize) / 2,
          { font: bold, size: groupLabelSize }
        )
        if (offset > 0) {
          const labelWidth = bold.widthOfTextAtSize(groupLabel, groupLabelSize)
          const continuationSize = 5.5
          drawText(
            page,
            '(continuación)',
            MARGIN + 4 + labelWidth + 4,
            tableTop + (GROUP_HEADER_HEIGHT - continuationSize) / 2,
            {
              font: regular,
              size: continuationSize,
              color: rgb(0.42, 0.45, 0.49),
            }
          )
        }
        tableTop += GROUP_HEADER_HEIGHT
        page.drawRectangle({
          x: MARGIN,
          y: page.getHeight() - tableTop - TABLE_HEADER_HEIGHT,
          width: totalTableWidth,
          height: TABLE_HEADER_HEIGHT,
          color: rgb(0.03, 0.19, 0.61),
        })

        const headers =
          group.category === UserCategory.STUDENT
            ? ['N.', 'Nombre completo', 'Código']
            : ['N.', 'Nombre completo']
        let x = MARGIN
        headers.forEach((header, index) => {
          drawText(page!, header, x + 4, tableTop + 6, {
            font: bold,
            size: 7,
            color: rgb(1, 1, 1),
          })
          x += widths[index]
        })
        dates.forEach((dateKey) => {
          const label = formatDateKey(dateKey)
          const fontSize = Math.min(
            6,
            (dateWidth - 2) / bold.widthOfTextAtSize(label, 1)
          )
          drawCenteredText(
            page!,
            label,
            x,
            dateWidth,
            tableTop + (TABLE_HEADER_HEIGHT - fontSize) / 2,
            bold,
            fontSize,
            rgb(1, 1, 1)
          )
          x += dateWidth
        })
        tableTop += TABLE_HEADER_HEIGHT

        const capacity = Math.floor((tableBottom - tableTop) / ROW_HEIGHT)
        const rows = group.people.slice(offset, offset + capacity)
        rows.forEach((person, rowIndex) => {
          const top = tableTop + rowIndex * ROW_HEIGHT
          drawTableBackground(
            page!,
            top,
            ROW_HEIGHT,
            rowIndex % 2 === 0 ? rgb(0.94, 0.96, 1) : rgb(1, 1, 1),
            false,
            rowIndex === rows.length - 1
          )
          let cellX = MARGIN
          drawCenteredText(
            page!,
            String(offset + rowIndex + 1),
            cellX,
            widths[0],
            top + 5,
            regular,
            7
          )
          cellX += widths[0]
          drawCellText(
            page!,
            person.fullName,
            cellX,
            widths[1],
            top + 5,
            regular,
            7
          )
          cellX += widths[1]
          if (group.category === UserCategory.STUDENT) {
            drawCellText(
              page!,
              person.studentCode ?? '',
              cellX,
              widths[2],
              top + 5,
              regular,
              7
            )
            cellX += widths[2]
          }
          dates.forEach((dateKey) => {
            const status = person.attendance[dateKey]
            drawCenteredText(
              page!,
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
        offset += rows.length
        tableTop += rows.length * ROW_HEIGHT
      }
    }
  }

  const pages = pdf.getPages()
  pages.forEach((page, index) => {
    const label = `Página ${index + 1} de ${pages.length}`
    const size = 7
    page.drawText(label, {
      x: page.getWidth() - MARGIN - regular.widthOfTextAtSize(label, size),
      y: 18,
      font: regular,
      size,
      color: rgb(0.42, 0.45, 0.44),
    })
  })

  return pdf.save()
}
