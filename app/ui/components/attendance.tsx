import AttendanceTable from "./attendanceTable";

export default function AttendanceSection() {
  return (
    <div className="container mx-auto flex flex-col h-auto items-center justify-center">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Registro de Asistencias
      </h1>
      <AttendanceTable />
      <p className="text-sm text-gray-600 mt-4 max-w-xs sm:max-w-full">
        Las faltas no se registran en la tabla. No obstante, cualquier fecha sin
        registro válido, se considera falta.
      </p>
    </div>
  );
}
