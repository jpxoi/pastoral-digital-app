import sharp from 'sharp'
import {
  access,
  copyFile,
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

type Device = {
  name: string
  width: number
  height: number
  pixelRatio: number
}

type Orientation = 'landscape' | 'portrait'

const projectRoot = process.cwd()
const splashDirectory = path.join(projectRoot, 'public/splash_screens')
const sourceLogo = path.join(
  projectRoot,
  'app/assets/brand/logo-horizontal-inverse.png'
)
const definitionsFile = path.join(projectRoot, 'lib/pwa/splash-screens.ts')
const sharedArtworkPath = path.join(
  projectRoot,
  'components/shared/background-artwork.ts'
)

const devices: Device[] = [
  { name: 'iPhone_Duo_(Open)', width: 890, height: 626, pixelRatio: 3 },
  { name: 'iPhone_Duo_(Closed)', width: 466, height: 678, pixelRatio: 3 },
  {
    name: 'iPhone_18_Pro_Max__iPhone_17_Pro_Max__iPhone_16_Pro_Max',
    width: 440,
    height: 956,
    pixelRatio: 3,
  },
  {
    name: 'iPhone_18_Pro__iPhone_17_Pro__iPhone_17__iPhone_16_Pro',
    width: 402,
    height: 874,
    pixelRatio: 3,
  },
  {
    name: 'iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max',
    width: 430,
    height: 932,
    pixelRatio: 3,
  },
  { name: 'iPhone_Air', width: 420, height: 912, pixelRatio: 3 },
  {
    name: 'iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro',
    width: 393,
    height: 852,
    pixelRatio: 3,
  },
  {
    name: 'iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max',
    width: 428,
    height: 926,
    pixelRatio: 3,
  },
  {
    name: 'iPhone_17e__iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12',
    width: 390,
    height: 844,
    pixelRatio: 3,
  },
  {
    name: 'iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X',
    width: 375,
    height: 812,
    pixelRatio: 3,
  },
  {
    name: 'iPhone_11_Pro_Max__iPhone_XS_Max',
    width: 414,
    height: 896,
    pixelRatio: 3,
  },
  { name: 'iPhone_11__iPhone_XR', width: 414, height: 896, pixelRatio: 2 },
  {
    name: 'iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus',
    width: 414,
    height: 736,
    pixelRatio: 3,
  },
  {
    name: 'iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE',
    width: 375,
    height: 667,
    pixelRatio: 2,
  },
  {
    name: '4__iPhone_SE__iPod_touch_5th_generation_and_later',
    width: 320,
    height: 568,
    pixelRatio: 2,
  },
  { name: '13__iPad_Pro_M4', width: 1032, height: 1376, pixelRatio: 2 },
  { name: '12.9__iPad_Pro', width: 1024, height: 1366, pixelRatio: 2 },
  { name: '11__iPad_Pro_M4', width: 834, height: 1210, pixelRatio: 2 },
  {
    name: '11__iPad_Pro__10.5__iPad_Pro',
    width: 834,
    height: 1194,
    pixelRatio: 2,
  },
  { name: '10.9__iPad_Air', width: 820, height: 1180, pixelRatio: 2 },
  { name: '10.5__iPad_Air', width: 834, height: 1112, pixelRatio: 2 },
  { name: '10.2__iPad', width: 810, height: 1080, pixelRatio: 2 },
  {
    name: '9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad',
    width: 768,
    height: 1024,
    pixelRatio: 2,
  },
  { name: '8.3__iPad_Mini_A20', width: 756, height: 1158, pixelRatio: 2 },
  { name: '8.3__iPad_Mini_A17', width: 744, height: 1133, pixelRatio: 2 },
]

function makeMedia(device: Device, orientation: Orientation) {
  return `screen and (device-width: ${device.width}px) and (device-height: ${device.height}px) and (-webkit-device-pixel-ratio: ${device.pixelRatio}) and (orientation: ${orientation})`
}

function getScreenDimensions(device: Device, orientation: Orientation) {
  const width = device.width * device.pixelRatio
  const height = device.height * device.pixelRatio
  const landscape = orientation === 'landscape'

  if ((landscape && width >= height) || (!landscape && width <= height)) {
    return { width, height }
  }

  return { width: height, height: width }
}

function renderSvg(
  artwork: {
    color: string
    viewBox: string
    paths: readonly { d: string; fill: string }[]
  },
  width: number,
  height: number
) {
  const paths = artwork.paths
    .map(({ d, fill }) => `<path d="${d}" fill="${fill}"/>`)
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${artwork.viewBox}" preserveAspectRatio="xMidYMid slice"><rect width="900" height="675" fill="${artwork.color}"/>${paths}</svg>`
}

async function writeSplash(
  device: Device,
  orientation: Orientation,
  artwork: Parameters<typeof renderSvg>[0],
  tempDirectory: string
) {
  const { width, height } = getScreenDimensions(device, orientation)
  const file = `${device.name}_${orientation}.png`
  const outputFile = path.join(tempDirectory, file)
  const logoWidth = Math.round(Math.min(width * 0.36, height * 0.55))

  const logo = await sharp(sourceLogo)
    .resize({ width: logoWidth })
    .png()
    .toBuffer()
  await sharp(Buffer.from(renderSvg(artwork, width, height)))
    .composite([{ input: logo, gravity: 'centre' }])
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(outputFile)

  return {
    url: `/splash_screens/${file}`,
    media: makeMedia(device, orientation),
    orientation,
    file,
    width,
    height,
  }
}

function renderDefinitions(screens: Awaited<ReturnType<typeof writeSplash>>[]) {
  const entries = screens
    .map(
      ({ url, media }) =>
        `  {\n    url: '${url}',\n    media: '${media}',\n  },`
    )
    .join('\n')

  return `import { type Metadata } from 'next'\n\nexport const splashScreens = [\n${entries}\n] satisfies NonNullable<\n  Extract<NonNullable<Metadata['appleWebApp']>, object>['startupImage']\n>\n`
}

async function main() {
  try {
    await access(sourceLogo)
  } catch {
    throw new Error(`No se encontró el logo fuente: ${sourceLogo}`)
  }

  const { backgroundArtwork } = await import(sharedArtworkPath)
  const tempDirectory = await mkdtemp(
    path.join(os.tmpdir(), 'pastoral-splashes-')
  )

  try {
    await mkdir(splashDirectory, { recursive: true })

    const screens: Awaited<ReturnType<typeof writeSplash>>[] = []
    for (const orientation of ['landscape', 'portrait'] as const) {
      for (const device of devices) {
        const screen = await writeSplash(
          device,
          orientation,
          backgroundArtwork,
          tempDirectory
        )
        screens.push(screen)
        console.log(`${screen.file} (${screen.width}x${screen.height})`)
      }
    }

    for (const screen of screens) {
      await copyFile(
        path.join(tempDirectory, screen.file),
        path.join(splashDirectory, screen.file)
      )
    }
    await writeFile(definitionsFile, renderDefinitions(screens))
  } finally {
    await rm(tempDirectory, { recursive: true, force: true })
  }

  console.log(
    `Generados ${devices.length * 2} splash screens en public/splash_screens`
  )
  console.log('Actualizadas las definiciones en lib/pwa/splash-screens.ts')
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
