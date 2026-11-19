import { useId } from 'react'
import { MiniQr } from '@/components/marketing/mini-qr'

export function IdCardSvg({ className }: { className?: string }) {
  const clipId = `id-card-clip-${useId().replace(/:/g, '')}`

  return (
    <svg
      viewBox='0 0 280 344'
      className={className}
      role='img'
      aria-label='Miniatura del Pastoral ID, con código QR, nombre y rol de catequista'
    >
      <defs>
        <clipPath id={clipId}>
          <rect width='280' height='344' rx='18' />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width='280' height='344' fill='#fff' />
        <path
          d='M0 188C38 176 78 210 122 206C166 202 198 156 238 150C258 147 270 152 280 158V0H0Z'
          fill='#1d5fd3'
        />
        <path
          d='M0 132C42 148 86 118 128 124C170 130 208 168 246 160C266 156 274 146 280 140V0H0Z'
          fill='#1447b7'
        />
        <path
          d='M0 78C36 92 84 64 126 70C168 76 214 108 252 96C268 91 276 82 280 76V0H0Z'
          fill='#07309b'
        />
        <rect x='28' y='28' width='224' height='224' rx='12' fill='#fff' />
        <MiniQr x={40} y={40} width={200} height={200} />
        <text
          x='140'
          y='276'
          textAnchor='middle'
          fill='#0f172a'
          fontSize='18'
          fontWeight='700'
          fontFamily='inherit'
        >
          Ana Torres
        </text>
        <text
          x='140'
          y='300'
          textAnchor='middle'
          fill='#07309b'
          fontSize='12'
          fontFamily='inherit'
        >
          Catequista
        </text>
        <text
          x='140'
          y='322'
          textAnchor='middle'
          fill='#94a3b8'
          fontSize='8'
          fontFamily='ui-monospace, SFMono-Regular, Menlo, monospace'
        >
          user_2p8kQ4aN
        </text>
      </g>
      <rect
        width='280'
        height='344'
        rx='18'
        fill='none'
        stroke='#e2e8f0'
        strokeWidth='1.5'
      />
    </svg>
  )
}
