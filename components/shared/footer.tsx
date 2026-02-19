import Link from 'next/link'
import { LogoImageWide } from '@/components/shared/logoImage'
import { IconBrandInstagram } from '@tabler/icons-react'

export function MainFooter() {
  return (
    <footer className='flex w-full items-center justify-center border-t bg-white py-6 md:py-12'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div className='space-y-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <LogoImageWide variant='dark' className='max-h-12 w-auto' />
            </div>
          </div>
          <div className='max-w-fit space-y-4 justify-self-end-safe'>
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
