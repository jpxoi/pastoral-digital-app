import { getSession, Session } from "@auth0/nextjs-auth0";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import ChangePersonalInfo from "@/components/settings/changePersonalInfo";
import Link from "next/link";
import ChangeProfilePic from "@/components/settings/changeProfilePic";
import { UserInfoProps } from "@/types/interfaces";
import { fetchUserInfoByEmail } from "@/app/utils/fetchUtils";
import { ReturnIcon } from "@/components/icons/icons16";

export default async function AccountSettings() {
  const { user } = (await getSession()) as Session;
  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email: user.email,
  });

  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <div className="flex flex-col items-center justify-between gap-4 max-w-md md:max-w-screen-lg md:w-full">
        <Link
          href="/dashboard"
          className="flex flex-row justify-start items-center self-start text-blue-600 px-2 py-1.5 rounded-md hover:bg-blue-100"
        >
          <ReturnIcon />
          Volver
        </Link>
        <Image
          src={userInfo.avatarURL as string}
          unoptimized={true}
          className="rounded-full bg-blue-200 w-28 h-28"
          width={150}
          height={150}
          alt="Avatar"
        />
        <h1 className="text-2xl text-gray-800">¡Bienvenido(a) Jean Paul!</h1>
        <p className="text-sm text-gray-500">
          Administra tu información, privacidad y seguridad para que la
          aplicación Pastoral Digital funcione mejor para ti.
        </p>
      </div>

      <div className="grid grid-reverse grid-cols1 md:grid-cols-2 gap-4 max-w-md md:max-w-screen-lg">
        <div className="flex md:flex-col">
          <ChangePersonalInfo user={user} />
        </div>

        <div className="flex md:flex-col order-first md:order-last">
          <ChangeProfilePic
            userID={userInfo.userID as string}
            userFullName={user.name}
            avatarURL={userInfo.avatarURL as string}
          />
        </div>
      </div>
    </div>
  );
}
