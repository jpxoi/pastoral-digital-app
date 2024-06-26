export default function TableHeader() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr className="text-left rtl:text-right bg-gray-200">
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          Fecha
        </th>
        <th scope="col" className="px-6 py-3">
          Hora
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
      </tr>
    </thead>
  );
}
