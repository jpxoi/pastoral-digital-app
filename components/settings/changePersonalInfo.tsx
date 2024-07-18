"use client";

import { Session } from "@auth0/nextjs-auth0";

export default function ChangePersonalInfo({
  user,
}: {
  user: Session["user"];
}) {
  return (
    <div className="flex flex-col gap-6 w-full mt-3 bg-white px-8 py-8 rounded-xl shadow-md">
      <h5 className="text-lg text-gray-800">Información Personal</h5>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 justify-center items-start">
            <label htmlFor="givenName" className="text-sm text-gray-600">
              Nombres
            </label>
            <input
              type="text"
              id="givenName"
              name="givenName"
              className="text-sm text-gray-800 p-2 border border-gray-300 rounded-lg w-full"
              placeholder={user.given_name as string}
              disabled
            />
          </div>

          <div className="flex flex-col gap-1 justify-center items-start">
            <label htmlFor="familyName" className="text-sm text-gray-600">
              Apellidos
            </label>
            <input
              type="text"
              id="familyName"
              name="familyName"
              className="text-sm text-gray-800 p-2 border border-gray-300 rounded-lg w-full"
              placeholder={user.family_name as string}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 justify-center items-start">
          <label htmlFor="email" className="text-sm text-gray-600 text-nowrap">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="text-sm text-gray-800 p-2 border border-gray-300 rounded-lg w-full"
            placeholder={user.email as string}
            disabled
          />
        </div>

        <div className="flex flex-col gap-1 justify-center items-start">
          <label htmlFor="nickname" className="text-sm text-gray-600">
            Apelativo
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="text-sm text-gray-800 p-2 border border-gray-300 rounded-lg w-full"
            placeholder={user.nickname as string}
            disabled
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          className="text-sm text-blue-600 hover:text-blue-800 py-2 px-4 hover:bg-blue-100 border border-blue-800 rounded-lg w-fit self-center disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-blue-600 disabled:hover:bg-transparent"
          disabled
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
