"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AttendanceContext = createContext<AttendanceContextProps>({
  data: [],
  loading: true,
  error: null,
  refreshButtonText: "Cargando",
  refreshTable: () => {},
});

export const useAttendance = () => {
  return useContext(AttendanceContext);
};

import { ReactNode } from "react";
import { AttendanceContextProps } from "../../types/interfaces";

export const AttendanceProvider = ({
  children,
  userToken,
}: {
  children: ReactNode;
  userToken: string;
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshButtonText, setRefreshButtonText] = useState("Cargando");

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ATTENDANCE_ENDPOINT as string
      );
      const data = await response.json();
      const filteredData = data.filter(
        (row: { [x: string]: string | null }) => row["Token"] === userToken
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
    fetchData();
  }, [userToken]);

  const refreshTable = () => {
    setLoading(true);
    setRefreshButtonText("Cargando");
    fetchData();
  };

  return (
    <AttendanceContext.Provider
      value={{ data, loading, error, refreshButtonText, refreshTable }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
