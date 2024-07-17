import Link from "next/link";

export default async function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Página no encontrada
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Lo sentimos, no podemos encontrar esa página. Puede que haya sido
            eliminada o que la dirección no sea correcta.
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
