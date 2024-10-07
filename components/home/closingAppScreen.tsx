import {
    LogoImageWideLight,
    LogoImageWideDark,
  } from '@/components/shared/logoImage'
  import LoginPrompt from '@/components/home/loginPrompt'
  import { Suspense } from 'react'
  import LoginPromptSkeleton from '@/components/home/loginPromptSkeleton'
  
  export default function ClosingAppScreen() {
    return (
      <div
        id='form_container'
        className='mx-auto flex h-dvh w-screen flex-col justify-between sm:bg-white sm:h-auto sm:max-w-sm sm:rounded-xl sm:shadow-md'
      >
        <div className='flex h-full w-full flex-col justify-between bg-none sm:rounded-xl sm:bg-center'>
          <h1 className='select-none p-8 text-left text-[2.7rem] font-semibold leading-normal text-white sm:hidden sm:text-black'>
            Pastoral
            <br />
            Digital
            <br />
            App
          </h1>
  
          <div className='p-8 pt-0 text-white sm:pt-8 sm:text-black'>
            <LogoImageWideLight />
            <LogoImageWideDark />
            <div className='mt-6 flex flex-col items-center gap-4'>
                <h1 className='text-2xl font-semibold text-center text-white sm:text-blue-950 text-balance'>
                    ¡Gracias por usar Pastoral Digital App!
                </h1>
                <p className='text-white sm:text-blue-950 text-pretty text-center'>
                    Lamentamos informarte que esta aplicación ha sido descontinuada por motivos logísticos. Ha sido un placer servirte y esperamos que hayas disfrutado de la experiencia. ¡Hasta pronto!
                </p>
                <p className='text-sm text-white sm:text-blue-950 text-pretty text-center'>
                    Si tienes alguna pregunta o comentario, por favor contacta con Irvin Alvarado vía WhatsApp
                </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  