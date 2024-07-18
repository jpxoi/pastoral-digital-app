import AttendanceTableHeader from "@/components/dashboard/attendanceTableHeader";
import AttendanceTableBody from "@/components/dashboard/attendanceTableBody";
import { AttendanceProvider } from "@/app/context/attendanceContext";
import { getSession, Session } from "@auth0/nextjs-auth0";
import { UserInfoProps } from "@/types/interfaces";
import { fetchUserInfoByEmail } from "@/app/utils/fetchUtils";
import AttendanceTableRefresh from "@/components/dashboard/attendanceTableRefresh";

export default async function AttendanceTable() {
  const { user } = (await getSession()) as Session;
  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email: user.email,
  });

  return (
    <AttendanceProvider userToken={userInfo.userToken as string}>
      <div className="flex flex-row items-center justify-center lg:justify-end gap-4 mb-2 w-full">
        <AttendanceTableRefresh />
      </div>
      <div className="relative overflow-x-auto shadow-md w-full sm:max-w-screen-sm md:max-w-screen-md rounded-lg">
        <table className="text-sm text-left rtl:text-right text-gray-500 w-full">
          <AttendanceTableHeader />
          <AttendanceTableBody />
        </table>
      </div>
    </AttendanceProvider>
  );
}
