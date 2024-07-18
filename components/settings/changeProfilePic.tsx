"use client";

import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import es from "@/app/lib/es.js";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import { useRef, useState } from "react";
import ErrorMessage from "../shared/errorMessage";

export default function ChangeProfilePic({
  userID,
  userFullName,
  avatarURL,
}: {
  userID: string;
  userFullName: string;
  avatarURL: string;
}) {
  const submitButton = useRef<HTMLButtonElement | null>(null);
  const [newAvatarURL, setNewAvatarURL] = useState(avatarURL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    submitButton.current?.setAttribute("disabled", "true");
    setLoading(true);

    const body = {
      new_avatar: newAvatarURL,
      user_id: userID,
      name: userFullName,
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
          setSuccess(true);
          setLoading(false);
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
          setError(
            "¡Oops! Parece que ha ocurrido un problema al intentar cambiar tu foto de perfil. Por favor, intentalo de nuevo."
          );
        } else {
          setError(error.message);
        }
        setLoading(false);
        submitButton.current?.removeAttribute("disabled");
      });
  };

  return (
    <div className="flex flex-col gap-6 w-full mt-3 bg-white p-8 rounded-xl shadow-md items-center">
      <h5 className="text-lg text-gray-800">Foto de Perfil</h5>

      <div className="flex flex-row items-center justify-between gap-4 w-full">
        {loading ? (
          <div className="w-16 h-16 animate-pulse bg-gray-200 rounded-full"></div>
        ) : (
          <Image
            src={newAvatarURL}
            unoptimized={true}
            className="rounded-full bg-blue-200 w-16 h-16"
            width={100}
            height={100}
            alt="Avatar"
          />
        )}

        <FileUploaderMinimal
          pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
          maxLocalFileSizeBytes={5000000}
          multiple={false}
          imgOnly={true}
          classNameUploader="my-config uc-light"
          className="w-full"
          localeDefinitionOverride={{
            en: es,
          }}
          onFileUploadSuccess={(fileInfo) => {
            setNewAvatarURL(
              `${fileInfo.cdnUrl}/-/preview/-/scale_crop/512x512/smart`
            );
          }}
          onFileRemoved={() => {
            setNewAvatarURL(avatarURL);
          }}
        />
      </div>
      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
        <button
          className="text-sm text-red-600 hover:text-red-800 py-3 px-4 hover:bg-red-100 border border-red-800 rounded-lg w-full md:w-fit self-center"
          onClick={(e) => {
            e.preventDefault();
            setNewAvatarURL(avatarURL);
          }}
        >
          Descartar Cambios
        </button>
        <button
          ref={submitButton}
          disabled={newAvatarURL === avatarURL}
          onClick={handleSubmit}
          className="text-sm text-blue-600 hover:text-blue-800 py-3 px-4 hover:bg-blue-100 border border-blue-800 rounded-lg w-full md:w-fit self-center disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-blue-600 disabled:hover:bg-transparent"
        >
          Cambiar Foto
        </button>
      </div>
      <p id="disclaimer" className="text-xs text-gray-500">
        El cambio puede tardar unos días en reflejarse en todas las plataformas.
      </p>
      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-green-100 border border-green-700 text-green-700 p-4 rounded-lg flex flex-col justify-center">
            <p className="inline">
              ¡Tu foto de perfil ha sido cambiada con éxito!
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Puede tardar unos días en reflejarse en todas las plataformas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
