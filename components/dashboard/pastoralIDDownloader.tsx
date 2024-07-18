"use client";

export default function PastoralIDDownloader({ url }: { url: string }) {
  const downloadImage = async () => {
    try {
      const response = await fetch(url, {
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);

      if (!blobURL) {
        throw new Error("Blob URL is null");
      }

      const a = document.createElement("a");
      a.href = blobURL;
      a.download = "PastoralID.png";
      a.click();

      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      alert(
        "No se pudo descargar tu Pastoral ID. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  return (
    <div
      id="dark-overlay"
      className="absolute top-0 h-full w-full z-10"
      onClick={downloadImage}
    />
  );
}
