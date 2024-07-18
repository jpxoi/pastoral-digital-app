"use client";

import UserInfo from "@/components/user/userInfo";
import { UserAvatar } from "@/components/user/userAvatar";
import { useUserMenu } from "@/app/context/userMenuContext";
import UserMenuOptions from "./userMenuOptions";

export default function UserMenu() {
  const { userInfo, setIsOpen, isOpen } = useUserMenu();

  return (
    <>
      <div className="flex justify-between items-center">
        <div
          id="avatar"
          className="flex items-center cursor-pointer w-8 h-8 sm:w-10 sm:h-10"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <UserAvatar
            avatarURL={userInfo.avatarURL}
            fallbackAvatar={userInfo.fallbackAvatar as string}
          />
        </div>
      </div>

      <div
        className={`flex flex-col gap-6 absolute top-20 right-4 w-auto xl:right-[5vw] 2xl:right-[10vw] bg-[#e9eef6] shadow-lg rounded-2xl p-3 pt-2 transition-all duration-300 transform-gpu ${isOpen ? "" : "hidden"} z-50`}
      >
        <UserInfo />
        <UserMenuOptions />
      </div>
    </>
  );
}
