export default function Footer() {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <p className="text-sm text-gray-600 px-4 mt-4 w-full max-w-full sm:max-w-screen-sm text-balance">
        <a
          property="dct:title"
          className="font-medium text-blue-900 hover:text-blue-600 transition-colors duration-300"
          rel="cc:attributionURL"
          href="https://pastoralid.jpxoi.com"
        >
          Pastoral Digital App
        </a>{" "}
        &copy; 2024 por{" "}
        <a
          rel="cc:attributionURL dct:creator"
          className="font-medium text-blue-900 hover:text-blue-600 transition-colors duration-300"
          property="cc:attributionName"
          href="https://jpxoi.com"
        >
          Jean Paul Fernandez
        </a>{" "}
        está licenciado bajo{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es"
          className="font-medium text-blue-900 hover:text-blue-600 transition-colors duration-300"
          target="_blank"
          rel="license noopener noreferrer"
        >
          CC BY-NC-SA 4.0
        </a>
        .
      </p>
    </div>
  );
}

export function FooterLarge() {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <p className="text-sm text-gray-600 px-4 mt-4 w-full max-w-full text-balance">
        <a
          property="dct:title"
          className="font-medium text-blue-900 hover:text-blue-600 transition-colors duration-300"
          rel="cc:attributionURL"
          href="https://pastoralid.jpxoi.com"
        >
          Pastoral Digital App
        </a>{" "}
        &copy; 2024 por{" "}
        <a
          rel="cc:attributionURL dct:creator"
          className="font-medium text-blue-900 hover:text-blue-600 transition-colors duration-300"
          property="cc:attributionName"
          href="https://jpxoi.com"
        >
          Jean Paul Fernandez
        </a>{" "}
        está licenciado bajo{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es"
          className="font-medium text-blue-900 hover:text-blue-600 transition-colors duration-300"
          target="_blank"
          rel="license noopener noreferrer"
        >
          CC BY-NC-SA 4.0
        </a>
        .
      </p>
    </div>
  );
}
