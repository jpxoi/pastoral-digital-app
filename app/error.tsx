"use client";

import ErrorMessage from "@/components/shared/errorMessage";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex w-full flex-col justify-center items-center">
      <div
        role="alert"
        className="flex flex-col items-center gap-6 justify-center max-w-screen-sm p-8 h-screen"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">¡Algo salió mal!</h1>
          <h2 className="text-xl text-red-950 font-semibold">
            {`Error ${error.digest || "desconocido"}`}
          </h2>

          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={() => setShowError(!showError)}
          >
            {showError ? "Ocultar detalles" : "Mostrar detalles"}
          </button>
        </div>
        {showError && <ErrorMessage message={`${error.message}`} />}
        <button
          className="bg-blue-600 hover:bg-blue-700 border-none text-white font-bold py-2 px-4 rounded-md max-w-fit"
          onClick={() => reset()}
        >
          Intentar de nuevo
        </button>
        <div className="text-sm text-gray-500">
          <p>Si el problema persiste, intente con las siguientes opciones</p>
          <Link className="text-blue-600 hover:underline" href="/">
            Regresar al inicio
          </Link>
          <span className="mx-1">|</span>
          <a
            href="https://wa.me/447787024710"
            className="text-yellow-600 hover:underline"
          >
            Contactar a soporte
          </a>
        </div>{" "}
      </div>
    </main>
  );
}
