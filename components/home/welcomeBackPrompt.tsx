import Link from 'next/link'

export default function WelcomeBackPrompt({ nickname }: { nickname: string }) {
  return (
    <div className='mt-6 flex flex-col items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-center text-2xl font-medium sm:font-normal'>
          ¡Hola, {nickname}!
        </h1>
        <p className='text-center text-sm text-gray-200 sm:text-gray-500'>
          ¿No eres {nickname}?{' '}
          <a
            href='/api/auth/logout'
            className='text-gray-50 hover:text-white hover:underline sm:text-blue-500 sm:hover:text-blue-600'
          >
            Cerrar Sesión
          </a>
        </p>
      </div>
      <Link
        href='/dashboard'
        className='w-full cursor-pointer rounded-md border border-white bg-white p-3 text-blue-500 transition-colors duration-200 hover:border-gray-200 hover:bg-gray-100 sm:border-blue-500 sm:bg-blue-500 sm:text-white sm:hover:border-blue-600 sm:hover:bg-blue-600'
      >
        Acceder a la Plataforma
      </Link>
    </div>
  )
}
