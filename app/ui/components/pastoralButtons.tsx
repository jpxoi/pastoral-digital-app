"use client";

import { useRouter } from "next/navigation";

export default function PastoralButtons() {
  const router = useRouter();

  const handleClear = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("full-name");
    router.push("/");
  };

  return (
    <>
      <button
        className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-md text-sm transition-colors duration-300 hidden sm:block"
        onClick={handleClear}
      >
        Cerrar Sesión
      </button>
      <button
        className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-md text-sm transition-colors duration-300 sm:hidden"
        onClick={handleClear}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
      </button>
    </>
  );
}
