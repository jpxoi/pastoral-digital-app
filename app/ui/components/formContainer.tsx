import Form from "./form";
import LogoImage from "./logoImage";

export default function FormContainer() {
  return (
    <div
      id="form_container"
      className="max-w-xs sm:max-w-sm bg-white shadow-md mx-auto my-2 p-8 rounded-xl transition-all duration-300"
    >
      <LogoImage />
      <h1 className="text-2xl font-bold text-center mt-4 mb-4">
        Pastoral Digital
      </h1>
      <p className="text-center mt-4t">
        Inicia sesión para acceder a los servicios digitales de la Pastoral.
      </p>
      <Form dataEndpoint={process.env.DATA_ENDPOINT as string} />
    </div>
  );
}
