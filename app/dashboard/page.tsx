import PastoralID from "../ui/components/pastoralID";
import AttendanceSection from "../ui/components/attendance";
import WarningSuspended from "../ui/components/warningSuspended";
import Notification from "../ui/components/notification";

export default function PastoralDigitalPage() {
  return (
    <>
      <main className="flex w-full flex-col justify-start gap-4 min-h-[78vh] lg:max-h-[80vh] px-4 xl:px-0 mt-4 lg:mt-8 mb-8">
        <WarningSuspended />
        <Notification />
        <div className="flex w-full flex-col justify-center lg:flex-row items-center lg:items-start lg:justify-evenly">
          <div className="flex flex-col items-center justify-start gap-4">
            <PastoralID />
          </div>
          <div className="flex flex-col items-center justify-start gap-4 mt-8 lg:mt-0 lg:ml-4 xl:ml-0 lg:max-h-[80vh]">
            <AttendanceSection />
          </div>
        </div>
      </main>
    </>
  );
}
