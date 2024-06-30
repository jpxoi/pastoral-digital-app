"use client";

import { useEffect, useState } from "react";
import { BigAvatarSkeleton } from "../skeletons/avatarSkeleton";

export default function DarkAvatar({ userID }: { userID: string }) {
  const dataEndpoint = process.env.NEXT_PUBLIC_DATA_ENDPOINT;
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [fallbackAvatar, setFallbackAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(dataEndpoint as string);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("No se pudo cargar la información.");
      }
    }

    fetchData()
      .then((data) => {
        const dataItem = data.find(
          (item: { ID: string }) => item.ID === userID
        );
        console.log(dataItem);
        const avatarURL = dataItem["Foto de Perfil"];
        const customAvatar = dataItem["Custom Avatar"];

        const newAvatarURL =
          customAvatar === "true"
            ? `${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoral/profile/${userID}.webp`
            : avatarURL;

        const newFallbackAvatar =
          customAvatar === "true"
            ? `${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoral/profile/${userID}.png`
            : avatarURL;

        setAvatarURL(newAvatarURL);
        setFallbackAvatar(newFallbackAvatar);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dataEndpoint, userID]);

  return (
    <>
      {!loading ? (
        <div
          className={`w-full h-full p-0.5 rounded-full ring-2 ring-blue-200 `}
        >
          <picture className={`w-full h-full bg-blue-200 rounded-full`}>
            <source srcSet={`${avatarURL}`} type="image/webp" />
            <source srcSet={`${fallbackAvatar}`} type="image/png" />
            <img
              src={`${fallbackAvatar}`}
              alt="Avatar Profile Picture"
              className={`w-full h-full bg-blue-200 rounded-full`}
            />
          </picture>
        </div>
      ) : (
        <BigAvatarSkeleton />
      )}
    </>
  );
}
