import Image from 'next/image'

export default function PastoralIdQRCode({ userId }: { userId: string }) {
  return (
    <Image
      src={`https://quickchart.io/qr?text=${userId}&size=300&margin=2&dark=001944&ecLevel=L&format=svg`}
      className='m-0 mx-auto h-auto w-full rounded-lg p-0 sm:max-w-sm'
      width={300}
      height={300}
      unoptimized={true}
      alt='Pastoral ID QR Code'
    />
  )
}
