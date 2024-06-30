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

  return <></>;
}
