export default function SuccessMessage({
  message,
  subtitle,
}: {
  message: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-green-100 border border-green-700 text-green-700 p-4 rounded-lg flex flex-col justify-center">
        <p className="inline">{message}</p>
        {subtitle ? (
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
