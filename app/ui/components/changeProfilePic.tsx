"use client";

import { setLocalStorageItem } from "@/app/utils/localStorageUtils";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import es from "../locales/es.js"
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChangeProfilePic() {
  const router = useRouter();
  const submitButton = useRef<HTMLButtonElement | null>(null);
  const [userID, setUserID] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [tmpAvatarURL, setTmpAvatarURL] = useState("");
  const [newAvatarURL, setNewAvatarURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfoFromLocalStorage = () => {
      const userInfo = {
        avatarURL: localStorage.getItem("avatarURL"),
        customAvatar: localStorage.getItem("customAvatar"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("email"),
        userID: localStorage.getItem("id"),
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

    const { userID, avatarURL } = getUserInfoFromLocalStorage();
    setAvatarURL(avatarURL as string);
    setNewAvatarURL(avatarURL as string);
    setUserID(userID as string);
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    submitButton.current?.setAttribute("disabled", "true");
    setLoading(true);

    const body = {
      new_avatar: newAvatarURL,
      user_id: userID,
      first_name: localStorage.getItem("firstName"),
      last_name: localStorage.getItem("lastName"),
    };

    fetch("https://formspree.io/f/mzzpzpbr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          alert(
            "¡Tu foto de perfil ha sido cambiada con éxito! Puede que tarde unos días en reflejarse en todas las plataformas."
          );
          setLocalStorageItem("customAvatar", "false");
          setLocalStorageItem("avatarURL", newAvatarURL);
          setLocalStorageItem("fallbackAvatar", newAvatarURL);
          setLoading(false);
          router.push("/dashboard");
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              throw new Error(
                data["errors"]
                  .map((error: { [x: string]: any }) => error["message"])
                  .join(", ")
              );
            } else {
              throw new Error(
                "Ha ocurrido un problema inesperado al intentar cambiar tu foto de perfil. Por favor, intentalo de nuevo."
              );
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setNewAvatarURL(avatarURL);
        if (error.message.includes("Failed to fetch")) {
          alert(
            "¡Oops! Parece que ha ocurrido un problema al intentar cambiar tu foto de perfil. Por favor, intentalo de nuevo."
          );
        } else {
          alert(error.message);
        }
        setLoading(false);
        submitButton.current?.removeAttribute("disabled");
      });
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 max-w-md">
      <h1 className="text-2xl text-gray-800">Foto de Perfil</h1>
      <p className="text-sm text-gray-500">
        Una foto ayuda a que la gente te reconozca y permite saber cuándo has
        iniciado sesión en tu cuenta.
      </p>
      {loading ? (
        <div className="w-52 h-52 animate-pulse bg-gray-200 rounded-full"></div>
      ) : (
        <Image
          src={newAvatarURL}
          unoptimized={true}
          className="rounded-full bg-blue-200 w-52 h-52"
          width={200}
          height={200}
          alt="Avatar"
        />
      )}
      <div className="flex flex-col gap-4 w-full mt-3 bg-white p-4 rounded-2xl shadow-md">
        <h5 className="text-base text-gray-800">
          Selecciona una nueva foto de perfil
        </h5>
        <FileUploaderMinimal
          pubkey="513b26950bebd4b01a4d"
          maxLocalFileSizeBytes={5000000}
          multiple={false}
          imgOnly={true}
          classNameUploader="my-config uc-light"
          localeDefinitionOverride={{
            en: es,
          }}
          className="fileUploaderWrapper"
          onFileUploadSuccess={(fileInfo) => {
            setTmpAvatarURL(
              `${fileInfo.cdnUrl}/-/preview/-/scale_crop/512x512/smart`
            );
            setNewAvatarURL(
              `${fileInfo.cdnUrl}/-/preview/-/scale_crop/512x512/smart`
            );
          }}
          onFileRemoved={() => {
            setTmpAvatarURL("");
            setNewAvatarURL(avatarURL);
          }}
        />
        <div className="flex items-center justify-center gap-2">
          <button
            className="text-sm text-red-600 hover:text-red-800 py-2 px-4 hover:bg-red-100 border border-red-800 rounded-lg w-fit self-center"
            onClick={(e) => {
              e.preventDefault();
              setNewAvatarURL(avatarURL);
              router.push("/dashboard");
            }}
          >
            Descartar Cambios
          </button>
          <button
            ref={submitButton}
            disabled={newAvatarURL === avatarURL}
            onClick={handleSubmit}
            className="text-sm text-blue-600 hover:text-blue-800 py-2 px-4 hover:bg-blue-100 border border-blue-800 rounded-lg w-fit self-center disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-blue-600 disabled:hover:bg-transparent"
          >
            Cambiar Foto
          </button>
        </div>
        <p id="disclaimer" className="text-xs text-gray-500">
          El cambio de foto de perfil puede tardar unos días en reflejarse en
          todas las plataformas.
        </p>
      </div>
    </div>
  );
}
