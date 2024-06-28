"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserAvatar() {
  const router = useRouter();
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [fallbackAvatar, setFallbackAvatar] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [buttonString, setButtonString] = useState<string>("Cerrar Sesión");
  const dropdown = useRef<HTMLDivElement | null>(null);
  const logOutButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatarURL");
    const customAvatar = localStorage.getItem("customAvatar");
    const savedFirstName = localStorage.getItem("firstName");
    const savedLastName = localStorage.getItem("lastName");
    const savedEmail = localStorage.getItem("email");
    const savedUserID = localStorage.getItem("id");

    if (savedAvatar) {
      switch (customAvatar) {
        case "true":
          setAvatarURL(
            `${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoral/profile/${savedUserID}.webp`
          );
          setFallbackAvatar(
            `${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoral/profile/${savedUserID}.png`
          );
          break;
        case "false":
          setAvatarURL(savedAvatar);
          setFallbackAvatar(savedAvatar);
          break;
        default:
          setAvatarURL(savedAvatar);
          setFallbackAvatar(savedAvatar);
          break;
      }
    }

    if (savedFirstName && savedLastName) {
      setFirstName(savedFirstName);
      setLastName(savedLastName);
    }

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (savedUserID) {
      setUserID(savedUserID);
    }
  }, []);

  const handleClear = () => {
    setButtonString("Cerrando Sesión...");
    if (logOutButton.current) {
      logOutButton.current.disabled = true;
    }
    localStorage.clear();
    router.push("/");
    setButtonString("Cerrar Sesión");
  };

  const toggleDropdown = () => {
    if (dropdown) {
      dropdown.current?.classList.toggle("hidden");
    }
  };

  return (
    <>
      <div
        id="avatar"
        className="flex items-center gap-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        {avatarURL ? (
          <div className="w-8 h-8 sm:w-10 sm:h-10 p-0.5 rounded-full ring-2 ring-blue-300">
            <picture className="w-full h-full bg-blue-300 rounded-full">
              <source srcSet={`${avatarURL}`} type="image/webp" />
              <source srcSet={`${fallbackAvatar}`} type="image/png" />
              <img
                src={`${fallbackAvatar}`}
                alt="Avatar Profile Picture"
                className="w-full h-full bg-blue-300 rounded-full"
              />
            </picture>
          </div>
        ) : (
          <div className="w-8 h-8 sm:w-10 sm:h-10 p-0.5 rounded-full ring-2 ring-blue-300">
            <div className="w-full h-full bg-blue-300 animate-pulse rounded-full"></div>
          </div>
        )}
      </div>
      <div
        ref={dropdown}
        className="flex flex-col gap-2 absolute top-16 right-0 w-dvw sm:w-auto sm:right-4 sm:top-20 xl:right-[5vw] 2xl:right-[10vw] bg-white shadow-md sm:shadow-lg sm:rounded-md p-2 transition-all duration-300 transform-gpu hidden z-50"
      >
        <div className="flex flex-col gap-2 p-2 hover:bg-blue-100 cursor-default rounded-md">
          <div className="flex gap-1 justify-center">
            <h4 className="text-lg sm:text-base font-medium sm:font-normal text-gray-600">
              {firstName}
            </h4>
            <h5 className="text-lg sm:text-base font-medium sm:font-normal text-gray-600">
              {lastName}
            </h5>
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <p className="text-sm text-gray-400">{email}</p>
            <p className="text-xs text-gray-400">
              <b>ID: </b>
              {userID}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200"></div>
        <button
          className="text-base text-red-500 hover:text-red-700 p-2 hover:bg-red-100 rounded-md"
          ref={logOutButton}
          onClick={handleClear}
        >
          {buttonString}
        </button>
      </div>
    </>
  );
}
