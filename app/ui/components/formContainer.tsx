import Footer from "./footer";
import Form from "./form";
import LogoImage from "./logoImage";

export default function FormContainer() {
  return (
    <div
      id="form_container"
      className="flex flex-col justify-between w-screen h-dvh sm:h-auto sm:rounded-xl sm:shadow-md sm:max-w-sm bg-white mx-auto sm:bg-white"
    >
      <div className="sm:rounded-t-xl w-full h-full bg-[url(/graphics/bg-wave.svg)] bg-cover sm:bg-center">
        <h1 className="text-4xl text-white font-bold text-center leading-normal p-8 py-12 sm:py-8 select-none">
          Bienvenido a
          <br />
          Pastoral
          <br />
          Digital
        </h1>
      </div>
      <div className="p-8 pt-0">
        <LogoImage />
        <h2 className="text-2xl font-bold text-center mt-4 mb-1">
          Iniciar Sesión
        </h2>
        <p className="text-center">Introduce tu correo para continuar</p>
        <Form dataEndpoint={process.env.DATA_ENDPOINT as string} />
      </div>
      <div className="block sm:hidden mb-8">
        <Footer />
      </div>
    </div>
  );
}
