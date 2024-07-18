"use client";

import { useEffect, useState } from "react";
import LoginPromptSkeleton from "@/components/home/loginPromptSkeleton";
import { useUser } from "@auth0/nextjs-auth0/client";
import WelcomeBackPrompt from "@/components/home/welcomeBackPrompt";
import ErrorMessage from "@/components/shared/errorMessage";
import Link from "next/link";

export default function LoginPrompt() {
  const { user, error, isLoading } = useUser();
  const [offline, setOffline] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.clear();
    setLoading(false);
    window.addEventListener("online", () => setOffline(false));
    window.addEventListener("offline", () => setOffline(true));
  }, [user, error]);

  if (offline)
    return (
      <div className="mt-6">
        <ErrorMessage message="No hay conexión a internet. Por favor, intenta más tarde." />
      </div>
    );
  if (loading || isLoading) return <LoginPromptSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  if (user)
    return (
      <WelcomeBackPrompt
        nickname={user.nickname || (user.given_name as string)}
      />
    );

  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      <p className="text-center">Elige una opción para continuar</p>
      <a
        href="/api/auth/login?returnTo=/dashboard"
        className="w-full bg-white hover:bg-gray-100 sm:bg-blue-500 sm:hover:bg-blue-600 text-blue-500 sm:text-white border border-white hover:border-gray-200 sm:border-blue-500 sm:hover:border-blue-600 cursor-pointer p-3 rounded-md  disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Iniciar Sesión
      </a>
      <Link
        href="/recover"
        className="w-full bg-transparent hover:bg-white hover:bg-opacity-10 sm:bg-white sm:hover:bg-gray-100 text-white sm:hover:text-blue-500 sm:text-blue-500 border border-white sm:border-blue-500 cursor-pointer p-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Activar Cuenta
      </Link>
    </div>
  );
}
