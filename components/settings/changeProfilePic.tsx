'use client'

import { FileUploaderMinimal } from '@uploadcare/react-uploader'
import es from '@/lib/es.js'
import '@uploadcare/react-uploader/core.css'
import Image from 'next/image'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function ChangeProfilePic({
  userID,
  userFullName,
  avatarURL,
}: {
  userID: string
  userFullName: string
  avatarURL: string
}) {
  const submitButton = useRef<HTMLButtonElement | null>(null)
  const [newAvatarURL, setNewAvatarURL] = useState(avatarURL)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    submitButton.current?.setAttribute('disabled', 'true')
    setLoading(true)
    toast.loading('Cambiando tu foto de perfil...')

    const body = {
      new_avatar: newAvatarURL,
      user_id: userID,
      name: userFullName,
    }

    fetch('https://formspree.io/f/mzzpzpbr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          toast.success('¡Tu foto de perfil ha sido cambiada exitosamente!')
          setLoading(false)
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, 'errors')) {
              throw new Error(
                data['errors']
                  .map((error: { [x: string]: any }) => error['message'])
                  .join(', ')
              )
            } else {
              throw new Error(
                'Ha ocurrido un problema inesperado al intentar cambiar tu foto de perfil. Por favor, intentalo de nuevo.'
              )
            }
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error.message)
        setNewAvatarURL(avatarURL)
        if (error.message.includes('Failed to fetch')) {
          toast.error(
            '¡Oops! Parece que ha ocurrido un problema al intentar cambiar tu foto de perfil. Por favor, intentalo de nuevo.'
          )
        } else {
          toast.error(error.message)
        }
        setLoading(false)
        submitButton.current?.removeAttribute('disabled')
      })
  }

  return (
    <div className='flex w-full flex-col items-start gap-4'>
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        {loading ? (
          <div className='h-16 min-h-16 w-16 min-w-16 animate-pulse rounded-full bg-gray-200'></div>
        ) : (
          <Image
            src={newAvatarURL}
            unoptimized={true}
            className='h-16 w-16 rounded-full bg-blue-200'
            width={100}
            height={100}
            alt='Avatar'
          />
        )}
        <FileUploaderMinimal
          pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
          maxLocalFileSizeBytes={5000000}
          multiple={false}
          imgOnly={true}
          classNameUploader='my-config uc-light'
          className='w-full'
          localeDefinitionOverride={{
            en: es,
          }}
          onFileUploadSuccess={(fileInfo) => {
            setNewAvatarURL(
              `${fileInfo.cdnUrl}/-/preview/-/scale_crop/512x512/smart`
            )
          }}
          onFileRemoved={() => {
            setNewAvatarURL(avatarURL)
          }}
        />
      </div>
      <div className='flex w-full flex-col items-center justify-end gap-2 md:flex-row'>
        <button
          ref={submitButton}
          disabled={newAvatarURL === avatarURL}
          onClick={handleSubmit}
          className='w-full rounded-lg border border-gray-800 px-4 py-2 text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-800 disabled:hover:bg-transparent disabled:hover:text-gray-800 md:w-fit'
        >
          Cambiar Foto de Perfil
        </button>
      </div>
    </div>
  )
}
