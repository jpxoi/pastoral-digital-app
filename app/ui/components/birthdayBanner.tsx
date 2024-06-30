"use client";

import { useEffect, useState } from "react";
import { BirthdayCakeIcon } from "../icons/icons24";
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
      {!loading ? (
        <div id="birthday" className="flex justify-center items-center">
          <div className="flex justify-center bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow-md transition-all duration-300">
            <span className="flex items-center">
              <BirthdayCakeIcon />
            </span>
            <p className="text-sm sm:text-base ml-4 text-left md:text-center hidden md:block">
              {birthdayMessage} Sabemos que hoy es un día especial para ti, y queremos desearte lo mejor en tu día.
            </p>
            <p className="text-sm sm:text-base ml-4 text-left md:text-center block md:hidden">
              {birthdayMessage}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
