import { readFile, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import sharp from 'sharp'
import { DashboardSvg } from '../components/marketing/dashboard-svg'

const root = process.cwd()
const output = path.join(root, 'app/opengraph-image.jpeg')
const width = 1200
const height = 630

async function main() {
  const logoBytes = await readFile(
    path.join(root, 'app/assets/brand/logo-horizontal-inverse.png')
  )
  const logo = `data:image/png;base64,${logoBytes.toString('base64')}`
  const dashboard = renderToStaticMarkup(<DashboardSvg />)
    .replace(/^<svg\b/, '<svg x="620" y="210" width="740" height="436.21"')
    .replaceAll('font-family="inherit"', 'font-family="Arial, sans-serif"')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="Arial, sans-serif">
    <defs>
      <radialGradient id="glow"><stop stop-color="#16449a" stop-opacity=".65"/><stop offset="1" stop-color="#061b46" stop-opacity="0"/></radialGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity=".3"/></filter>
    </defs>
    <rect width="1200" height="630" fill="#061b46"/>
    <ellipse cx="960" cy="420" rx="660" ry="430" fill="url(#glow)"/>
    <path d="M0 585Q600 475 1200 570V630H0Z" fill="#0b2b68"/>
    <image href="${logo}" x="64" y="44" width="232" height="78"/>
    <text x="64" y="220" fill="#ffffff" font-size="44" font-weight="700">Pastoral Digital App</text>
    <text x="64" y="290" fill="#ffffff" font-size="36" font-weight="600">Tu pastoral,</text>
    <text x="64" y="337" fill="#ffffff" font-size="36" font-weight="600">en un solo lugar.</text>
    <text x="64" y="410" fill="#b8c9e8" font-size="22">Identidad, asistencias y misas</text>
    <text x="64" y="442" fill="#b8c9e8" font-size="22">para catequistas y coordinadores.</text>
    <g filter="url(#shadow)">
      <rect x="608" y="198" width="764" height="460.21" rx="32" fill="#102d5b" stroke="#3a5684" stroke-width="2"/>
      ${dashboard}
    </g>
  </svg>`

  // Encode once and publish only after checking the final dimensions.
  const { data, info } = await sharp(Buffer.from(svg))
    .flatten({ background: '#061b46' })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer({ resolveWithObject: true })
  if (info.width !== width || info.height !== height)
    throw new Error('Dimensiones Open Graph inesperadas.')
  const temporary = `${output}.tmp`
  try {
    await writeFile(temporary, data)
    await rename(temporary, output)
  } finally {
    await rm(temporary, { force: true })
  }
  console.log(
    `app/opengraph-image.jpeg · ${width}×${height} · ${Math.round(data.length / 1024)} KB`
  )
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
