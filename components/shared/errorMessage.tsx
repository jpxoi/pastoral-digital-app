import { ExclamationTriangle } from "../icons/icons24";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-red-100 border border-red-700 text-red-700 p-4 rounded-lg flex flex-row justify-center">
        <span className="flex items-center">
          <ExclamationTriangle />
        </span>
        <p className="inline ml-2">
          {message}
        </p>
      </div>
    </div>
  );
}
