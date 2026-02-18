import Image from 'next/image'

export default function Background() {
  return (
    <>
      <Image
        alt='Background Waves Portrait'
        className='bg-primary z-[-100] object-cover sm:hidden'
        src='/graphics/narrow-wave.svg'
        unoptimized={true}
        fill
      />

      <Image
        alt='Background Waves Landscape'
        className='bg-primary z-[-100] hidden object-cover sm:block'
        src='/graphics/wide-wave.svg'
        unoptimized={true}
        fill
      />
    </>
  )
}
