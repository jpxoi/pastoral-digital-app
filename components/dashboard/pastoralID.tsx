import Image from "next/image";
import { getSession, Session } from "@auth0/nextjs-auth0";
import { UserInfoProps } from "@/types/interfaces";
import { fetchUserInfoByEmail } from "@/app/utils/fetchUtils";
import PastoralIDDownloader from "@/components/dashboard/pastoralIDDownloader";

export default async function PastoralID() {
  const { user } = (await getSession()) as Session;
  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email: user.email,
  });

  return (
    <div className="group pass-front min-w-80 sm:min-w-96 sm:max-w-sm h-auto m-0 p-0 rounded-lg transition-all duration-300">
      <div className="group flex justify-center items-center relative cursor-pointer overflow-hidden bg-white rounded-lg drop-shadow-md hover:drop-shadow-2xl transition-all duration-300">
        <Image
          id="pastoral_id_img"
          className="mx-auto w-full max-w-xs sm:max-w-sm h-auto m-0 p-0 rounded-lg"
          src={`${process.env.CDN_URL}/media/pastoralid/${userInfo.userID}.png`}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1UwAJDgOebYQBlwAAAABJRU5ErkJggg=="
          alt="Pastoral ID"
          width="450"
          height="575"
        />
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
        <PastoralIDDownloader
          url={`${process.env.CDN_URL}/media/pastoralid/${userInfo.userID}.png`}
        />
      </div>
    </div>
  );
}
