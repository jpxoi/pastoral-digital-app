"use client"; // Error components must be Client Components

import ErrorMessage from "@/components/shared/errorMessage";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="flex flex-col items-center gap-4 justify-center h-screen">
      <ErrorMessage message={`Error: ${error.message}`} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={
          () => reset()
        }
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
