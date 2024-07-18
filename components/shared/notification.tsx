import { InformationCircleIcon } from "@/components/icons/icons24";
import NotificationDismissButton from "@/components/shared/notificationDismissButton";

export default function Notification() {
  const notification =
    "¡Hola! Bienvenido a Pastoral Digital. Recuerda que mañana tenemos nuestra Misa mensual en la Parroquia Alta Gracia a las 10:00 a.m. ¡No faltes!";
  const show = false;

  return show ? (
    <div id="main-notification" className="flex justify-center items-center">
      <div className="flex justify-center bg-blue-100 border border-blue-700 text-blue-700 p-4 rounded-lg shadow-md transition-all duration-300">
        <span className="flex items-center">
          <InformationCircleIcon />
        </span>
        <p className="text-sm sm:text-base mx-4 text-left md:text-center">
          {notification}
        </p>
        <NotificationDismissButton />
      </div>
    </div>
  ) : null;
}