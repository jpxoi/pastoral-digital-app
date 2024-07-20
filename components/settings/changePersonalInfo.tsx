'use client'

import { Session } from '@auth0/nextjs-auth0'
import {
  CheckmarkIconMicro,
  CopyIconMicro,
  EditIconMicro,
} from '../icons/icons16'
import { useState } from 'react'

export default function ChangePersonalInfo({
  user,
}: {
  user: Session['user']
}) {
  const [copied, setCopied] = useState(false)

  const handleCopyID = () => {
    navigator.clipboard.writeText(user.sub as string)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  return (
    <div className='flex w-full flex-col items-start gap-6 rounded-xl bg-white px-8 py-8 shadow-md'>
      <h4 className='text-xl font-medium text-gray-800'>
        Información Personal
      </h4>

      <div className='flex w-full flex-col items-start justify-between gap-1 lg:flex-row lg:items-center'>
        <div className='flex flex-col items-start justify-center'>
          <h5 className='text-xs font-medium text-gray-600'>
            Identificador de Cuenta
          </h5>
          <p className='text-sm text-gray-800'>{user.sub as string}</p>
        </div>
        <button
          className='flex flex-row items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800 hover:bg-gray-200'
          onClick={handleCopyID}
          disabled={copied}
        >
          <CopyIconMicro />
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      <div className='flex w-full flex-col items-start justify-between gap-1 lg:flex-row lg:items-center'>
        <div className='flex w-full flex-col items-start justify-center'>
          <h5 className='text-xs font-medium text-gray-600'>
            Correo Electrónico
          </h5>
          <p className='text-sm text-gray-800'>{user.email as string}</p>
        </div>
        {user.email_verified ? (
          <div className='flex flex-row items-center justify-center gap-1 rounded-md bg-green-100 px-2 py-1 text-sm text-green-800'>
            <CheckmarkIconMicro />
            Verificado
          </div>
        ) : (
          <div className='flex items-center justify-center rounded-md bg-yellow-100 px-2 py-1 text-sm text-yellow-800'>
            Pendiente
          </div>
        )}
      </div>

      <div id='separator' className='h-[1px] w-full bg-gray-200' />

      <div className='flex w-full flex-col gap-4'>
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col items-start justify-center gap-1'>
            <h5 className='text-xs font-medium text-gray-600'>Nombres</h5>
            <p className='text-sm text-gray-800'>{user.given_name as string}</p>
          </div>

          <div className='flex flex-col items-start justify-center gap-1'>
            <h5 className='text-xs font-medium text-gray-600'>Apellidos</h5>
            <p className='text-sm text-gray-800'>
              {user.family_name as string}
            </p>
          </div>
        </div>

        <div className='flex flex-row items-center justify-between gap-1'>
          <div className='flex flex-col items-start justify-center'>
            <h5 className='text-xs font-medium text-gray-600'>Apelativo</h5>
            <p className='text-sm text-gray-800'>{user.nickname as string}</p>
          </div>
          <button
            className='group flex cursor-help flex-row items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-gray-50'
            disabled
          >
            <EditIconMicro />
            Editar
            <div
              id='tooltip'
              className={`absolute z-10 mt-16 rounded-md bg-gray-100 p-2 text-xs text-gray-600 shadow-md hidden group-hover:block`}
            >
              <p>Muy pronto podrás editar tu apelativo.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
