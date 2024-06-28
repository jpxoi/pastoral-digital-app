export default function AvatarSkeleton() {
  return (
    <div className="w-8 h-8 sm:w-10 sm:h-10 p-0.5 rounded-full ring-2 ring-blue-100">
      <div className="w-full h-full bg-blue-100 animate-pulse rounded-full"></div>
    </div>
  );
}
