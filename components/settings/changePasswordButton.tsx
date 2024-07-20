'use client'

import { recoverPassword } from '@/utils/authUtils'
import { SendIconMicro } from '../icons/icons16'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function ChangePasswordButton({
  userEmail,
}: {
  userEmail: string
}) {
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async () => {
    setLoading(true)
    const res = recoverPassword({ email: userEmail }).finally(() =>
      resetButton()
    )

    toast.promise(
      res,
      {
        loading: 'Enviando correo electrónico',
        success: `Se ha enviado un correo electrónico a ${userEmail} con las instrucciones para cambiar tu contraseña.`,
        error: (error) => `¡Ha ocurrido un error! ${error.message}`,
      },
      {
        success: {
          duration: 10000,
        },
      }
    )
  }

  const resetButton = () => {
    setTimeout(() => {
      setLoading(false)
    }, 10000)
  }

  return (
    <button
      className='flex flex-row items-center justify-center gap-2 rounded-md border border-gray-800 px-4 py-2 text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-800 disabled:hover:text-gray-800'
      onClick={handleChangePassword}
      disabled={loading}
    >
      Cambiar Contraseña {<SendIconMicro />}
    </button>
  )
}
