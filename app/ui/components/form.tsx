"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ExclamationTriangle } from "../icons/icons24";

export default function Form({ dataEndpoint }: { dataEndpoint: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  let data: any = null;

  useEffect(() => {
    const savedID = localStorage.getItem("id");
    const savedToken = localStorage.getItem("token");
    const suspended = localStorage.getItem("suspended");
    const expiryDate = localStorage.getItem("expiryDate");

    const idPattern = /^[A-Za-z]{2}-\d{3}$/;

    const currentDate = new Date();
    const expiry = new Date(expiryDate as string);

    if (
      expiry > currentDate &&
      savedID &&
      idPattern.test(savedID) &&
      savedToken &&
      suspended
    ) {
      router.push("/dashboard");
      return;
    }
  }, [router]);

  const toggleSubmitButton = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (buttonRef.current) {
      buttonRef.current.disabled = !e.target.validity.valid;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      buttonRef.current.textContent = "Verificando...";
    }

    setError(null);

    try {
      await fetchData();
      const dataItem = checkAnswer(email.toLowerCase());
      localStorage.setItem("id", dataItem.ID);
      localStorage.setItem("token", dataItem.Token);
      localStorage.setItem("suspended", dataItem.Acceso ? "false" : "true");
      localStorage.setItem("avatarURL", dataItem["Foto de Perfil"]);
      localStorage.setItem("firstName", dataItem["Nombres"]);
      localStorage.setItem("lastName", dataItem["Apellidos"]);
      localStorage.setItem("email", dataItem.Email);
      localStorage.setItem("customAvatar", dataItem["Custom Avatar"])
      localStorage.setItem("expiryDate", calculateExpiryDate());
      router.push("/dashboard");
    } catch (error) {
      if (buttonRef.current) {
        buttonRef.current.textContent = "Iniciar Sesión";
        buttonRef.current.disabled = false;
      }

      setError((error as Error).message);
    }
  };

  function calculateExpiryDate() {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 72);
    return currentDate.toISOString();
  }

  async function fetchData() {
    try {
      const response = await fetch(dataEndpoint);
      data = await response.json();
      return "Data loaded";
    } catch (error) {
      throw new Error("No se pudo cargar la información.");
    }
  }

  function checkAnswer(email: string) {
    const dataItem = data.find((item: any) => item.Email === email);

    if (!dataItem) {
      throw new Error("Este correo electrónico no está registrado.");
    }

    if (dataItem.Token === null) {
      throw new Error("Tu acceso aún no ha sido aprobado.");
    }

    return dataItem;
  }

  return (
    <form
      id="qrForm"
      ref={formRef}
      className="flex flex-col items-center mt-4"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="relative w-full">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            toggleSubmitButton(e);
          }}
          placeholder=" "
          className="peer text-left border w-full mx-0 my-1 p-3 rounded-md border-solid border-blue-500 focus:border-blue-600 focus:invalid:border-red-600 focus:valid:border-green-600 valid:border-green-600 focus:outline-none transition-colors duration-200 select-none"
          required
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-gray-400 duration-200 transform -translate-y-3.5 scale-75 top-2 z-10 origin-[0] bg-white rounded-xl px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:peer-invalid:text-red-600 peer-focus:peer-valid:text-green-600 peer-valid:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-3.5 peer-focus:top-2 peer-focus:scale-75 start-1"
        >
          Correo Electrónico
        </label>
      </div>
      <div className="flex flex-row justify-end items-center w-full">
      <a
        href="https://wa.me/51941952314"
        target="_blank"
        rel="noreferrer"
        className="text-xs text-right text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        ¿Olvidaste tu correo electrónico?
      </a>
      </div>
      <button
        id="generar-pase"
        ref={buttonRef}
        disabled
        type="submit"
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer p-3 rounded-md border-none disabled:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Iniciar Sesión
      </button>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex flex-row justify-center mt-4">
          <span className="flex items-center">
            <ExclamationTriangle />
          </span>
          <p className="inline ml-2">{error}</p>
        </div>
      )}
    </form>
  );
}
