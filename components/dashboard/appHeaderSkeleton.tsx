import Link from "next/link";
import { UserAvatarSkeleton } from "@/components/user/userAvatarSkeleton";

export default async function AppHeaderSkeleton() {
  return (
    <header className="flex justify-center items-center px-4 py-4 bg-[#07309B] shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center w-screen max-w-screen-xl">
        <Link href="/dashboard" className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Pastoral Digital
          </h1>
        </Link>
        <div className="flex justify-between items-center">
          <div
            id="avatar"
            className="flex items-center cursor-pointer w-8 h-8 sm:w-10 sm:h-10"
          >
            <UserAvatarSkeleton />
          </div>
        </div>
      </nav>
    </header>
  );
}
