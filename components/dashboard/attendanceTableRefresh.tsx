// components/RefreshButton.tsx
"use client";

import { RefreshIconMicro } from "@/components/icons/icons16";
import { useAttendance } from "@/app/context/attendanceContext";

export default function AttendanceTableRefresh() {
  const { loading, refreshTable, refreshButtonText } = useAttendance();

  return (
    <button
      onClick={refreshTable}
      className="text-sm text-blue-500 hover:text-blue-700 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:cursor-not-allowed flex flex-row items-center gap-1"
      disabled={loading}
    >
      <span>
        <RefreshIconMicro />
      </span>
      <span>{refreshButtonText}</span>
    </button>
  );
}
