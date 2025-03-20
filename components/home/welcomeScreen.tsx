import {
  LogoImageWideLight,
  LogoImageWideDark,
} from '@/components/shared/logoImage'
import LoginPrompt from '@/components/home/loginPrompt'
import Link from 'next/link'

export default function WelcomeScreen() {
  return (
    <div
      id='form_container'
      className='mx-auto flex h-dvh w-screen flex-col justify-between sm:h-auto sm:max-w-sm sm:rounded-xl sm:bg-white sm:shadow-md'
    >
      <div className='flex h-full w-full flex-col justify-between bg-none sm:rounded-xl sm:bg-center'>
        <h1 className='select-none p-8 text-left text-[2.7rem] font-semibold leading-normal text-white sm:hidden sm:text-black'>
          Pastoral
          <br />
          Digital
          <br />
          App
        </h1>

        <div className='p-8 pb-4 pt-0 text-white sm:pb-8 sm:pt-8 sm:text-black'>
          <LogoImageWideLight />
          <LogoImageWideDark />
          <LoginPrompt />
        </div>
      </div>
      <div className='mb-8 flex items-center justify-center space-x-4 sm:hidden'>
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
