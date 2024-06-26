import PastoralID from "../ui/components/pastoralID";
import PastoralButtons from "../ui/components/pastoralButtons";
import AttendanceSection from "../ui/components/attendance";
import LogoImage from "../ui/components/logoImage";
import WarningSuspended from "../ui/components/warningSuspended";
import Footer from "../ui/components/footer";

export default function PastoralDigitalPage() {
  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center p-2 sm:p-4 bg-white shadow-md transition-all duration-300">
        <div className="flex items-center gap-2 ml-4">
          <LogoImage width={32} height={32} />
          <h1 className="text-xl sm:text-2xl font-bold">Pastoral Digital</h1>
        </div>
        <PastoralButtons />
      </nav>
      <WarningSuspended />
      <main className="flex w-full flex-col justify-center lg:flex-row items-center lg:items-start lg:justify-evenly lg:min-h-[80vh] lg:max-h-[80vh] px-4 xl:px-0 mt-4 lg:mt-8 mb-8">
        <div className="flex flex-col items-center justify-start gap-4">
          <PastoralID />
        </div>
        <div className="flex flex-col items-center justify-start gap-4 mt-8 lg:mt-0 lg:ml-4 xl:ml-0 lg:max-h-[80vh] overflow-scroll">
          <AttendanceSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
