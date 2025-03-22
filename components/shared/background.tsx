import Image from 'next/image'
import BgPortrait from '@/public/graphics/narrow-wave.svg'
import BgLandscape from '@/public/graphics/wide-wave.svg'

const placeholder =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAGAAoDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAgj/xAAfEAABAgYDAAAAAAAAAAAAAAABAAIDBBESFkEjMfD/xAAXAQADAQAAAAAAAAAAAAAAAAABAgcI/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAIUAVH/2gAMAwEAAhEDEQA/AJswOQaRa+4br4rV8ykdtYeEyg6itprjCM+C2Nw//9k='

export default function Background() {
  return (
    <>
      <Image
        alt='Background Waves Portrait'
        className='sm:hidden'
        src={BgPortrait}
        unoptimized={true}
        placeholder={placeholder}
        fill
        style={{
          objectFit: 'cover',
          zIndex: -100,
        }}
      />

      <Image
        alt='Background Waves Landscape'
        className='hidden sm:block'
        src={BgLandscape}
        unoptimized={true}
        placeholder={placeholder}
        fill
        style={{
          objectFit: 'cover',
          zIndex: -1000,
        }}
      />
    </>
  )
}
