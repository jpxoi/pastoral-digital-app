"use client";

import { useEffect, useState } from "react";
import RowSkeleton from "./rowSkeleton";
import TableHeader from "./tableHeader";
import { useRouter } from "next/navigation";
import TableRow from "./tableRow";
import ErrorRow from "./errorRow";

export default function AttendanceTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }

    fetch(process.env.NEXT_PUBLIC_ATTENDANCE_ENDPOINT as string)
      .then((res) => res.json())
      .then((data) => {
        const token = localStorage.getItem("token");
        const filteredData = data.filter(
          (row: { [x: string]: string | null }) => row["Token"] === token
        );
        const sortedData = filteredData.sort(
          (a: { [x: string]: string }, b: { [x: string]: string }) =>
            new Date(a["Fecha"]).getTime() - new Date(b["Fecha"]).getTime()
        );
        if (sortedData.length === 0) {
          throw new Error("No se encontraron registros de asistencia.");
        }
        setData(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  return (
    <div className="relative overflow-x-auto shadow-md w-full max-w-xs sm:max-w-screen-sm md:max-w-screen-md rounded-md">
      <table className="text-sm text-left rtl:text-right text-gray-500 w-full">
        <TableHeader />
        <tbody className="text-center">
          {loading ? (
            <RowSkeleton rows={7} />
          ) : error ? (
            <ErrorRow message={error} />
          ) : (
            data.map((row) => <TableRow key={row["ID Asistencia"]} row={row} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
