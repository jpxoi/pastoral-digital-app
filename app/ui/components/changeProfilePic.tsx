"use client";

import { setLocalStorageItem } from "@/app/utils/localStorageUtils";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChangeProfilePic() {
  const router = useRouter();
  const submitButton = useRef<HTMLButtonElement | null>(null);
  const [userID, setUserID] = useState("");
  const [formToken, setFormToken] = useState("");
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
    setFormToken(process.env.NEXT_PUBLIC_FORM_TOKEN as string);
    setAvatarURL(avatarURL as string);
    setNewAvatarURL(avatarURL as string);
    setUserID(userID as string);
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    submitButton.current?.setAttribute("disabled", "true");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: formToken,
        new_avatar: newAvatarURL,
        user_id: userID,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        alert("¡Tu foto de perfil ha sido cambiada con éxito! Puede que tarde unos días en reflejarse en todas las plataformas.");
        setLocalStorageItem("customAvatar", "false");
        setLocalStorageItem("avatarURL", newAvatarURL);
        setLocalStorageItem("fallbackAvatar", newAvatarURL);
        router.push("/dashboard");
      })
      .catch((error) => console.error(error));
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
        <img
          src={newAvatarURL}
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
        <FileUploaderRegular
          pubkey="513b26950bebd4b01a4d"
          maxLocalFileSizeBytes={5000000}
          multiple={false}
          imgOnly={true}
          sourceList="local, url, camera, instagram"
          classNameUploader="my-config uc-light"
          onFileUploadSuccess={(fileInfo) => {
            setTmpAvatarURL(
              `${fileInfo.cdnUrl}/-/preview/-/scale_crop/512x512/smart`
            );
          }}
          onFileUrlChanged={(fileInfo) => {
            setTmpAvatarURL(
              `${fileInfo.cdnUrl}/-/preview/-/scale_crop/512x512/smart`
            );
          }}
          onDoneClick={() => {
            setNewAvatarURL(tmpAvatarURL);
          }}
          onFileRemoved={() => {
            setTmpAvatarURL("");
            setNewAvatarURL(avatarURL);
          }}
        />
        <div
          className="flex items-center justify-center gap-2"
        >
          <input
            type="hidden"
            name="access_key"
            value="2a91bec6-75a9-4b49-a056-5947abfe4de3"
          />
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
