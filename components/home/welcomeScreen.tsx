import {
  LogoImageWideLight,
  LogoImageWideDark,
} from '@/components/shared/logoImage'
import LoginPrompt from '@/components/home/loginPrompt'
import { Suspense } from 'react'
import LoginPromptSkeleton from '@/components/home/loginPromptSkeleton'

export default function WelcomeScreen() {
  return (
    <div
      id='form_container'
      className='mx-auto flex h-dvh w-screen flex-col justify-between bg-white sm:h-auto sm:max-w-sm sm:rounded-xl sm:shadow-md'
    >
      <div className='flex h-full w-full flex-col justify-between bg-[url(/graphics/narrow-wave.svg)] bg-cover sm:rounded-xl sm:bg-none sm:bg-center'>
        <h1 className='select-none p-8 text-left text-[2.7rem] font-bold leading-normal text-white sm:hidden sm:text-black'>
          Pastoral
          <br />
          Digital
          <br />
          App
        </h1>

        <div className='p-8 pt-0 text-white sm:pt-8 sm:text-black'>
          <LogoImageWideLight />
          <LogoImageWideDark />
          <Suspense fallback={<LoginPromptSkeleton />}>
            <LoginPrompt />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
