import Image from 'next/image'
import PastoralLogo from '@/public/images/pastoral_logo.webp'
import PastoralLogoWide from '@/public/images/pastoral_logo_wide.webp'
import PastoralLogoWideDark from '@/public/images/pastoral_logo_wide_dark.webp'
import { cn } from '@/lib/utils'

export function LogoImage() {
  return <Image src={PastoralLogo} alt='Pastoral Logo' />
}

export function LogoImageWide({
  variant = 'light',
  className,
}: {
  variant: 'light' | 'dark'
  className?: string
}) {
  return (
    <Image
      src={variant === 'dark' ? PastoralLogoWideDark : PastoralLogoWide}
      alt='Pastoral Logo'
      className={cn(`${className}`)}
    />
  )
}
