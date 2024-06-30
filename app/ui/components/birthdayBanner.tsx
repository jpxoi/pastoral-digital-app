"use client";

import { useEffect, useState } from "react";
import { getLocalStorageItem } from "@/app/utils/localStorageUtils";

export default function BirthdayBanner() {
  const [loading, setLoading] = useState<boolean>(true);
  const [birthdayMessage, setBirthdayMessage] = useState<string>("");

  useEffect(() => {
    const token = getLocalStorageItem("token");
    const dataEndpoint = process.env.NEXT_PUBLIC_DATA_ENDPOINT as string;

    fetch(dataEndpoint)
      .then((response) => response.json())
      .then((data) => {
        const dataItem = data.find((item: any) => item.Token === token);
        if (dataItem["Birthday"]) {
          setBirthdayMessage(`¡Feliz cumpleaños, ${dataItem["Nombres"]}!`);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="card h-[85vh] w-[85vw] lg:h-[70vh] lg:w-[60vw] flex flex-col justify-evenly lg:justify-center items-center text-center lg:flex-row-reverse bg-[#fdfdfd] rounded-xl shadow-lg p-4 overflow-hidden">
        <img
          src="/birthday.svg"
          alt="birthday"
          className="birthday w-full max-h-[40vh]"
        />
        <div className="text p-4">
          <h1 className="text-3xl">{birthdayMessage}</h1>
          <p className="text-lg mt-4">
            ¡Hoy es un día especial para ti! Queremos desearte lo mejor en tu
            día. Que Dios te bendiga y te llene de amor y felicidad.
          </p>
          <p className="text-md text-opacity-80 mt-2">~ El Equipo de Pastoral</p>
        </div>
      </div>
      ) : (
        <></>
      )}
    </>
  );
}
