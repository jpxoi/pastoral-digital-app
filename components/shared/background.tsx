import type { ComponentProps } from 'react'
import { backgroundArtwork } from '@/components/shared/background-artwork'
import { cn } from 'cn'

export default function Background({
  className,
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox={backgroundArtwork.viewBox}
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
      focusable='false'
      className={cn(
        'bg-primary pointer-events-none absolute inset-0 -z-100 size-full',
        className
      )}
      {...props}
    >
      {backgroundArtwork.paths.map((path) => (
        <path key={path.fill} d={path.d} fill={path.fill} />
      ))}
    </svg>
  )
}
