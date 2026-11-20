import { QRCodeSVG } from 'qrcode.react'
import { QR_BLUE } from '@/components/fotochecks/model'

export default function PastoralIdQRCode({ userId }: { userId: string }) {
  return (
    <QRCodeSVG
      value={userId}
      size={288}
      level='M'
      boostLevel={false}
      marginSize={4}
      fgColor={QR_BLUE}
      bgColor='#ffffff'
      title='Código QR de Pastoral ID'
      className='mx-auto block h-auto w-full max-w-72 rounded-lg'
    />
  )
}
