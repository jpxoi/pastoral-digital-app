export default function manifest() {
  return {
    name: "Pastoral Digital App",
    short_name: "Pastoral Digital",
    description:
      "Pastoral Digital App es una aplicación web que permite a los catequistas de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro acceder a un perfil digitial con información de sus asistencias a las reuniones de catequesis, así como también a su identificación digital para el acceso a las actividades de la Pastoral Mariana.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
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
        src: "/images/screenshots/mobile.png",
        sizes: "1170x2385",
        type: "image/png",
        form_factor: "narrow"
      },
      {
        src: "/images/screenshots/desktop.png",
        sizes: "1920x1218",
        type: "image/png",
        form_factor: "wide"
      },
    ],
  };
}
