export default function FormSkeleton() {
  return (
    <div id="form-sekeleton" className="flex flex-col items-center mt-4">
      <div className="animate-pulse w-full h-[3.125rem] bg-gray-200 rounded-md my-1"></div>
      <div className="flex justify-end items-center w-full">
        <div className="animate-pulse w-48 h-4 bg-gray-200 rounded-md"></div>
      </div>
      <div className="animate-pulse w-full h-12 bg-gray-200 rounded-md mt-4"></div>
    </div>
  );
}
