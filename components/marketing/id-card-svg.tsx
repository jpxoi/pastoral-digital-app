import { useId } from 'react'
import { MiniQr } from '@/components/marketing/mini-qr'
import { PRINT_LOGO } from '@/components/fotochecks/model'

export function IdCardSvg({ className }: { className?: string }) {
  const clipId = `id-card-clip-${useId().replace(/:/g, '')}`

  return (
    <svg
      viewBox='0 0 280 344'
      className={className}
      role='img'
      aria-label='Ejemplo de Pastoral ID de Ana Torres, catequista'
    >
      <defs>
        <clipPath id={clipId}>
          <rect width='280' height='344' rx='18' />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width='280' height='344' fill='#fff' />
        <text
          x='140'
          y='40'
          textAnchor='middle'
          fill='#001944'
          fontSize='18'
          fontWeight='600'
          fontFamily='inherit'
        >
          Ana Torres
        </text>
        <text
          x='140'
          y='62'
          textAnchor='middle'
          fill='#07309b'
          fontSize='12'
          fontFamily='inherit'
        >
          Catequista
        </text>
        <path
          d='M0 326C75 340 134 320 187 328S249 338 280 316V344H0Z'
          fill='#1d5fd3'
        />
        <path
          d='M0 318C84 336 134 333 187 336S249 340 280 344H0Z'
          fill='#07309b'
        />
        <MiniQr x={32} y={76} width={216} height={216} />
        <image
          href={PRINT_LOGO}
          x='98'
          y='286'
          width='84'
          height='28'
          preserveAspectRatio='xMidYMid meet'
        />
      </g>
      <rect
        x='0.75'
        y='0.75'
        width='278.5'
        height='342.5'
        rx='17.25'
        fill='none'
        stroke='#e2e8f0'
        strokeWidth='1.5'
      />
    </svg>
  )
}
