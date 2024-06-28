export default function Footer() {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <p className="text-sm">
        Desarrollado con ❤️ por{" "}
        <a
          className="font-semibold text-blue-900 hover:text-blue-600 transition-colors duration-300"
          href="https://jpxoi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jean Paul Fernandez
        </a>
        .
      </p>
    </div>
  );
}
