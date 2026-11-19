import type { SVGProps } from 'react'

const SIZE = 21
const QUIET = 2
const VIEW = SIZE + QUIET * 2
const DARK = '#001944'

function inFinder(x: number, y: number, ox: number, oy: number) {
  return x >= ox && x < ox + 7 && y >= oy && y < oy + 7
}

function finderDark(x: number, y: number, ox: number, oy: number) {
  const dx = x - ox
  const dy = y - oy
  const edge = dx === 0 || dx === 6 || dy === 0 || dy === 6
  const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4
  return edge || core
}

function buildModules() {
  const dark: Array<[number, number]> = []

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let on = false

      if (inFinder(x, y, 0, 0)) on = finderDark(x, y, 0, 0)
      else if (inFinder(x, y, SIZE - 7, 0)) on = finderDark(x, y, SIZE - 7, 0)
      else if (inFinder(x, y, 0, SIZE - 7)) on = finderDark(x, y, 0, SIZE - 7)
      else if (x === 6 || y === 6) on = (x + y) % 2 === 0
      else {
        const n = (x * 17 + y * 31 + x * y * 5) % 7
        on = n !== 1 && n !== 4
      }

      if (on) dark.push([x + QUIET, y + QUIET])
    }
  }

  return dark
}

const MODULES = buildModules()
const MODULE_PATH = MODULES.map(([x, y]) => `M${x} ${y}h1v1h-1z`).join('')

export function MiniQr({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className={className}
      aria-hidden='true'
      focusable='false'
      shapeRendering='crispEdges'
      {...props}
    >
      <rect width={VIEW} height={VIEW} fill='#fff' />
      <path d={MODULE_PATH} fill={DARK} />
    </svg>
  )
}
