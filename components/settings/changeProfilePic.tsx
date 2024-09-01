'use client'

import { FileUploaderMinimal } from '@uploadcare/react-uploader'
import es from '@/lib/es.js'
import '@uploadcare/react-uploader/core.css'
import Image from 'next/image'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function ChangeProfilePic({
  userID,
  userFullName,
  avatarURL,
}: {
  userID: string
  userFullName: string
  avatarURL: string
}) {
  const { user, error, isLoading } = useUser();

  return (
    <div className='flex w-full flex-col items-start gap-4'>
      <div className='flex w-full flex-row items-start justify-between gap-4'>
        {isLoading ? (
          <div className='h-16 min-h-16 w-16 min-w-16 animate-pulse rounded-full bg-gray-200'></div>
        ) : (
          <Image
            src={user?.picture as string}
            className='h-16 w-16 lg:h-24 lg:w-24 rounded-full bg-blue-200'
            width={100}
            height={100}
            alt='Avatar'
          />
        )}
        <div className='flex flex-col items-start gap-2'>
          <p className='text-left text-xs text-gray-500 mb-2 md:mb-0'>
            Usamos Gravatar para gestionar las fotos de perfil de nuestros
            usuarios.
          </p>
          <p className='hidden md:block text-left text-xs text-gray-500 mb-2'>
            Para cambiar tu foto de perfil, haz clic en el botón de abajo y
            introduce el mismo correo electrónico que usas para iniciar sesión en
            Pastoral Digital App. Luego, sigue las instrucciones en la página de
            Gravatar.
          </p>
          <a
            href='https://es.gravatar.com/profile'
            target='_blank'
            className='w-full rounded-lg border border-gray-800 px-4 py-2 text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-800 disabled:hover:bg-transparent disabled:hover:text-gray-800 md:w-fit'
          >
            Cambiar Foto de Perfil en Gravatar
          </a>
        </div>
      </div>
    </div>
  )
}
