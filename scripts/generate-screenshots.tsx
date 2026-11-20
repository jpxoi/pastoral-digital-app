import sharp from 'sharp'
import { copyFile, mkdir, mkdtemp, readFile, rm, stat } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { DashboardSvg } from '../components/marketing/dashboard-svg'
import { DashboardMobileSvg } from '../components/marketing/dashboard-mobile-svg'
import { IdCardSvg } from '../components/marketing/id-card-svg'
import { ScanSvg } from '../components/marketing/scan-svg'

type Artwork = { svg: string; width: number; height: number }
type Screenshot = {
  file: string
  wide?: boolean
  presentation: 'phone' | 'card' | 'scanner' | 'window'
  focusRecords?: boolean
  heading: string[]
  description: string
  artwork: Artwork
}

const root = process.cwd()
const outputDirectory = path.join(root, 'public/screenshots')

function artwork(svg: string): Artwork {
  const dimensions = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
  if (!dimensions) throw new Error('El SVG fuente necesita un viewBox.')
  return { svg, width: Number(dimensions[1]), height: Number(dimensions[2]) }
}

function place(source: Artwork, x: number, y: number, width: number) {
  const height = (width * source.height) / source.width
  return source.svg.replace(
    /^<svg\b/,
    `<svg x="${x}" y="${y}" width="${width}" height="${height}"`
  )
}

async function embedImages(svg: string) {
  const urls = [
    ...new Set(
      [...svg.matchAll(/href="(\/brand\/[^"<>]+)"/g)].map((match) => match[1])
    ),
  ]
  for (const url of urls) {
    const bytes = await readFile(path.join(root, 'public', url))
    svg = svg.replaceAll(
      `href="${url}"`,
      `href="data:image/png;base64,${bytes.toString('base64')}"`
    )
  }
  return svg
}

function compose(screen: Screenshot, logo: string) {
  const width = screen.wide ? 1920 : 1080
  const height = screen.wide ? 1218 : 1920
  const heading = screen.heading
    .map(
      (line, index) =>
        `<text x="80" y="${(screen.wide ? 430 : 300) + index * 82}" fill="#ffffff" font-size="64" font-weight="700">${line}</text>`
    )
    .join('')
  let visual: string
  if (screen.presentation === 'card') {
    visual = `<circle cx="540" cy="1250" r="510" fill="#103477"/><circle cx="540" cy="1250" r="580" fill="none" stroke="#244477" stroke-width="2"/>
      <g transform="rotate(-7 540 1250)" filter="url(#shadow)">${place(screen.artwork, 170, 740, 740)}</g>`
  } else if (screen.presentation === 'window') {
    visual = `<g transform="translate(800 365)" filter="url(#shadow)">
      <rect width="1286" height="811" rx="28" fill="#102d5b" stroke="#3a5684" stroke-width="3"/>
      <circle cx="30" cy="28" r="5" fill="#7893b9"/><circle cx="50" cy="28" r="5" fill="#7893b9"/><circle cx="70" cy="28" r="5" fill="#7893b9"/>
      <rect x="390" y="16" width="360" height="24" rx="8" fill="#061b46"/>
      ${place(screen.artwork, 18, 56, 1250)}
    </g>`
  } else if (
    !screen.wide &&
    (screen.presentation === 'scanner' || screen.focusRecords)
  ) {
    const frameX = 80
    const frameY = 740
    const frameWidth = 920
    const frameInset = 12
    const artWidth = frameWidth - frameInset * 2
    const isRecords = Boolean(screen.focusRecords)
    const source = isRecords
      ? {
          ...screen.artwork,
          svg: screen.artwork.svg.replace(
            'viewBox="0 0 390 780"',
            'viewBox="0 420 390 340"'
          ),
          height: 340,
        }
      : screen.artwork
    const panelArtwork = {
      ...source,
      svg: source.svg.replace(/<rect\b[^>]*>(?:<\/rect>)?/, ''),
    }
    const frameHeight =
      (artWidth * source.height) / source.width + frameInset * 2
    visual = `<g filter="url(#shadow)">
      <rect x="${frameX}" y="${frameY}" width="${frameWidth}" height="${frameHeight}" rx="40" fill="#102d5b" stroke="#3a5684" stroke-width="3"/>
      <defs><clipPath id="panel-content"><rect x="${frameX + frameInset}" y="${frameY + frameInset}" width="${artWidth}" height="${frameHeight - frameInset * 2}" rx="28"/></clipPath></defs>
      <g clip-path="url(#panel-content)"><rect x="${frameX + frameInset}" y="${frameY + frameInset}" width="${artWidth}" height="${frameHeight - frameInset * 2}" fill="#fff"/>${place(panelArtwork, frameX + frameInset, frameY + frameInset, artWidth)}</g>
    </g>`
  } else {
    const x = screen.wide ? 1070 : 130
    const compact =
      !screen.wide && (screen.presentation === 'scanner' || screen.focusRecords)
    const y = screen.wide ? 230 : compact ? 740 : 650
    const w = screen.wide ? 680 : 820
    const h = screen.wide ? 1330 : compact ? 940 : 1700
    const uiY =
      screen.presentation === 'scanner'
        ? y + (screen.wide ? 240 : 100)
        : y + 100 - (screen.focusRecords ? 850 : 0)
    const cornerRadius = Math.round(w * 0.17)
    const phoneArtwork = {
      ...screen.artwork,
      // The device supplies the white surface and clipping; omit the preview's own frame.
      svg: screen.artwork.svg.replace(/<rect\b[^>]*>(?:<\/rect>)?/, ''),
    }
    visual = `<g transform="rotate(${screen.wide ? 7 : -3} ${x + w / 2} ${y + h / 2})">
      <rect x="${x - 7}" y="${y - 7}" width="${w + 14}" height="${h + 14}" rx="${cornerRadius + 7}" fill="#294266" filter="url(#shadow)"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${cornerRadius}" fill="#09101e" stroke="#52647d" stroke-width="3"/>
      <defs><clipPath id="screen"><rect x="${x + 18}" y="${y + 18}" width="${w - 36}" height="${h - 36}" rx="${cornerRadius - 18}"/></clipPath></defs>
      <g clip-path="url(#screen)">
        <rect x="${x + 18}" y="${y + 18}" width="${w - 36}" height="${h - 36}" fill="#fff"/>
        ${place(phoneArtwork, x + 20, uiY, w - 40)}
        <rect x="${x + 18}" y="${y + 18}" width="${w - 36}" height="76" fill="#fff"/>
        <text x="${x + 80}" y="${y + 78}" fill="#101828" font-size="22" font-weight="600">9:41</text>
        <rect x="${x + w * 0.35}" y="${y + 35}" width="${w * 0.3}" height="${w * 0.075}" rx="${w * 0.0375}" fill="#09101e"/>
        <rect x="${x + w - 120}" y="${y + 59}" width="39" height="18" rx="5" fill="none" stroke="#101828" stroke-width="2"/>
        <rect x="${x + w - 116}" y="${y + 63}" width="29" height="10" rx="2" fill="#101828"/>
        ${compact ? `<rect x="${x + w / 2 - 90}" y="${y + h - 46}" width="180" height="7" rx="3.5" fill="#101828"/>` : ''}
      </g>
    </g>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="DejaVu Sans, sans-serif">
    <defs><radialGradient id="glow"><stop stop-color="#16449a" stop-opacity=".6"/><stop offset="1" stop-color="#061b46" stop-opacity="0"/></radialGradient><filter id="shadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="28" stdDeviation="26" flood-color="#000" flood-opacity=".35"/></filter></defs>
    <rect width="${width}" height="${height}" fill="#061b46"/>
    <ellipse cx="${width * 0.7}" cy="${height * 0.7}" rx="${width * 0.7}" ry="${height * 0.55}" fill="url(#glow)"/>
    <path d="M0 ${height - 130}Q${width / 2} ${height - 240} ${width} ${height - 90}V${height}H0Z" fill="#0b2b68"/>
    <image href="${logo}" x="80" y="65" width="330" height="112"/>
    ${heading}
    <text x="80" y="${screen.wide ? 660 : 490}" fill="#b8c9e8" font-size="${screen.wide ? 25 : 28}">${screen.description}</text>
    ${visual}
  </svg>`
}

async function main() {
  const dashboard = artwork(renderToStaticMarkup(<DashboardSvg />))
  const mobile = artwork(renderToStaticMarkup(<DashboardMobileSvg />))
  const id = artwork(renderToStaticMarkup(<IdCardSvg />))
  const scan = artwork(renderToStaticMarkup(<ScanSvg />))
  const logo = `data:image/png;base64,${(await readFile(path.join(root, 'app/assets/brand/logo-horizontal-inverse.png'))).toString('base64')}`
  const screens: Screenshot[] = [
    {
      file: 'mobile-1.png',
      presentation: 'phone',
      heading: ['Tu pastoral,', 'en un solo lugar'],
      description: 'Identidad, asistencias y misas desde tu celular.',
      artwork: mobile,
    },
    {
      file: 'mobile-2.png',
      presentation: 'card',
      heading: ['Tu Pastoral ID,', 'siempre contigo'],
      description: 'Muestra tu código QR en cada encuentro.',
      artwork: id,
    },
    {
      file: 'mobile-3.png',
      presentation: 'scanner',
      heading: ['Cada encuentro', 'queda registrado'],
      description: 'Escanea el QR y registra la asistencia.',
      artwork: scan,
    },
    {
      file: 'mobile-4.png',
      presentation: 'phone',
      focusRecords: true,
      heading: ['Tu participación,', 'a la vista'],
      description: 'Consulta tus asistencias y tus misas.',
      artwork: mobile,
    },
    {
      file: 'desktop-1.png',
      presentation: 'window',
      wide: true,
      heading: ['Todo listo para', 'cada encuentro'],
      description: 'Asistencias, misas e identidad en una plataforma.',
      artwork: dashboard,
    },
    {
      file: 'desktop-2.png',
      presentation: 'scanner',
      wide: true,
      heading: ['Un escaneo.', 'Una asistencia.'],
      description: 'Registro con QR para la coordinación pastoral.',
      artwork: scan,
    },
  ]
  const temp = await mkdtemp(path.join(os.tmpdir(), 'pastoral-screenshots-'))
  try {
    // Render all six before replacing any existing screenshot.
    for (const screen of screens) {
      const pngFile = path.join(temp, screen.file)
      const svg = (await embedImages(compose(screen, logo)))
        .replaceAll('font-family="inherit"', 'font-family="Arial, sans-serif"')
        .replaceAll('DejaVu Sans, sans-serif', 'Arial, sans-serif')
      const info = await sharp(Buffer.from(svg))
        .flatten({ background: '#ffffff' })
        .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
        .toFile(pngFile)
      const expected = screen.wide ? '1920x1218' : '1080x1920'
      const actual = `${info.width}x${info.height}`
      if (actual !== expected)
        throw new Error(`${screen.file}: tamaño inesperado ${actual}`)
      console.log(
        `${screen.file} · ${actual} · ${Math.round((await stat(pngFile)).size / 1024)} KB`
      )
    }
    await mkdir(outputDirectory, { recursive: true })
    for (const screen of screens)
      await copyFile(
        path.join(temp, screen.file),
        path.join(outputDirectory, screen.file)
      )
  } finally {
    await rm(temp, { recursive: true, force: true })
  }
  console.log(
    'Generadas 6 screenshots en public/screenshots a partir de los SVG de marketing.'
  )
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
