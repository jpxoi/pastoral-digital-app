"use client";

import AttendanceTableRowSkeleton from "@/components/dashboard/attendanceTableRowSkeleton";
import AttendanceTableRow from "@/components/dashboard/attendanceTableRow";
import AttendanceErrorRow from "@/components/dashboard/attendanceErrorRow";
import { useAttendance } from "@/app/context/attendanceContext";

export default function AttendanceTableBody() {
  const { data, loading, error } = useAttendance();

  return (
    <tbody className="text-center">
      {loading ? (
        <AttendanceTableRowSkeleton rows={7} />
      ) : error ? (
        <AttendanceErrorRow message={error} />
      ) : (
        data.map((row) => (
          <AttendanceTableRow key={row["ID Asistencia"]} row={row} />
        ))
      )}
    </tbody>
  );
}
