export default function LogoImage({ width = 100, height = 100 }) {
  return (
    <picture className="flex justify-center">
      <source srcSet="/pastoral_logo.avif" type="image/avif" />
      <source srcSet="/pastoral_logo.webp" type="image/webp" />
      <img
        src="/pastoral_logo.webp"
        alt="Pastoral Logo"
        className="logo"
        width={width}
        height={height}
      />
    </picture>
  );
}
