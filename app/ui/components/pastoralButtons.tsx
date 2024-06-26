"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function PastoralButtons() {
  const router = useRouter();
  const cleanRef = useRef<HTMLButtonElement | null>(null);
  const downloadRef = useRef<HTMLButtonElement | null>(null);

  const handleClear = () => {
    if (cleanRef.current) {
      cleanRef.current.disabled = true;
      cleanRef.current.textContent = "Saliendo...";
    }

    localStorage.removeItem("id");
    router.push("/");

    if (cleanRef.current) {
      cleanRef.current.disabled = false;
      cleanRef.current.textContent = "Salir";
    }
  };

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.disabled = true;
      downloadRef.current.textContent = "Descargando...";
    }

    const userID = localStorage.getItem("id");
    if (userID) {
      const a = document.createElement("a");
      a.href = `https://static.jpxoi.com/media/pastoralid/${userID}.png?download`;
      a.download = `PastoralID-${userID}.png`;
      a.click();
    }

    if (downloadRef.current) {
      downloadRef.current.disabled = false;
      downloadRef.current.textContent = "Descargar";
    }
  };

  return (
    <div
      id="buttons"
      className="flex flex-row justify-between gap-4 mx-auto my-2 max-w-xs sm:max-w-sm transition-all duration-300"
    >
      <button
        id="limpiar"
        ref={cleanRef}
        onClick={handleClear}
        className="border border-red-600 hover:bg-red-600 text-red-700 hover:text-white cursor-pointer w-96 p-3 rounded-lg transition-colors duration-300 disabled:hover:bg-transparent disabled:hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Salir
      </button>
      <button
        id="download"
        ref={downloadRef}
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer w-96 p-3 rounded-lg border-none transition-colors duration-300 disabled:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Descargar
      </button>
    </div>
  );
}
