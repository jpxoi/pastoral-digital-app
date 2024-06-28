"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import UserInfo from "./userInfo";
import { getLocalStorageItem } from "@/app/utils/localStorageUtils";
import { logOut } from "@/app/utils/authUtils";
import AvatarSkeleton from "../skeletons/avatarSkeleton";

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
        className="flex items-center gap-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        {userInfo.avatarURL ? (
          <div className="w-8 h-8 sm:w-10 sm:h-10 p-0.5 rounded-full ring-2 ring-blue-100">
            <picture className="w-full h-full bg-blue-100 rounded-full">
              <source srcSet={`${userInfo.avatarURL}`} type="image/webp" />
              <source srcSet={`${userInfo.fallbackAvatar}`} type="image/png" />
              <img
                src={`${userInfo.fallbackAvatar}`}
                alt="Avatar Profile Picture"
                className="w-full h-full bg-blue-100 rounded-full"
              />
            </picture>
          </div>
        ) : (
          <AvatarSkeleton />
        )}
      </div>
      <div
        ref={dropdown}
        className="flex flex-col gap-3 absolute top-20 right-4 w-auto xl:right-[5vw] 2xl:right-[10vw] bg-white shadow-lg rounded-md p-2 transition-all duration-300 transform-gpu hidden z-50"
      >
        <UserInfo
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          email={userInfo.email}
          userID={userInfo.userID}
        />
        <div id="user-options" className="flex flex-col gap-1">
          <a
            className="text-base text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-100 rounded-md"
            href={`https://api.whatsapp.com/send/?phone=447787024710&text=Hola+JP%2C+soy+${userInfo.firstName}+${userInfo.lastName}+y+mi+ID+de+Catequista+es+${userInfo.userID}.+Te+escribo+para+modificar+mi+foto+de+perfil+📸`}
            target="_blank"
            rel="noreferrer"
            onClick={() => toggleDropdown()}
          >
            Modificar Foto de Perfil
          </a>
          <a
            className="text-base text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-100 rounded-md"
            href="https://forms.gle/Ro3FXViPPCXeEFV49"
            target="_blank"
            rel="noreferrer"
            onClick={() => toggleDropdown()}
          >
            Justificar Inasistencia
          </a>
        </div>
        <button
          className="text-base text-red-500 hover:text-red-700 p-2 hover:bg-red-100 rounded-md"
          ref={logOutButton}
          onClick={handleLogOut}
        >
          {buttonString}
        </button>
      </div>
    </>
  );
}
