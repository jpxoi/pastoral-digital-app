export default function LogoImage({ width = 80, height = 100 }) {
  return (
    <picture className="flex justify-center">
      <source srcSet="/images/pastoral_logo.avif" type="image/avif" />
      <source srcSet="/images/pastoral_logo.webp" type="image/webp" />
      <img
        src="/pastoral_logo.webp"
        alt="Pastoral Logo"
        width={width}
        height={height}
      />
    </picture>
  );
}
