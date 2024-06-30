import Link from "next/link";
import { ReturnIcon } from "../ui/icons/icons16";

export default function BirthdayPage() {
  return (
    <main className="flex w-full flex-col justify-center items-center gap-2 h-screen max-h-screen px-4 xl:px-0">
      <Link href="/dashboard" className="flex items-center justify-start text-sm gap-1 text-blue-600 hover:text-blue-800 cursor-pointer self-center w-[85vw] lg:w-[60vw]">
        <ReturnIcon /> Regresar
      </Link>
    </main>
  );
}
