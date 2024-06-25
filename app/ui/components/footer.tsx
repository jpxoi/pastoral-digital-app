export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center my-2">
      <p id="developer">
        Desarrollado por{" "}
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
    </footer>
  );
}
