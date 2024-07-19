'use client'

import { Session } from '@auth0/nextjs-auth0'

export default function ChangePersonalInfo({
  user,
}: {
  user: Session['user']
}) {
  return (
    <div className='mt-3 flex w-full flex-col gap-6 rounded-xl bg-white px-8 py-8 shadow-md'>
      <h5 className='text-lg text-gray-800 font-medium'>Información Personal</h5>

      <div className='flex flex-col gap-3'>
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col items-start justify-center gap-1'>
            <label htmlFor='givenName' className='text-sm text-gray-600'>
              Nombres
            </label>
            <input
              type='text'
              id='givenName'
              name='givenName'
              className='w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-800'
              placeholder={user.given_name as string}
              disabled
            />
          </div>

          <div className='flex flex-col items-start justify-center gap-1'>
            <label htmlFor='familyName' className='text-sm text-gray-600'>
              Apellidos
            </label>
            <input
              type='text'
              id='familyName'
              name='familyName'
              className='w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-800'
              placeholder={user.family_name as string}
              disabled
            />
          </div>
        </div>

        <div className='flex flex-col items-start justify-center gap-1'>
          <label htmlFor='email' className='text-nowrap text-sm text-gray-600'>
            Correo Electrónico
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-800'
            placeholder={user.email as string}
            disabled
          />
        </div>

        <div className='flex flex-col items-start justify-center gap-1'>
          <label htmlFor='nickname' className='text-sm text-gray-600'>
            Apelativo
          </label>
          <input
            type='text'
            id='nickname'
            name='nickname'
            className='w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-800'
            placeholder={user.nickname as string}
            disabled
          />
        </div>
      </div>

      <div className='flex items-center justify-center gap-2'>
        <button
          className='w-fit self-center rounded-lg border border-blue-800 px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-blue-600'
          disabled
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  )
}
