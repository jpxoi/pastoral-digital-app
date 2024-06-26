import PastoralID from "../ui/components/pastoralID";
import PastoralButtons from "../ui/components/pastoralButtons";
import AttendanceSection from "../ui/components/attendance";

export default function PastoralDigitalPage() {
  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center p-2 sm:p-4 bg-white shadow-md transition-all duration-300">
        <h1 className="text-xl sm:text-2xl font-bold px-4">Pastoral Digital</h1>
        <PastoralButtons />
      </nav>
      <main className="flex w-full flex-col justify-center lg:flex-row items-center lg:justify-evenly px-4 xl:px-0 mt-4 lg:mt-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <PastoralID />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mt-8 lg:mt-0 lg:ml-4 xl:ml-0">
          <AttendanceSection />
        </div>
      </main>
    </div>
    
  );
}
