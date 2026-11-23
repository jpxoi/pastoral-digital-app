import { cn } from 'cn'

const logoVariants = {
  light: {
    file: 'logo-horizontal-inverse',
    widths: [480, 720],
    width: 720,
    height: 242,
  },
  dark: {
    file: 'logo-horizontal',
    widths: [400, 600],
    width: 600,
    height: 202,
  },
} as const

type PastoralSignatureProps = {
  variant?: keyof typeof logoVariants
  sizes?: string
  className?: string
}

function getSourceSet(file: string, widths: readonly number[], format: string) {
  return widths
    .map((width) => `/brand/optimized/${file}-${width}.${format} ${width}w`)
    .join(', ')
}

function getDensitySourceSet(
  file: string,
  widths: readonly number[],
  format: string,
  cssSize: number
) {
  return widths
    .map(
      (width) =>
        `/brand/optimized/${file}-${width}.${format} ${width / cssSize}x`
    )
    .join(', ')
}

export function PastoralSignature({
  variant = 'light',
  sizes = '240px',
  className,
}: PastoralSignatureProps) {
  const logo = logoVariants[variant]
  const fallbackWidth = logo.widths[logo.widths.length - 1]

  return (
    <picture className='contents'>
      <source
        type='image/avif'
        srcSet={getSourceSet(logo.file, logo.widths, 'avif')}
        sizes={sizes}
      />
      <source
        type='image/webp'
        srcSet={getSourceSet(logo.file, logo.widths, 'webp')}
        sizes={sizes}
      />
      <img
        src={`/brand/optimized/${logo.file}-${fallbackWidth}.png`}
        srcSet={getSourceSet(logo.file, logo.widths, 'png')}
        sizes={sizes}
        width={logo.width}
        height={logo.height}
        alt='Pastoral Mariana'
        decoding='async'
        className={cn('block h-auto', className)}
      />
    </picture>
  )
}

export function PastoralAppMark({ className }: { className?: string }) {
  const file = 'app-icon'
  const widths = [96, 144] as const

  return (
    <picture className={cn('block overflow-hidden', className)}>
      <source
        type='image/avif'
        srcSet={getDensitySourceSet(file, widths, 'avif', 24)}
      />
      <source
        type='image/webp'
        srcSet={getDensitySourceSet(file, widths, 'webp', 24)}
      />
      <img
        src='/brand/optimized/app-icon-144.png'
        srcSet={getDensitySourceSet(file, widths, 'png', 24)}
        width={144}
        height={144}
        alt=''
        decoding='async'
        className='block size-full'
      />
    </picture>
  )
}
