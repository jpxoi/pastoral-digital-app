import LogoImage from "./logoImage";
import SignOutButton from "./signOutButton";

export default function appHeader() {
  return (
    <header className="flex justify-between items-center px-2 py-1 sm:px-4 sm:py-2 bg-white shadow-md transition-all duration-300 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <LogoImage width={38.4} height={48} />
          <h1 className="text-xl sm:text-2xl font-bold">Pastoral Digital</h1>
        </div>
        <SignOutButton />
      </header>
  );
}