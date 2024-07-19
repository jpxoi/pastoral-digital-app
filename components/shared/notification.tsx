import { InformationCircleIcon } from '@/components/icons/icons24'
import NotificationDismissButton from '@/components/shared/notificationDismissButton'

export default function Notification() {
  const notification =
    '¡Hola! Bienvenido a Pastoral Digital. Recuerda que mañana tenemos nuestra Misa mensual en la Parroquia Alta Gracia a las 10:00 a.m. ¡No faltes!'
  const show = false

  return show ? (
    <div id='main-notification' className='flex items-center justify-center'>
      <div className='flex justify-center rounded-lg border border-blue-700 bg-blue-100 p-4 text-blue-700 shadow-md transition-all duration-300'>
        <span className='flex items-center'>
          <InformationCircleIcon />
        </span>
        <p className='mx-4 text-left text-sm sm:text-base md:text-center'>
          {notification}
        </p>
        <NotificationDismissButton />
      </div>
    </div>
  ) : null
}
