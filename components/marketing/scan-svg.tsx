import { MiniQr } from '@/components/marketing/mini-qr'

const CX = 160
const WELL_Y = 72
const WELL_H = 148
const CY = WELL_Y + WELL_H / 2
const FRAME = 108
const QR = 72
const CORNER = 22

export function ScanSvg({ className }: { className?: string }) {
  const frameX = CX - FRAME / 2
  const frameY = CY - FRAME / 2
  const qrX = CX - QR / 2
  const qrY = CY - QR / 2
  const x1 = frameX
  const y1 = frameY
  const x2 = frameX + FRAME
  const y2 = frameY + FRAME

  return (
    <svg
      viewBox='0 0 320 300'
      className={className}
      role='img'
      aria-label='Miniatura del escáner QR para registrar asistencia'
    >
      <rect
        width='320'
        height='300'
        rx='18'
        fill='#fff'
        stroke='#e5e7eb'
        strokeWidth='1.5'
      />
      <text
        x='24'
        y='36'
        fill='#0f172a'
        fontSize='14'
        fontWeight='600'
        fontFamily='inherit'
      >
        Escanear código QR
      </text>
      <text x='24' y='56' fill='#64748b' fontSize='10' fontFamily='inherit'>
        Apunta al Pastoral ID del catequista
      </text>

      <rect
        x='24'
        y={WELL_Y}
        width='272'
        height={WELL_H}
        rx='12'
        fill='#f1f5f9'
      />
      <path
        d={[
          `M${x1} ${y1 + CORNER} v${-CORNER} h${CORNER}`,
          `M${x2 - CORNER} ${y1} h${CORNER} v${CORNER}`,
          `M${x1} ${y2 - CORNER} v${CORNER} h${CORNER}`,
          `M${x2} ${y2 - CORNER} v${CORNER} h${-CORNER}`,
        ].join(' ')}
        stroke='#07309b'
        strokeWidth='3'
        fill='none'
        strokeLinecap='square'
      />
      <rect
        x={qrX - 6}
        y={qrY - 6}
        width={QR + 12}
        height={QR + 12}
        rx='8'
        fill='#fff'
      />
      <MiniQr x={qrX} y={qrY} width={QR} height={QR} />

      <rect x='24' y='236' width='272' height='44' rx='10' fill='#f0fdf4' />
      <circle cx='48' cy='258' r='10' fill='#dcfce7' />
      <path
        d='M43 258 l4 4 8-9'
        fill='none'
        stroke='#15803d'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <text
        x='68'
        y='254'
        fill='#14532d'
        fontSize='11'
        fontWeight='600'
        fontFamily='inherit'
      >
        Ana Torres
      </text>
      <text x='68' y='270' fill='#166534' fontSize='9' fontFamily='inherit'>
        A tiempo · 9:02 a. m.
      </text>
    </svg>
  )
}
