export default function Offline() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center px-4 gap-8">
      <div className="w-52 md:w-96">
        <img src="/graphics/offline.svg" alt="Offline" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-balance">
          ¡Oops! Parece que no tienes conexión a internet
        </h1>
        <p className="text-md md:text-lg">
          Por favor, revisa tu conexión y vuelve a intentarlo.
        </p>
        <a
        href="/"
        className="text-blue-600 text-md md:text-lg p-2 px-4 hover:text-blue-800 hover:bg-blue-100 rounded-md"
      >
        Volver a intentar
      </a>
      </div>
    </div>
  );
}
