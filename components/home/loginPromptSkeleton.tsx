export default function LoginPromptSkeleton() {
  return (
    <div id="form-sekeleton" className="flex flex-col items-center mt-6 gap-4">
      <div className="animate-pulse w-64 h-6 bg-gray-200 rounded-md"></div>
      <div className="animate-pulse w-full h-[3.125rem] bg-gray-200 rounded-md"></div>
      <div className="animate-pulse w-full h-[3.125rem] bg-gray-200 rounded-md"></div>
    </div>
  );
}
