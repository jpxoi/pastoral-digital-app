"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import UserInfo from "./userInfo";
import { getLocalStorageItem } from "@/app/utils/localStorageUtils";
import { logOut } from "@/app/utils/authUtils";
import Avatar from "./avatar";
import { JustifyIcon, LogOutIcon } from "../icons/icons24";

export default function UserAvatar() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    avatarURL: null as string | null,
    fallbackAvatar: null as string | null,
    firstName: null as string | null,
    lastName: null as string | null,
    email: null as string | null,
    userID: null as string | null,
  });
  const [buttonString, setButtonString] = useState("Cerrar Sesión");
  const dropdown = useRef<HTMLDivElement | null>(null);
  const logOutButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const getUserInfoFromLocalStorage = () => {
      const userInfo = {
        avatarURL: getLocalStorageItem("avatarURL"),
        customAvatar: getLocalStorageItem("customAvatar"),
        firstName: getLocalStorageItem("firstName"),
        lastName: getLocalStorageItem("lastName"),
        email: getLocalStorageItem("email"),
        userID: getLocalStorageItem("id"),
      };

      const avatarURL =
        userInfo.customAvatar === "true"
          ? `${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoral/profile/${userInfo.userID}.webp`
          : userInfo.avatarURL;

      const fallbackAvatar =
        userInfo.customAvatar === "true"
          ? `${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoral/profile/${userInfo.userID}.png`
          : userInfo.avatarURL;

      return { ...userInfo, avatarURL, fallbackAvatar };
    };

    setUserInfo(getUserInfoFromLocalStorage());
  }, []);

  const handleLogOut = useCallback(() => {
    setButtonString("Cerrando Sesión...");
    if (logOutButton.current) {
      logOutButton.current.disabled = true;
    }
    logOut();
    router.push("/");
    setButtonString("Cerrar Sesión");
  }, [router]);

  const toggleDropdown = useCallback(() => {
    if (dropdown.current) {
      dropdown.current.classList.toggle("hidden");
    }
  }, []);

  return (
    <>
      <div
        id="avatar"
        className="flex items-center cursor-pointer w-8 h-8 sm:w-10 sm:h-10"
        onClick={toggleDropdown}
      >
        <Avatar
          avatarURL={userInfo.avatarURL}
          fallbackAvatar={userInfo.fallbackAvatar || ""}
          bg="100"
        />
      </div>
      <div
        ref={dropdown}
        className="flex flex-col gap-6 absolute top-20 right-4 w-auto xl:right-[5vw] 2xl:right-[10vw] bg-[#e9eef6] shadow-lg rounded-lg p-3 pt-2 transition-all duration-300 transform-gpu hidden z-50"
      >
        <UserInfo
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          email={userInfo.email}
          userID={userInfo.userID}
          avatarURL={userInfo.avatarURL}
          fallbackAvatar={userInfo.fallbackAvatar}
          dropdown={dropdown}
        />
        <div className="grid grid-cols-2 gap-1">
          <a
            className="text-sm text-blue-500 hover:text-blue-800 py-3 px-2 bg-white hover:bg-blue-100 flex flex-row justify-center items-center gap-1 rounded-3xl rounded-r-md"
            href={`https://docs.google.com/forms/d/e/1FAIpQLSd_iJ7BJaofM-yQUFNa9tDImNrdRVY0JoXqbLgpjmUxrFEIuA/viewform?usp=pp_url&entry.1528530871=${userInfo.userID}&entry.858990924=${userInfo.firstName}+${userInfo.lastName}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => toggleDropdown()}
          >
            <JustifyIcon />
            Justificar Falta
          </a>
          <button
            className="text-sm text-red-500 hover:text-red-800 py-3 px-2 bg-white hover:bg-red-100 flex flex-row justify-center items-center gap-1 rounded-3xl rounded-l-md"
            ref={logOutButton}
            onClick={handleLogOut}
          >
            <LogOutIcon />
            {buttonString}
          </button>
        </div>
      </div>
    </>
  );
}
