export function UserAvatarSkeleton() {
  return (
    <div
      className={`h-8 w-8 rounded-full p-0.5 ring-2 ring-blue-100 sm:h-10 sm:w-10`}
    >
      <div
        className={`h-full w-full animate-pulse rounded-full bg-blue-100`}
      ></div>
    </div>
  )
}

export function LargeUserAvatarSkeleton() {
  return (
    <div className={`h-full w-full rounded-full p-0.5 ring-2 ring-blue-200`}>
      <div
        className={`h-full w-full animate-pulse rounded-full bg-blue-200`}
      ></div>
    </div>
  )
}
