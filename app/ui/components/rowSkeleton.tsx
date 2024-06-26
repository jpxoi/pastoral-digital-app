export default function RowSkeleton({ rows }: { rows: number }) {
    return (
        <>
            {Array.from({ length: rows }, (_, i) => (
                <tr key={i} className="text-left odd:bg-white even:bg-gray-50 hover:bg-blue-50 border-b">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div className="animate-pulse bg-gray-300 h-5 w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="animate-pulse bg-gray-300 h-5 w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="animate-pulse bg-gray-300 h-5 w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="animate-pulse bg-gray-300 h-5 w-20"></div>
                    </td>
                </tr>
            ))}
        </>
    );
}