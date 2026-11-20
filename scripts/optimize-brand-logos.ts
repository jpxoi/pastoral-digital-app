import sharp, { type Sharp } from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'

type LogoSource = {
  file: string
  maxCssWidth: number
}

const projectRoot = process.cwd()
const sourceDirectory = path.join(projectRoot, 'app/assets/brand')
const outputDirectory = path.join(projectRoot, 'public/brand/optimized')
const logos: LogoSource[] = [
  { file: 'logo-horizontal-inverse.png', maxCssWidth: 240 },
  { file: 'logo-horizontal.png', maxCssWidth: 200 },
]
const scales = [2, 3] as const
const appIconScales = [4, 6] as const
async function generateFormats(image: Sharp, outputBase: string) {
  await image
    .clone()
    .webp({ quality: 90, effort: 6 })
    .toFile(`${outputBase}.webp`)
  await image
    .clone()
    .avif({ quality: 90, effort: 6 })
    .toFile(`${outputBase}.avif`)
  await image
    .clone()
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(`${outputBase}.png`)
}

async function main() {
  const availableFiles = new Set(await readdir(sourceDirectory))
  const requiredFiles = [...logos.map(({ file }) => file), 'logo-icon.png']
  const missingFiles = requiredFiles.filter((file) => !availableFiles.has(file))

  if (missingFiles.length) {
    throw new Error(
      `No se encontraron archivos fuente: ${missingFiles.join(', ')}`
    )
  }

  await mkdir(outputDirectory, { recursive: true })

  for (const logo of logos) {
    const sourcePath = path.join(sourceDirectory, logo.file)
    const baseName = path.parse(logo.file).name

    for (const scale of scales) {
      const width = logo.maxCssWidth * scale
      const outputBase = path.join(outputDirectory, `${baseName}-${width}`)

      await generateFormats(
        sharp(sourcePath).resize({ width, withoutEnlargement: true }),
        outputBase
      )
    }
  }

  const appIconSource = path.join(sourceDirectory, 'logo-icon.png')
  for (const scale of appIconScales) {
    const size = 24 * scale
    const contentSize = Math.round(size * 0.8)
    const outputBase = path.join(outputDirectory, `app-icon-${size}`)

    const icon = await sharp(appIconSource)
      .resize({ width: contentSize, height: contentSize, fit: 'inside' })
      .png()
      .toBuffer()
    await generateFormats(
      sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      }).composite([{ input: icon, gravity: 'centre' }]),
      outputBase
    )
  }

  console.log(
    `Logos optimizados generados en ${path.relative(projectRoot, outputDirectory)}`
  )
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
