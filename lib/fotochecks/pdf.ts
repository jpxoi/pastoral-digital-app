import {
  PDFDocument,
  PageSizes,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from 'pdf-lib'
import QRCode from 'qrcode'
import {
  BRAND_BLUE,
  QR_BLUE,
  getPrintedFotocheckLabel,
  type FotocheckPerson,
} from '@/components/fotochecks/model'

const mm = (value: number) => (value * 72) / 25.4
function color(hex: string) {
  return rgb(
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255
  )
}

function printable(text: string, font: PDFFont) {
  return Array.from(text.normalize('NFC'))
    .map((character) => {
      try {
        font.encodeText(character)
        return character
      } catch {
        return '?'
      }
    })
    .join('')
}

function wrapName(text: string, font: PDFFont, size: number, width: number) {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(next, size) <= width) {
      line = next
      continue
    }
    if (line) lines.push(line)
    line = ''
    for (const letter of word) {
      if (line && font.widthOfTextAtSize(line + letter, size) > width) {
        lines.push(line)
        line = ''
      }
      line += letter
    }
  }
  if (line) lines.push(line)
  return lines
}

function cropMarks(page: PDFPage, x: number, top: number) {
  // The outline is the finished 90 × 115 mm cut size, not an added margin.
  page.drawRectangle({
    x,
    y: top - mm(115),
    width: mm(90),
    height: mm(115),
    borderColor: rgb(0.55, 0.6, 0.65),
    borderWidth: 0.4,
    borderDashArray: [2, 2],
    borderOpacity: 0.8,
  })
  for (const [index, [cx, cy]] of [
    [x, top],
    [x + mm(90), top],
    [x, top - mm(115)],
    [x + mm(90), top - mm(115)],
  ].entries()) {
    const dx = index % 2 === 0 ? -1 : 1
    const dy = index < 2 ? 1 : -1
    const style = { thickness: 0.5, color: rgb(0.4, 0.45, 0.5) }
    page.drawLine({
      start: { x: cx + dx * mm(1), y: cy },
      end: { x: cx + dx * mm(4), y: cy },
      ...style,
    })
    page.drawLine({
      start: { x: cx, y: cy + dy * mm(1) },
      end: { x: cx, y: cy + dy * mm(4) },
      ...style,
    })
  }
}

export async function generateFotocheckPdf(
  people: FotocheckPerson[],
  logoBytes: Uint8Array
) {
  if (!people.length)
    throw new Error('No hay catequistas para generar fotochecks.')
  const pdf = await PDFDocument.create()
  pdf.setTitle('Fotochecks - Pastoral Mariana')
  pdf.setAuthor('Pastoral Mariana')
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const logo = await pdf.embedPng(logoBytes)
  const [width, height] = PageSizes.A4
  let page: PDFPage | undefined
  for (const [index, person] of people.entries()) {
    if (index % 4 === 0) page = pdf.addPage([width, height])
    const sheet = page!
    const slot = index % 4
    const x = mm(10 + (slot % 2) * 100)
    const top = height - mm(28.5 + Math.floor(slot / 2) * 125)
    const scale = mm(90) / 900
    sheet.drawRectangle({
      x,
      y: top - mm(115),
      width: mm(90),
      height: mm(115),
      color: rgb(1, 1, 1),
    })
    for (const [path, fill] of [
      [
        'M760 0H900V220C830 200 810 160 790 120C770 80 770 30 760 0Z',
        '#1d5fd3',
      ],
      [
        'M0 950C180 1020 310 960 470 970C650 980 730 1010 900 930V1150H0Z',
        '#1d5fd3',
      ],
      [
        'M0 920C190 1030 380 1040 560 1050C720 1060 820 1090 900 1150H0Z',
        BRAND_BLUE,
      ],
    ])
      sheet.drawSvgPath(path, { x, y: top, scale, color: color(fill) })
    // Fine interlaced curves frame the card without entering the QR quiet zone.
    for (let line = 0; line < 7; line++) {
      const offset = line * 10
      sheet.drawSvgPath(
        `M0 ${45 + offset}C${100 + offset} ${100 + offset} ${155 + offset} ${160 + offset} 0 ${245 + offset}`,
        {
          x,
          y: top,
          scale,
          borderColor: color(BRAND_BLUE),
          borderWidth: 0.45,
          borderOpacity: 0.16,
        }
      )
      sheet.drawSvgPath(
        `M0 ${1045 + offset}C220 ${990 + offset} 520 ${1150 - offset} 900 ${1020 + offset}`,
        {
          x,
          y: top,
          scale,
          borderColor: rgb(1, 1, 1),
          borderWidth: 0.4,
          borderOpacity: 0.16,
        }
      )
    }
    const logoWidth = mm(42)
    const logoHeight = (logo.height / logo.width) * logoWidth
    sheet.drawImage(logo, {
      x: x + mm(24),
      y: top - mm(8) - logoHeight,
      width: logoWidth,
      height: logoHeight,
    })
    const name = printable(person.name, bold)
    let fontSize = 17
    let lines = wrapName(name, bold, fontSize, mm(78))
    while (
      (lines.length > 3 || lines.length * fontSize * 1.15 > mm(19)) &&
      fontSize > 6
    ) {
      fontSize -= 0.5
      lines = wrapName(name, bold, fontSize, mm(78))
    }
    if (lines.length * fontSize * 1.15 > mm(19))
      throw new Error('Un nombre excede el espacio del fotocheck.')
    const firstBaseline =
      top - mm(31) - (mm(19) - lines.length * fontSize * 1.15) / 2 - fontSize
    lines.forEach((line, row) =>
      sheet.drawText(line, {
        x: x + (mm(90) - bold.widthOfTextAtSize(line, fontSize)) / 2,
        y: firstBaseline - row * fontSize * 1.15,
        font: bold,
        size: fontSize,
        color: color(QR_BLUE),
      })
    )
    const label = getPrintedFotocheckLabel(person.schedule).toLocaleUpperCase(
      'es-PE'
    )
    sheet.drawText(label, {
      x: x + (mm(90) - regular.widthOfTextAtSize(label, 7)) / 2,
      y: firstBaseline - (lines.length - 1) * fontSize * 1.15 - mm(5),
      font: regular,
      size: 7,
      color: color(QR_BLUE),
    })
    // Draw QR modules directly as vector paths. No React, DOM, SVG parsing or external endpoint.
    const qr = QRCode.create(person.id, { errorCorrectionLevel: 'Q' })
    const quiet = 4
    const unit = mm(41) / (qr.modules.size + quiet * 2)
    const qrX = x + mm(24.5)
    const qrTop = top - mm(53)
    sheet.drawRectangle({
      x: qrX,
      y: qrTop - mm(41),
      width: mm(41),
      height: mm(41),
      color: rgb(1, 1, 1),
    })
    let qrPath = ''
    for (let row = 0; row < qr.modules.size; row++) {
      for (let column = 0; column < qr.modules.size; column++) {
        if (qr.modules.get(row, column))
          qrPath += `M${column + quiet} ${row + quiet}h1v1h-1z`
      }
    }
    sheet.drawSvgPath(qrPath, {
      x: qrX,
      y: qrTop,
      scale: unit,
      color: color(QR_BLUE),
    })
    cropMarks(sheet, x, top)
  }
  return pdf.save()
}
