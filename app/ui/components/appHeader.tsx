import UserAvatar from "./userAvatar";

export default function appHeader() {
  return (
    <header className="flex justify-center items-center px-4 py-4 bg-[#07309B] shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center w-screen max-w-screen-xl">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Pastoral Digital
          </h1>
        </div>
        <UserAvatar />
      </nav>
    </header>
  );
}
