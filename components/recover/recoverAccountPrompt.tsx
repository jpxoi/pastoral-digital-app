"use client";

import { useEffect, useState } from "react";
import SuccessMessage from "@/components/shared/successMessage";
import ErrorMessage from "@/components/shared/errorMessage";
import RecoverAccountPromptSkeleton from "./recoverAccountPromptSkeleton";

export default function RecoverAccountPrompt() {
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(false);
    window.addEventListener("online", () => setOffline(false));
    window.addEventListener("offline", () => setOffline(true));
  }, []);

  const handleRecoverAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: "BxVmRmouE9EYcOlBQtBEriRKE8da4u5V",
        email: userEmail,
        connection: "Username-Password-Authentication",
      }),
    };

    try {
      const response = await fetch(
        "https://jpxoi.us.auth0.com/dbconnections/change_password",
        options
      );

      if (response.ok) {
        setSuccess(true);
        setError("");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error: any) {
      setError(error.message as string);
    }
  };

  if (offline)
    return (
      <div className="mt-6">
        <ErrorMessage message="No hay conexión a internet. Por favor, intenta más tarde." />
      </div>
    );
  if (loading) return <RecoverAccountPromptSkeleton />;

  return (
    <>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleRecoverAccount}
      >
        <div className="flex flex-col gap-1 justify-center items-center w-full">
          <label htmlFor="email" className="text-sm font-semibold">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo Electrónico"
            className="w-full p-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            value={userEmail}
            disabled={success}
            required
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={userEmail.length < 5 || success}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 py-3 rounded-md transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
        >
          Activar Cuenta
        </button>
      </form>
      {success && (
        <SuccessMessage message="Si el correo ingresado está asociado a una cuenta, recibirás un mensaje con instrucciones para restablecer tu contraseña." />
      )}
      {error && <ErrorMessage message={error} />}
    </>
  );
}
