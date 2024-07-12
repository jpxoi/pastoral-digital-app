export default function manifest() {
  return {
    name: "Pastoral Digital App",
    short_name: "Pastoral Digital",
    description:
      "Pastoral Digital App permite a catequistas de la Pastoral Mariana acceder a su perfil e identificación digital para actividades y reuniones.",
    start_url: "/",
    id: "/",
    lang: "es",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#07309B",
    orientation: "portrait",
    display_override: ["window-controls-overlay"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/mobile.png",
        sizes: "1170x2385",
        type: "image/png",
        form_factor: "narrow"
      },
      {
        src: "/screenshots/desktop.png",
        sizes: "1920x1218",
        type: "image/png",
        form_factor: "wide"
      },
    ],
  };
}
