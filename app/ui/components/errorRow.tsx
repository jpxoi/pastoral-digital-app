import { ExclamationTriangle } from "../icons/icons24";

export default function ErrorRow({ message }: { message: string }) {
  return (
    <tr>
      <td colSpan={5} className="p-3">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex flex-row justify-center">
          <span className="flex items-center">
            <ExclamationTriangle />
          </span>
          <p className="inline ml-2">{message}</p>
        </div>
      </td>
    </tr>
  );
}
