import Image from 'next/image'

export default function Offline() {
  return (
    <div className='flex h-dvh w-full flex-col items-center justify-center gap-8 px-4'>
      <div className='w-52 md:w-96'>
        <Image
          src='/graphics/offline.svg'
          alt='Offline'
          unoptimized={true}
          width={384}
          height={208}
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-balance text-2xl font-bold md:text-3xl'>
          ¡Oops! Parece que no tienes conexión a internet
        </h1>
        <p className='text-md md:text-lg'>
          Por favor, revisa tu conexión y vuelve a intentarlo.
        </p>
        <a
          href='/'
          className='text-md rounded-md p-2 px-4 text-blue-600 hover:bg-blue-100 hover:text-blue-800 md:text-lg'
        >
          Volver a intentar
        </a>
      </div>
    </div>
  )
}
