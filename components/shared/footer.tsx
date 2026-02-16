import Link from 'next/link'
import { LogoImageWide } from '@/components/shared/logoImage'
import { IconBrandInstagram } from '@tabler/icons-react'

export function FooterNarrow() {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <p className='mt-4 w-full max-w-full px-4 text-sm text-balance text-gray-300 sm:max-w-sm'>
        <a
          property='dct:title'
          className='font-medium text-white transition-colors duration-300 hover:text-gray-200'
          rel='cc:attributionURL'
          href='https://pastoralid.jpxoi.com'
        >
          Pastoral Digital
        </a>{' '}
        &copy; {new Date().getFullYear()} por{' '}
        <a
          rel='cc:attributionURL dct:creator'
          className='font-medium text-white transition-colors duration-300 hover:text-gray-200'
          property='cc:attributionName'
          href='https://jpxoi.com'
        >
          Jean Paul Fernandez
        </a>
      </p>
      <div className='mt-3 flex space-x-4'>
        <Link
          href='/privacy'
          className='text-sm font-medium text-white transition-colors duration-300 hover:text-gray-200'
        >
          Política de Privacidad
        </Link>
        <Link
          href='/terms'
          className='text-sm font-medium text-white transition-colors duration-300 hover:text-gray-200'
        >
          Términos y Condiciones
        </Link>
      </div>
    </div>
  )
}

export function FooterWide() {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <p className='mt-4 w-full max-w-full px-4 text-sm text-balance text-gray-600'>
        <a
          property='dct:title'
          className='font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600'
          rel='cc:attributionURL'
          href='https://pastoralid.jpxoi.com'
        >
          Pastoral Digital App
        </a>{' '}
        &copy; {new Date().getFullYear()} por{' '}
        <a
          rel='cc:attributionURL dct:creator'
          className='font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600'
          property='cc:attributionName'
          href='https://jpxoi.com'
        >
          Jean Paul Fernandez
        </a>
      </p>
      <div className='mt-3 flex space-x-4'>
        <Link
          href='/privacy'
          className='text-sm font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600'
        >
          Política de Privacidad
        </Link>
        <Link
          href='/terms'
          className='text-sm font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600'
        >
          Términos y Condiciones
        </Link>
      </div>
    </div>
  )
}

export function MainFooter() {
  return (
    <footer className='flex w-full items-center justify-center border-t bg-white py-6 md:py-12'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div className='space-y-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <LogoImageWide width={120} />
            </div>
          </div>
          <div className='space-y-4'>
            <h4 className='text-sm font-bold tracking-wider uppercase'>
              Legal
            </h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/terms' className='text-sm hover:underline'>
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='text-sm hover:underline'>
                  Política de Privacidad
                </Link>
              </li>
              {/* <li>
                <Link href='#' className='text-sm hover:underline'>
                  Cookies
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Licenses
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className='mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row'>
          <p className='text-muted-foreground text-sm'>
            © {new Date().getFullYear()} Pastoral Mariana. Todos los derechos
            reservados.
          </p>
          <div className='flex items-center gap-4'>
            <Link
              href='https://instagram.com/pastoralmarianaps'
              className='text-muted-foreground hover:text-foreground'
            >
              <IconBrandInstagram className='h-5 w-5' />
              <span className='sr-only'>Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
