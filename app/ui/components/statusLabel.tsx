interface StatusLabel {
    status: string;
  }
  
  export default function StatusLabel({ status }: StatusLabel) {
    const statusMapping: { [key: string]: JSX.Element } = {
      "A TIEMPO": <span className="text-green-700 bg-green-50 p-2 rounded-lg">✅ A TIEMPO</span>,
      "TARDANZA": <span className="text-yellow-700 bg-yellow-50 p-2 rounded-lg">⏰ TARDANZA</span>,
      "DOBLE TARDANZA": <span className="text-orange-700 bg-orange-50 p-2 rounded-lg">⚠️ DOBLE TARDANZA</span>,
      "FALTA JUSTIFICADA": <span className="text-blue-700 bg-blue-50 p-2 rounded-lg">🤒 FALTA JUSTIFICADA</span>,
      "TARDANZA JUSTIFICADA": <span className="text-purple-700 bg-purple-50 p-2 rounded-lg">🕰️ TARDANZA JUSTIFICADA</span>,
      "SUSPENDIDO": <span className="text-red-700 bg-red-50 p-2 rounded-lg">⛔️ SUSPENDIDO</span>,
      "ACCESO PRIORITARIO": <span className="text-green-700 bg-green-50 p-2 rounded-lg">⭐️ ACCESO PRIORITARIO</span>
    };
  
    return statusMapping[status] || <span />;
  }
  