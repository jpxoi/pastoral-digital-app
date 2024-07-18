import {
  LogoImageWideLight,
  LogoImageWideDark,
} from "@/components/shared/logoImage";
import LoginPrompt from "@/components/home/loginPrompt";
import { Suspense } from "react";
import LoginPromptSkeleton from "@/components/home/loginPromptSkeleton";

export default function WelcomeScreen() {
  return (
    <div
      id="form_container"
      className="flex flex-col justify-between w-screen h-dvh sm:h-auto sm:rounded-xl sm:shadow-md sm:max-w-sm bg-white	mx-auto"
    >
      <div className="flex flex-col sm:rounded-xl w-full h-full bg-[url(/graphics/narrow-wave.svg)] sm:bg-none bg-cover sm:bg-center justify-between">
        <h1 className="text-[2.7rem] text-white text-left sm:hidden sm:text-black font-bold leading-normal p-8 select-none">
          Pastoral
          <br />
          Digital
          <br />
          App
        </h1>

        <div className="p-8 pt-0 sm:pt-8 text-white sm:text-black">
          <LogoImageWideLight />
          <LogoImageWideDark />
          <Suspense fallback={<LoginPromptSkeleton />}>
            <LoginPrompt />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
