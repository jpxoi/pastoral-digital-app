import Image from 'next/image'
import BgPortrait from '@/public/graphics/narrow-wave.svg'
import BgLandscape from '@/public/graphics/wide-wave.svg'

const placeholder =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAGAAoDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAgj/xAAfEAABAgYDAAAAAAAAAAAAAAABAAIDBBESFkEjMfD/xAAXAQADAQAAAAAAAAAAAAAAAAABAgcI/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAIUAVH/2gAMAwEAAhEDEQA/AJswOQaRa+4br4rV8ykdtYeEyg6itprjCM+C2Nw//9k='

export default function Background() {
  return (
    <>
      <div className='sm:hidden'>
        <Image
          alt='Background Waves Portrait'
          src={BgPortrait}
          unoptimized={true}
          placeholder={placeholder}
          fill
          sizes='100vw'
          style={{
            objectFit: 'cover',
            zIndex: -100,
          }}
        />
      </div>

      <div className='hidden sm:block'>
        <Image
          alt='Background Waves Landscape'
          src={BgLandscape}
          unoptimized={true}
          placeholder={placeholder}
          fill
          sizes='100vw'
          style={{
            objectFit: 'cover',
            zIndex: -1000,
          }}
        />
      </div>
    </>
  )
}
