# Pastoral Digital App

![Pastoral Digital App](/app/opengraph-image.jpeg)
[Reportar error](https://github.com/jpxoi/pastoral-digital-app/issues) · [Sugerir algo](https://github.com/jpxoi/pastoral-digital-app/issues)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/jpxoi/pastoral-digital-app)

<details>

<summary>📖 Tabla de Contenidos</summary>

- [📄 Descripción](#-descripción)
- [✨ Características](#-características)
- [🆕 Novedades](#-novedades)
- [🚀 Primeros Pasos](#-primeros-pasos)
- [🚀 Desplegar la aplicación](#-desplegar-la-aplicación)
- [🤝 Contribuir](#-contribuir)
- [📜 Licencia](#-licencia)
- [📞 Contacto](#-contacto)

</details>

## 📄 Descripción

Pastoral Digital App es una aplicación web que permite a los catequistas de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro acceder a un perfil digital con información de sus asistencias a las reuniones de catequesis, así como también a su identificación digital para el acceso a las actividades de la Pastoral Mariana.

## ✨ Características

Los catequistas pueden hacer lo siguiente dentro de la aplicación:

- 📲 **Pastoral Digital ID.** Identificador digital con código QR para registrar tu asistencia.
- 📅 **Registro de asistencias.** Visualización de fechas, horas y estado de asistencias.
- 👤 **Perfil de catequista.** Información personal, incluyendo nombre, foto y correo.

## 🆕 Novedades

La aplicación se encuentra en constante desarrollo, por lo que se irán añadiendo nuevas funcionalidades y mejoras en futuras versiones. Los _releases_ de la aplicación se publican de forma mensual en nuestra página de [Release Notes](https://jpxoi.notion.site/Pastoral-Digital-Release-Notes-292bc69d40434537996829014d6e6cb2)

## 🚀 Primeros Pasos

Esta aplicación es una _Progressive Web App_ (PWA) y puede ser instalada en cualquier dispositivo con un navegador web moderno. Para instalar la aplicación en tu dispositivo, sigue los siguientes pasos:

1. Abre la aplicación en tu navegador web favorito ingresando a la siguiente URL: [https://id.pastoralmarianaps.net.pe](https://id.pastoralmarianaps.net.pe).

2. Una vez que la aplicación haya cargado, busca la opción de "Instalar" en el menú de tu navegador. En Google Chrome, esta opción se encuentra en el menú de tres puntos verticales en la esquina superior derecha de la pantalla.

3. Haz clic en la opción de "Instalar" y sigue las instrucciones en pantalla para instalar la aplicación en tu dispositivo.

4. ¡Listo! Ahora podrás acceder a la aplicación desde tu pantalla de inicio y utilizarla como cualquier otra aplicación instalada en tu dispositivo.

> [!TIP]
> Recuerda tener conexión a Internet para utilizar la aplicación, ya que requiere una conexión activa para funcionar correctamente.

Si tienes alguna pregunta o problema con la instalación de la aplicación, por favor envía un correo electrónico a [pastoral@ps.edu.pe](mailto:pastoral@ps.edu.pe) para recibir asistencia.

## 🚀 Desplegar la aplicación

### 1. Clonar el repositorio

```bash
git clone https://github.com/jpxoi/pastoral-digital-app.git
cd pastoral-digital-app
```

### 2. Instalar las dependencias

```bash
pnpm install
```

### 3. Prerequisitos

La aplicación depende de los siguientes servicios:

- [Neon](https://neon.tech/) - Base de datos (PostgreSQL)
- [Clerk](https://clerk.com/) - Autenticación (Auth)
- [Uploadthing](https://uploadthing.com/) - Almacenamiento de archivos (Storage)
- [Yupay API](https://yupay.dev/) - Consulta de identidad (DNI)

Asegúrate de tener las credenciales de cada servicio y configurarlas en el archivo `.env`, como se especifica en el siguiente punto.

### 4. Configurar las variables de entorno

La aplicación utiliza variables de entorno para configurar su comportamiento. Estas variables se encuentran en el archivo `.env` y se pueden modificar según sea necesario. Si no tienes un archivo `.env`, puedes crearlo como el siguiente:

```env
DATABASE_URL=<your-neon-database-url>

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding

UPLOADTHING_TOKEN=<your-uploadthing-token>

YUPAY_API_KEY=<your-yupay-api-key>
```

### 5. Generar las migraciones de la base de datos

La aplicación utiliza Drizzle para la generación de las migraciones de la base de datos. Para generar las migraciones, puedes ejecutar el siguiente comando:

```bash
pnpm db:generate
pnpm db:migrate
```

### 6. Desplegar la aplicación

La aplicación se puede desplegar en cualquier servidor que tenga Node.js y npm instalado. Para desplegar la aplicación, puedes ejecutar el siguiente comando:

```bash
pnpm build
pnpm start
```

Como alternativa, puedes utilizar el servicio de [Vercel](https://vercel.com/) para desplegar la aplicación. Para desplegar la aplicación en Vercel, puedes seguir los siguientes pasos:

1. Ingresar a la consola de Vercel en [https://vercel.com/](https://vercel.com/).
2. Crear una nueva proyecto.
3. Importar el repositorio de la aplicación.
4. Desplegar la aplicación.

## 🤝 Contribuir

Las contribuciones a la aplicación son bienvenidas y pueden realizarse a través de _pull requests_ en este repositorio.

### ¿Cómo contribuir?

Si tienes alguna sugerencia que podría mejorar el proyecto, por favor haz un [_fork_](https://github.com/jpxoi/pastoral-digital-app/fork) del repositorio y crea una [_pull request_](https://github.com/jpxoi/pastoral-digital-app/pulls). También puedes simplemente abrir un [_issue_](https://github.com/jpxoi/pastoral-digital-app/issues) con la etiqueta `enhancement`.

### ¿Quiéres ser parte del equipo de desarrollo?

Si deseas ser parte del equipo de desarrollo de la aplicación, por favor envía un correo electrónico a [pastoral@ps.edu.pe](mailto:pastoral@ps.edu.pe) con el asunto "Quiero ser parte del equipo de desarrollo de la Pastoral Digital App" y cuéntanos un poco sobre ti y por qué te gustaría ser parte del equipo.

## 📜 Licencia

Pastoral Digital App © 2025 por Jean Paul Fernandez está licenciado bajo Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. Para ver una copia de esta licencia, visita [https://creativecommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/).

![CC BY-NC-SA Badge](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)

Esta licencia permite a los reutilizadores distribuir, remezclar, adaptar y desarrollar el material en cualquier medio o formato únicamente con fines no comerciales y siempre que se otorgue la atribución al creador. Si remezcla, adapta o construye sobre el material, debe licenciar el material modificado bajo términos idénticos. [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) incluye los siguientes elementos:

- **BY:** El crédito debe ser otorgado al creador.
- **NC:** Sólo se permiten usos no comerciales de la obra.
- **SA:** Las adaptaciones deben compartirse en los mismos términos.

## 📞 Contacto

Si deseas contactar con el equipo de desarrollo de la aplicación, puedes hacerlo a través de la dirección de correo electrónico [pastoral@ps.edu.pe](mailto:pastoral@ps.edu.pe) incluyendo en el asunto del mensaje "Pastoral Digital App".
