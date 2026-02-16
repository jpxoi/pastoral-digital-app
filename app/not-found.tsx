import Link from 'next/link'

export default async function NotFound() {
  return (
    <section className='flex h-screen flex-col items-center justify-center'>
      <div className='mx-auto max-w-(--breakpoint-xl) px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto max-w-(--breakpoint-sm) text-center'>
          <h1 className='mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>
            Página no encontrada
          </p>
          <p className='mb-4 text-lg font-light text-gray-500'>
            Lo sentimos, no podemos encontrar esa página. Puede que haya sido
            eliminada o que la dirección no sea correcta.
          </p>
          <Link
            href='/'
            className='my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-hidden'
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
