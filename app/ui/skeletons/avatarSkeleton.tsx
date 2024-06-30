export default function AvatarSkeleton({ bg }: { bg: string }) {
  return (
    <div className={`w-8 h-8 sm:w-10 sm:h-10 p-0.5 rounded-full ring-2 ring-blue-100 ring-blue-${bg}`}>
      <div className={`w-full h-full bg-blue-100 bg-blue-${bg} animate-pulse rounded-full`}></div>
    </div>
  );
}

export function BigAvatarSkeleton() {
  return (
    <div className={`w-full h-full p-0.5 rounded-full ring-2 ring-blue-200`}>
      <div className={`w-full h-full bg-blue-200 animate-pulse rounded-full`}></div>
    </div>
  );
}