import Image from 'next/image'
import BackgroundImageNarrow from '@/public/graphics/narrow-wave.svg'
import BackgroundImageWide from '@/public/graphics/wide-wave.svg'

export default function Background() {
  return (
    <>
      <Image
        alt='Background Waves Portrait'
        className='bg-primary z-[-100] object-cover sm:hidden'
        src={BackgroundImageNarrow}
        unoptimized={true}
        fill
      />

      <Image
        alt='Background Waves Landscape'
        className='bg-primary z-[-100] hidden object-cover sm:block'
        src={BackgroundImageWide}
        unoptimized={true}
        fill
      />
    </>
  )
}
