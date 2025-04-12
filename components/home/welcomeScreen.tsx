import {
  LogoImageWideLight,
  LogoImageWideDark,
} from '@/components/shared/logoImage'
import LoginPrompt from '@/components/home/loginPrompt'

export default function WelcomeScreen() {
  return (
    <div className='mx-auto flex h-screen w-screen flex-col justify-between sm:h-auto sm:max-w-sm sm:rounded-xl sm:bg-white sm:shadow-md'>
      <div className='flex h-full w-full flex-col justify-between bg-none sm:rounded-xl sm:bg-center'>
        <h1 className='select-none p-4 text-left text-[2.7rem] font-semibold leading-normal text-white sm:hidden sm:text-black'>
          Pastoral
          <br />
          Digital
          <br />
          App
        </h1>

        <div className='p-4 pb-8 text-white sm:p-8 sm:text-black'>
          <LogoImageWideLight />
          <LogoImageWideDark />
          <LoginPrompt />
        </div>
      </div>
    </div>
  )
}
