import { execFileSync } from 'node:child_process'
import { mkdir, readdir, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type LogoSource = {
  file: string
  maxCssWidth: number
}

type ImageFormat = 'webp' | 'avif' | 'png'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const sourceDirectory = path.join(projectRoot, 'app/assets/brand')
const outputDirectory = path.join(projectRoot, 'public/brand/optimized')
const logos: LogoSource[] = [
  { file: 'logo-horizontal-inverse.png', maxCssWidth: 240 },
  { file: 'logo-horizontal.png', maxCssWidth: 200 },
]
const scales = [2, 3] as const
const appIconScales = [4, 6] as const
const formatOptions: Record<ImageFormat, string[]> = {
  webp: ['-define', 'webp:method=6', '-quality', '90'],
  avif: ['-define', 'heic:speed=6', '-quality', '90'],
  png: [
    '-define',
    'png:compression-level=9',
    '-define',
    'png:compression-filter=5',
  ],
}

function generateFormats(
  sourcePath: string,
  outputBase: string,
  transforms: string[]
) {
  for (const format of Object.keys(formatOptions) as ImageFormat[]) {
    execFileSync(
      'magick',
      [
        sourcePath,
        ...transforms,
        '-strip',
        ...formatOptions[format],
        `${outputBase}.${format}`,
      ],
      { stdio: 'inherit' }
    )
  }
}

async function removeIfExists(filePath: string) {
  try {
    await unlink(filePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

try {
  execFileSync('magick', ['-version'], { stdio: 'ignore' })
} catch {
  console.error('No se encontró ImageMagick. Instálalo para generar los logos.')
  process.exit(1)
}

await mkdir(outputDirectory, { recursive: true })
const availableFiles = new Set(await readdir(sourceDirectory))

for (const logo of logos) {
  const baseName = path.parse(logo.file).name
  const obsoleteWidth = logo.maxCssWidth

  for (const format of Object.keys(formatOptions)) {
    await removeIfExists(
      path.join(outputDirectory, `${baseName}-${obsoleteWidth}.${format}`)
    )
  }
}
for (const width of [24, 48, 72]) {
  for (const format of Object.keys(formatOptions)) {
    await removeIfExists(path.join(outputDirectory, `app-icon-${width}.${format}`))
  }
}

for (const logo of logos) {
  if (!availableFiles.has(logo.file)) {
    throw new Error(`No se encontró el archivo fuente: ${logo.file}`)
  }

  const sourcePath = path.join(sourceDirectory, logo.file)
  const baseName = path.parse(logo.file).name

  for (const scale of scales) {
    const width = logo.maxCssWidth * scale
    const outputBase = path.join(outputDirectory, `${baseName}-${width}`)

    generateFormats(sourcePath, outputBase, ['-resize', `${width}x>`])
  }
}

const appIconSource = path.join(sourceDirectory, 'logo-icon.png')
if (!availableFiles.has('logo-icon.png')) {
  throw new Error('No se encontró el archivo fuente: logo-icon.png')
}

for (const scale of appIconScales) {
  const size = 24 * scale
  const contentSize = Math.round(size * 0.8)
  const outputBase = path.join(outputDirectory, `app-icon-${size}`)

  generateFormats(appIconSource, outputBase, [
    '-resize',
    `${contentSize}x${contentSize}`,
    '-background',
    'none',
    '-gravity',
    'center',
    '-extent',
    `${size}x${size}`,
  ])
}

console.log(
  `Logos optimizados generados en ${path.relative(projectRoot, outputDirectory)}`
)
