import Link from "next/link";

export default function WelcomeBackPrompt({ nickname }: { nickname: string }) {
  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl text-center font-semibold sm:font-normal">¡Hola, {nickname}!</h1>
        <p className="text-center text-sm text-gray-200 sm:text-gray-500">
          ¿No eres {nickname}?{" "}
          <a
            href="/api/auth/logout"
            className="text-gray-50 sm:text-blue-500 hover:underline hover:text-white sm:hover:text-blue-600"
          >
            Cerrar Sesión
          </a>
        </p>
      </div>
      <Link
        href="/dashboard"
        className="w-full bg-white hover:bg-gray-100 sm:bg-blue-500 sm:hover:bg-blue-600 text-blue-500 sm:text-white border border-white hover:border-gray-200 sm:border-blue-500 sm:hover:border-blue-600 cursor-pointer p-3 rounded-md transition-colors duration-200"
      >
        Acceder a la Plataforma
      </Link>
    </div>
  );
}
