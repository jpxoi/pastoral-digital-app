"use client";

import { useState } from "react";

export default function PWAPrompt() {
  const [bannerVisible, setBannerVisible] = useState("hidden");
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  window.addEventListener(
    "beforeinstallprompt",
    (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      if (localStorage.getItem("installPrompt")) {
        return;
      }

      /* If it is not a mobile device, do not show the banner */
      if (!/Mobi/.test(navigator.userAgent)) {
        return;
      }

      setInstallPrompt(e);
      console.log(installPrompt);
      setBannerVisible("");
    }
  );

  const handleInstall = async () => {
    if (!installPrompt) {
      console.log("No install prompt");
      return;
    }

    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
  };

  const disableInAppInstallPrompt = () => {
    setInstallPrompt(null);
    setBannerVisible("hidden");
  };

  const disableInAppInstallPromptForever = () => {
    disableInAppInstallPrompt();
    window.removeEventListener("beforeinstallprompt", () => {});
    localStorage.setItem("installPrompt", "false");
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-blue-100 p-4 text-center ${bannerVisible}`}
    >
      <p className="text-md sm:text-lg text-blue-900">
        ¿Quieres instalar esta aplicación en tu dispositivo?
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md"
          onClick={disableInAppInstallPrompt}
        >
          No, gracias
        </button>
        <button
          className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md"
          onClick={handleInstall}
        >
          Sí, instalar
        </button>
      </div>
    </div>
  );
}
