"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function PastoralButtons() {
  const router = useRouter();
  const cleanRef = useRef<HTMLButtonElement | null>(null);
  const downloadRef = useRef<HTMLButtonElement | null>(null);

  const handleClear = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const handleDownload = () => {
    const userID = localStorage.getItem("id");
    if (userID) {
      const a = document.createElement("a");
      a.href = `https://static.jpxoi.com/media/pastoralid/${userID}.png?download`;
      a.download = `PastoralID-${userID}.png`;
      a.click();
    }
  };

  return (
    <div
      id="buttons"
      className="flex flex-row justify-between gap-4 mx-auto my-2 max-w-xs sm:max-w-sm"
    >
      <button
        id="limpiar"
        ref={cleanRef}
        onClick={handleClear}
        className="bg-red-500 hover:bg-red-700 text-white cursor-pointer w-96 p-2 rounded-lg border-none transition-colors duration-300"
      >
        Salir
      </button>
      <button
        id="download"
        ref={downloadRef}
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer w-96 p-2 rounded-lg border-none transition-colors duration-300"
      >
        Descargar
      </button>
    </div>
  );
}
