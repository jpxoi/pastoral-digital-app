export default function AvatarSkeleton() {
  return (
    <div className="w-8 h-8 sm:w-10 sm:h-10 p-0.5 rounded-full ring-2 ring-blue-300">
      <div className="w-full h-full bg-blue-300 animate-pulse rounded-full"></div>
    </div>
  );
}
