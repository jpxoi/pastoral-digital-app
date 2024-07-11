"use client";

import Image from "next/image";
import PastoralIDSkeleton from "../skeletons/pastoralIDSkeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ExclamationTriangle } from "../icons/icons24";
import {
  clearLocalStorage,
  getLocalStorageItem,
} from "@/app/utils/localStorageUtils";
import { checkUserLoggedIn } from "@/app/utils/authUtils";

export default function PastoralID() {
  const router = useRouter();
  const [userID, setUserID] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const savedID = getLocalStorageItem("id");
    if (checkUserLoggedIn()) {
      setUserID(savedID);
      setLoading(false);
      return;
    }

    clearLocalStorage();
    router.push("/");
  }, [router]);

  const handleImageError = () => {
    hideImage();
    setError("No se pudo cargar tu Pastoral ID. Por favor, intenta de nuevo.");
  };

  const hideImage = () => {
    if (imageRef.current) {
      imageRef.current.style.display = "none";
    }
  };

  const downloadImage = async (userID: string) => {
    const url = `${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoralid/${userID}.png`;

    try {
      const response = await fetch(url, {
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);

      if (!blobURL) {
        throw new Error("Blob URL is null");
      }

      const a = document.createElement("a");
      a.href = blobURL;
      a.download = "PastoralID.png";
      a.click();

      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      alert(
        "No se pudo descargar tu Pastoral ID. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  return (
    <div
      id="pastoral_id"
      className="group pass-front min-w-80 sm:min-w-96 sm:max-w-sm h-auto m-0 p-0 rounded-lg transition-all duration-300"
    >
      {loading ? (
        <PastoralIDSkeleton />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <span>
            <ExclamationTriangle />
          </span>
          <p className="inline ml-2">{error}</p>
        </div>
      ) : (
        <div className="group flex justify-center items-center relative cursor-pointer overflow-hidden bg-white rounded-lg drop-shadow-md hover:drop-shadow-2xl transition-all duration-300">
          <Image
            id="pastoral_id_img"
            ref={imageRef}
            className="mx-auto w-full max-w-xs sm:max-w-sm h-auto m-0 p-0 rounded-lg"
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoralid/${userID}.png`}
            onClick={() => downloadImage(userID as string)}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1UwAJDgOebYQBlwAAAABJRU5ErkJggg=="
            onError={handleImageError}
            alt="Pastoral ID"
            width="450"
            height="575"
          />
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
        </div>
      )}
    </div>
  );
}
