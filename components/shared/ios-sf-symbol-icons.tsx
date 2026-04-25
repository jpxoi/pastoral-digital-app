/**
 * SF Symbols exported from Apple Native CoreSVG (user-provided).
 * `fill="currentColor"` sustituye al blanco semitransparente del export para tema claro.
 */
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

/** Cuadrado de referencia: centra el SVG y fija el box para alinear chips / barras sin “magia” en cada sitio. */
export function IosSFIconFrame({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center [&_svg]:block [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:shrink-0',
        className
      )}
      aria-hidden
    >
      {children}
    </span>
  )
}

const VB_ELLIPSIS = { w: 18.584, h: 3.7207 }
const VB_PLUS_SQUARE = { w: 18.3398, h: 17.9785 }
const VB_SHARE = { w: 17.6953, h: 26.8262 }
const VB_CHEVRON = { w: 17.3242, h: 10.4004 }
/** El arte CoreSVG del chevron deja mucho aire horizontal; se ve más ancho que share/plus al mismo `size`. */
const CHEVRON_WIDTH_OPTICAL = 0.78

export function IosSFEllipsisHorizontal({
  width = 20,
  className,
}: {
  width?: number
  className?: string
}) {
  const h = (width * VB_ELLIPSIS.h) / VB_ELLIPSIS.w
  return (
    <svg
      width={width}
      height={h}
      viewBox={`0 0 ${VB_ELLIPSIS.w} ${VB_ELLIPSIS.h}`}
      className={cn(className)}
      aria-hidden
    >
      <g fill='currentColor'>
        <path d='M16.3672 3.70117C17.3926 3.70117 18.2227 2.88086 18.2227 1.85547C18.2227 0.830078 17.3926 0 16.3672 0C15.3418 0 14.5117 0.830078 14.5117 1.85547C14.5117 2.88086 15.3418 3.70117 16.3672 3.70117Z' />
        <path d='M9.11133 3.70117C10.1367 3.70117 10.957 2.88086 10.957 1.85547C10.957 0.830078 10.1367 0 9.11133 0C8.08594 0 7.25586 0.830078 7.25586 1.85547C7.25586 2.88086 8.08594 3.70117 9.11133 3.70117Z' />
        <path d='M1.85547 3.70117C2.88086 3.70117 3.70117 2.88086 3.70117 1.85547C3.70117 0.830078 2.88086 0 1.85547 0C0.830078 0 0 0.830078 0 1.85547C0 2.88086 0.830078 3.70117 1.85547 3.70117Z' />
      </g>
    </svg>
  )
}

/** SF Symbol `plus.square` */
export function IosSFPlusSquare({
  size,
  className,
}: {
  size: number
  className?: string
}) {
  const w = (size * VB_PLUS_SQUARE.w) / VB_PLUS_SQUARE.h
  return (
    <svg
      width={w}
      height={size}
      viewBox={`0 0 ${VB_PLUS_SQUARE.w} ${VB_PLUS_SQUARE.h}`}
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <g fill='currentColor'>
        <path d='M3.06641 17.9785L14.9121 17.9785C16.9629 17.9785 17.9785 16.9727 17.9785 14.9609L17.9785 3.02734C17.9785 1.01562 16.9629 0 14.9121 0L3.06641 0C1.02539 0 0 1.01562 0 3.02734L0 14.9609C0 16.9727 1.02539 17.9785 3.06641 17.9785ZM3.08594 16.4062C2.10938 16.4062 1.57227 15.8887 1.57227 14.873L1.57227 3.11523C1.57227 2.09961 2.10938 1.57227 3.08594 1.57227L14.8926 1.57227C15.8594 1.57227 16.4062 2.09961 16.4062 3.11523L16.4062 14.873C16.4062 15.8887 15.8594 16.4062 14.8926 16.4062Z' />
        <path d='M9.81445 12.666L9.81445 5.2832C9.81445 4.78516 9.47266 4.44336 8.98438 4.44336C8.50586 4.44336 8.17383 4.78516 8.17383 5.2832L8.17383 12.666C8.17383 13.1543 8.50586 13.4961 8.98438 13.4961C9.47266 13.4961 9.81445 13.1641 9.81445 12.666ZM5.30273 9.78516L12.6953 9.78516C13.1836 9.78516 13.5254 9.46289 13.5254 8.98438C13.5254 8.49609 13.1836 8.1543 12.6953 8.1543L5.30273 8.1543C4.80469 8.1543 4.47266 8.49609 4.47266 8.98438C4.47266 9.46289 4.80469 9.78516 5.30273 9.78516Z' />
      </g>
    </svg>
  )
}

/** SF Symbol `square.and.arrow.up` */
export function IosSFSquareAndArrowUp({
  size,
  className,
}: {
  size: number
  className?: string
}) {
  const w = (size * VB_SHARE.w) / VB_SHARE.h
  return (
    <svg
      width={w}
      height={size}
      viewBox={`0 0 ${VB_SHARE.w} ${VB_SHARE.h}`}
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <g fill='currentColor'>
        <path d='M17.334 11.8555L17.334 19.375C17.334 22.002 15.8691 23.457 13.2422 23.457L4.08203 23.457C1.45508 23.457 0 22.002 0 19.375L0 11.8555C0 9.23828 1.45508 7.77344 4.08203 7.77344L6.05469 7.77344L6.05469 9.3457L4.08203 9.3457C2.48047 9.3457 1.57227 10.2539 1.57227 11.8555L1.57227 19.375C1.57227 20.9863 2.48047 21.8848 4.08203 21.8848L13.2422 21.8848C14.8535 21.8848 15.7617 20.9863 15.7617 19.375L15.7617 11.8555C15.7617 10.2539 14.8535 9.3457 13.2422 9.3457L11.2695 9.3457L11.2695 7.77344L13.2422 7.77344C15.8691 7.77344 17.334 9.23828 17.334 11.8555Z' />
        <path d='M5.35156 6.08398C5.53711 6.08398 5.75195 6.00586 5.88867 5.84961L7.40234 4.23828L8.66211 2.90039L9.93164 4.23828L11.4355 5.84961C11.5723 6.00586 11.7773 6.08398 11.9629 6.08398C12.373 6.08398 12.6758 5.80078 12.6758 5.40039C12.6758 5.18555 12.5977 5.0293 12.4512 4.88281L9.22852 1.77734C9.0332 1.58203 8.86719 1.52344 8.66211 1.52344C8.4668 1.52344 8.30078 1.58203 8.0957 1.77734L4.88281 4.88281C4.73633 5.0293 4.64844 5.18555 4.64844 5.40039C4.64844 5.80078 4.94141 6.08398 5.35156 6.08398ZM8.66211 15.8105C9.08203 15.8105 9.44336 15.4688 9.44336 15.0586L9.44336 5.12695L9.32617 2.49023C9.30664 2.13867 9.02344 1.83594 8.66211 1.83594C8.31055 1.83594 8.02734 2.13867 8.00781 2.49023L7.89062 5.12695L7.89062 15.0586C7.89062 15.4688 8.24219 15.8105 8.66211 15.8105Z' />
      </g>
    </svg>
  )
}

/** SF Symbol `chevron.down` — `size` ≈ ancho deseado en px (proporción del viewBox conservada). */
export function IosSFChevronDown({
  size,
  className,
}: {
  size: number
  className?: string
}) {
  const w = size * CHEVRON_WIDTH_OPTICAL
  const h = (w * VB_CHEVRON.h) / VB_CHEVRON.w
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${VB_CHEVRON.w} ${VB_CHEVRON.h}`}
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <path
        fill='currentColor'
        d='M8.48633 10.4004C8.73047 10.4004 8.97461 10.3027 9.14062 10.1172L16.6992 2.37305C16.8652 2.20703 16.9629 1.99219 16.9629 1.74805C16.9629 1.24023 16.582 0.849609 16.0742 0.849609C15.8301 0.849609 15.6055 0.947266 15.4395 1.10352L7.95898 8.75L9.00391 8.75L1.52344 1.10352C1.36719 0.947266 1.14258 0.849609 0.888672 0.849609C0.380859 0.849609 0 1.24023 0 1.74805C0 1.99219 0.0976562 2.20703 0.263672 2.38281L7.82227 10.1172C8.00781 10.3027 8.23242 10.4004 8.48633 10.4004Z'
      />
    </svg>
  )
}
