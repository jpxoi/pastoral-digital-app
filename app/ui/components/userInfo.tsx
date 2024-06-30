import Link from "next/link";
import { CloseIcon, EditIcon } from "../icons/icons24";
import DarkAvatar from "./darkAvatar";

interface UserInfoProps {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  userID: string | null;
  avatarURL: string | null;
  fallbackAvatar: string | null;
  dropdown: React.MutableRefObject<HTMLDivElement | null>;
}

export default function UserInfo({
  firstName,
  lastName,
  email,
  userID,
  avatarURL,
  fallbackAvatar,
  dropdown,
}: UserInfoProps) {
  const toggleDropdown = () => {
    if (dropdown.current) {
      dropdown.current.classList.toggle("hidden");
    }
  };

  return (
    <div className="flex flex-col gap-4 min-w-80 rounded-md">
      <div className="flex justify-between items-center">
        <div id="invisible" className="text-lg text-[#e9eef6] rounded-full p-1">
          <CloseIcon />
        </div>
        <p className="text-sm text-gray-600">{email}</p>
        <button
          className="text-lg text-gray-700 hover:text-blue-700 rounded-full hover:bg-blue-100 p-1"
          onClick={toggleDropdown}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="relative self-center h-32 w-32">
        <DarkAvatar userID={userID as string}/>
        <Link
          className="flex justify-center items-center relative rounded-full bg-white text-gray-700 w-6 h-6 -top-8 left-24 cursor-pointer hover:bg-blue-100 hover:text-blue-800"
          href="/dashboard/settings"
          onClick={() => toggleDropdown()}
        >
          <EditIcon />
        </Link>
      </div>

      <div className="flex flex-col justify-center">
        <h4 className="text-xl font-medium sm:font-normal text-gray-700">
          Hola, {firstName}!
        </h4>
        <p className="text-sm text-gray-500">
          <b>ID: </b>
          {userID}
        </p>
        <Link
          href="/dashboard/settings"
          onClick={toggleDropdown}
          className="text-sm text-blue-600 hover:text-blue-800 py-2 px-4 hover:bg-blue-100 border border-blue-800 rounded-full w-fit self-center mt-3 hidden"
        >
          Gestionar tu Pastoral Digital
        </Link>
      </div>
    </div>
  );
}
