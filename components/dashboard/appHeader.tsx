import Link from "next/link";
import UserMenu from "@/components/user/userMenu";
import { getSession, Session } from "@auth0/nextjs-auth0";
import { UserInfoProps } from "@/types/interfaces";
import { fetchUserInfoByEmail } from "@/app/utils/fetchUtils";
import { UserMenuProvider } from "@/app/context/userMenuContext";

export default async function AppHeader() {
  const { user } = (await getSession()) as Session;
  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email: user.email,
  });

  return (
    <header className="flex justify-center items-center px-4 py-4 bg-[#07309B] shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center w-screen max-w-screen-xl">
        <Link href="/dashboard" className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Pastoral Digital
          </h1>
        </Link>
        <UserMenuProvider userSession={user} userInfo={userInfo}>
          <UserMenu />
        </UserMenuProvider>
      </nav>
    </header>
  );
}
