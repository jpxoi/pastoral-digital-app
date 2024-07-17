import Spinner from "@/app/ui/skeletons/spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Spinner />
    </div>
  );
}
