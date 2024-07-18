import AttendanceSection from "@/components/dashboard/attendanceSection";
import Notification from "@/components/shared/notification";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Suspense } from "react";
import PastoralIDSkeleton from "@/components/dashboard/pastoralIDSkeleton";
import OfflineAlert from "@/components/shared/offlineAlert";
import PastoralID from "@/components/dashboard/pastoralID";

export default withPageAuthRequired(
  async function PastoralDigitalPage() {
    return (
      <>
        <main className="flex w-full flex-col justify-start gap-4 min-h-[78vh] lg:max-h-[80vh] px-4 xl:px-0 mt-4 lg:mt-8 mb-8">
          <OfflineAlert />
          <Notification />
          <div className="flex w-full flex-col justify-center lg:flex-row items-center lg:items-start lg:justify-evenly">
            <div className="flex flex-col items-center justify-start gap-4">
              <Suspense fallback={<PastoralIDSkeleton />}>
                <PastoralID />
              </Suspense>
            </div>
            <div className="flex flex-col items-center justify-start gap-4 mt-8 lg:mt-0 lg:ml-4 xl:ml-0 lg:max-h-[80vh]">
              <AttendanceSection />
            </div>
          </div>
        </main>
      </>
    );
  },
  { returnTo: "/dashboard" }
);
