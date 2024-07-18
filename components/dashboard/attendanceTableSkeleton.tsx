import { RefreshIconMicro } from "@/components/icons/icons16";
import AttendanceTableHeader from "@/components/dashboard/attendanceTableHeader";
import RowSkeleton from "./attendanceTableRowSkeleton";

export default async function AttendanceTableSkeleton() {
  return (
    <>
      <div className="flex flex-row items-center justify-center lg:justify-end gap-4 mb-2 w-full">
        <button
          className="text-sm text-blue-500 hover:text-blue-700 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:cursor-not-allowed flex flex-row items-center gap-1"
          disabled
        >
          <span>
            <RefreshIconMicro />
          </span>
          <span>Cargando</span>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md w-full sm:max-w-screen-sm md:max-w-screen-md rounded-lg">
        <table className="text-sm text-left rtl:text-right text-gray-500 w-full">
          <AttendanceTableHeader />
          <tbody className="text-center">
            <RowSkeleton rows={7} />
          </tbody>
        </table>
      </div>
    </>
  );
}
