"use client";

import { useEffect, useState } from "react";
import RowSkeleton from "../skeletons/rowSkeleton";
import TableHeader from "./tableHeader";
import { useRouter } from "next/navigation";
import TableRow from "./tableRow";
import ErrorRow from "./errorRow";
import { RefreshIconMicro } from "../icons/icons16";
import { getLocalStorageItem } from "@/app/utils/localStorageUtils";

export default function AttendanceTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshButtonText, setRefreshButtonText] = useState("Cargando");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ATTENDANCE_ENDPOINT as string
      );
      const data = await response.json();
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
      setRefreshButtonText("Actualizar Registros");
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setRefreshButtonText("Actualizar Registros");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getLocalStorageItem("token")) {
      router.push("/");
      return;
    }
    fetchData();
  }, [router]);

  const refreshTable = () => {
    setLoading(true);
    setRefreshButtonText("Cargando");
    fetchData();
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center lg:justify-end gap-4 mb-2 w-full sm:max-w-screen-sm md:max-w-screen-md">
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
      </div>
      <div className="relative overflow-x-auto shadow-md w-full sm:max-w-screen-sm md:max-w-screen-md rounded-md">
        <table className="text-sm text-left rtl:text-right text-gray-500 w-full">
          <TableHeader />
          <tbody className="text-center">
            {loading ? (
              <RowSkeleton rows={7} />
            ) : error ? (
              <ErrorRow message={error} />
            ) : (
              data.map((row) => (
                <TableRow key={row["ID Asistencia"]} row={row} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
