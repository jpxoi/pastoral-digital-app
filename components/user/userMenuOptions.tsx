import { useUserMenu } from "@/app/context/userMenuContext";
import { JustifyIcon, LogOutIcon } from "@/components/icons/icons24";
import Link from "next/link";

export default function UserMenuOptions() {
  const { setIsOpen, userInfo, userSession } = useUserMenu();
  return (
    <div className="grid grid-cols-2 gap-1">
      <a
        className="text-sm text-blue-500 hover:text-blue-800 py-3 px-2 bg-white hover:bg-blue-100 flex flex-row justify-center items-center gap-1 rounded-3xl rounded-r-md"
        href={`https://docs.google.com/forms/d/e/1FAIpQLSd_iJ7BJaofM-yQUFNa9tDImNrdRVY0JoXqbLgpjmUxrFEIuA/viewform?usp=pp_url&entry.1528530871=${userInfo.userID}&entry.858990924=${userSession.name}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <JustifyIcon />
        Justificar Falta
      </a>
      <Link
        className="text-sm text-red-500 hover:text-red-800 py-3 px-2 bg-white hover:bg-red-100 flex flex-row justify-center items-center gap-1 rounded-3xl rounded-l-md"
        href="/api/auth/logout"
      >
        <LogOutIcon />
        Cerrar Sesión
      </Link>
    </div>
  );
}
