export function LogoImage({ width = 80, height = 100 }) {
  return (
    <picture className='flex justify-center'>
      <source srcSet='/images/pastoral_logo.avif' type='image/avif' />
      <source srcSet='/images/pastoral_logo.webp' type='image/webp' />
      <img
        src='/pastoral_logo.webp'
        alt='Pastoral Logo'
        width={width}
        height={height}
      />
    </picture>
  )
}

export function LogoImageWideLight({ width = 200, height = 70 }) {
  return (
    <picture className='flex justify-center sm:hidden'>
      <source srcSet='/images/pastoral_logo_wide.avif' type='image/avif' />
      <source srcSet='/images/pastoral_logo_wide.webp' type='image/webp' />
      <img
        src='/pastoral_logo_wide.webp'
        alt='Pastoral Logo'
        width={width}
        height={height}
      />
    </picture>
  )
}

export function LogoImageWideDark({ width = 180, height = 63 }) {
  return (
    <picture className='hidden justify-center sm:flex'>
      <source srcSet='/images/pastoral_logo_wide_dark.avif' type='image/avif' />
      <source srcSet='/images/pastoral_logo_wide_dark.webp' type='image/webp' />
      <img
        src='/pastoral_logo_wide_dark.webp'
        alt='Pastoral Logo'
        width={width}
        height={height}
      />
    </picture>
  )
}

export function LogoImageWide({ width = 200, height = 70 }) {
  return (
    <picture className='flex justify-center'>
      <source srcSet='/images/pastoral_logo_wide_dark.avif' type='image/avif' />
      <source srcSet='/images/pastoral_logo_wide_dark.webp' type='image/webp' />
      <img
        src='/pastoral_logo_wide.webp'
        alt='Pastoral Logo'
        width={width}
        height={height}
      />
    </picture>
  )
}