import StatusLabel from "./statusLabel";

// components/TableRow.tsx
interface TableRow {
    row: {
      [key: string]: string;
    };
  }
  
  export default function TableRow({ row }: TableRow) {
    return (
      <tr className="text-left odd:bg-white even:bg-gray-50 hover:bg-blue-50 border-b">
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 text-nowrap">
          {row["ID Asistencia"]}
        </td>
        <td className="px-6 py-4 text-nowrap">
          {new Date(row["Fecha"]).toLocaleDateString("es-PE", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </td>
        <td className="px-6 py-4 text-nowrap">
          {new Date(row["Hora"]).toLocaleTimeString("es-PE", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </td>
        <td className="px-6 py-4 font-medium text-nowrap cursor-default">
          <StatusLabel status={row["Status"]} />
        </td>
      </tr>
    );
  }
  