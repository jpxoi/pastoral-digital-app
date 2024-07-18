import { ReturnIcon } from "@/components/icons/icons16";
import RecoverAccountPrompt from "@/components/recover/recoverAccountPrompt";
import RecoverAccountPromptSkeleton from "@/components/recover/recoverAccountPromptSkeleton";
import Link from "next/link";
import { Suspense } from "react";

export default function RecoverAccountScreen() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-white bg-[url(/graphics/narrow-wave.svg)] sm:bg-[url(/graphics/wide-wave.svg)] bg-cover bg-center px-8 md:px-0">
      <div className="flex flex-col items-center gap-2">
        <Link
          href="/"
          className="flex flex-row justify-start items-center self-start text-white px-2 py-1.5 rounded-md hover:bg-white/20 transition-colors duration-200"
        >
          <ReturnIcon />
          Volver
        </Link>
        <div className="flex flex-col items-center gap-4 p-6 md:p-8 w-full max-w-md bg-white rounded-xl">
          <h1 className="text-3xl font-bold text-center">Activar Cuenta</h1>
          <p className="text-center">
            Ingresa el correo electrónico asociado a tu cuenta de Pastoral
            Digital para activarla.
          </p>
          <Suspense fallback={<RecoverAccountPromptSkeleton />}>
            <RecoverAccountPrompt />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
