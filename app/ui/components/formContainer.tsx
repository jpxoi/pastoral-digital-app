import Form from "./form";

export default function FormContainer() {
  return (
    <div
      id="form_container"
      className="max-w-xs sm:max-w-sm bg-white shadow-md mx-auto my-2 p-8 rounded-xl"
    >
      <picture className="flex justify-center">
        <source srcSet="/pastoral_logo.avif" type="image/avif" />
        <source srcSet="/pastoral_logo.webp" type="image/webp" />
        <img
          src="/pastoral_logo.webp"
          alt="Pastoral Logo"
          className="logo"
          width="100rem"
        />
      </picture>
      <h1 className="text-2xl font-bold text-center mt-4 mb-4">
        Pastoral Digital ID
      </h1>
      <p className="text-center mt-4t">
        Para generar tu <b>Pastoral Digital ID</b> debes introducir el correo
        electrónico que usaste cuando te registraste.
      </p>
      <Form dataEndpoint={process.env.DATA_ENDPOINT as string} />
    </div>
  );
}
