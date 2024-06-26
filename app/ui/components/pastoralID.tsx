"use client";

import Image from "next/image";
import PicSkeleton from "./picSkeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ErrorIcon from "./errorIcon";

export default function PastoralID() {
  const router = useRouter();
  const [userID, setUserID] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  const imageLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_CDN_URL}/media/pastoralid/${src}`;
  };

  useEffect(() => {
    const savedID = localStorage.getItem("id");
    const expiryDate = localStorage.getItem("expiryDate");
    const idPattern = /^[A-Za-zÑñ]{2}-\d{3}$/;

    const currentDate = new Date();
    const expiry = new Date(expiryDate as string);

    if (!savedID || !idPattern.test(savedID) || expiry < currentDate) {
      localStorage.clear();
      router.push("/");
    } else {
      setUserID(savedID);
      setLoading(false);
    }
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

  return (
    <div
      id="pastoral_id"
      className="pass-front min-w-[20rem] sm:min-w-[24rem] max-w-xs sm:max-w-sm h-auto m-0 p-0 rounded-lg transition-all duration-300"
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <span>
            <ErrorIcon />
          </span>
          <p className="inline ml-2">{error}</p>
        </div>
      )}
      {!loading ? (
        <Image
          id="pastoral_id_img"
          ref={imageRef}
          className="bg-white shadow-md mx-auto my-2 w-full h-auto m-0 p-0 rounded-lg max-w-sm"
          loader={imageLoader}
          src={`${userID}.png`}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1UwAJDgOebYQBlwAAAABJRU5ErkJggg=="
          onError={handleImageError}
          alt="Pastoral ID"
          width="900"
          height="1150"
        />
      ) : (
        <PicSkeleton />
      )}
    </div>
  );
}
