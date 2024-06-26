"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Form({ dataEndpoint }: { dataEndpoint: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  let data: any = null;

  useEffect(() => {
    const savedID = localStorage.getItem("id");
    const idPattern = /^[A-Za-z]{2}-\d{3}$/;

    if (savedID && idPattern.test(savedID)) {
      router.push("/generate");
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
      router.push("/generate");
    } catch (error) {
      if (buttonRef.current) {
        buttonRef.current.textContent = "Generar Pastoral Digital ID";
        buttonRef.current.disabled = false;
      }

      setError((error as Error).message);
    }
  };

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

    if (!dataItem.Acceso) {
      throw new Error("Tu acceso ha sido revocado.");
    }

    return dataItem;
  }

  return (
    <form
      id="qrForm"
      ref={formRef}
      className="flex flex-col items-center"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label htmlFor="codigo" className="mt-4">
        Correo Electrónico:
      </label>
      <input
        type="email"
        name="email"
        id="codigo"
        value={email}
        onChange={(e) => {
          toggleSubmitButton(e);
        }}
        placeholder="Introduce tu correo electrónico"
        className="text-center border w-full mx-0 my-2 p-2 rounded-md border-solid border-blue-500 focus:border-blue-600 focus:invalid:border-red-600 focus:valid:border-green-600 valid:border-green-600 focus:outline-none transition-colors duration-150"
        required
      />
      <button
        id="generar-pase"
        ref={buttonRef}
        disabled
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer p-3 rounded-md border-none disabled:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        Generar Pastoral Digital ID
      </button>
      {error && (
        <p
          id="error-message"
          className="w-full text-center text-red-800 py-2 px-4 bg-red-200 rounded-md mt-2"
        >
          <strong>Error: </strong>
          {error}
        </p>
      )}
    </form>
  );
}
