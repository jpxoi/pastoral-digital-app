import { Suspense } from "react";
import AttendanceTable from "@/components/dashboard/attendanceTable";
import AttendanceTableSkeleton from "@/components/dashboard/attendanceTableSkeleton";

export default function AttendanceSection() {
  return (
    <div className="container mx-auto flex flex-col h-auto items-center justify-center max-w-[100vw] px-4 md:px-0">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Registro de Asistencias
      </h1>
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <AttendanceTable />
      </Suspense>
      <p className="text-sm text-gray-600 mt-4 w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md">
        Las faltas no se registran en la tabla. No obstante, cualquier fecha sin
        registro válido, se considera falta.
      </p>
    </div>
  );
}
