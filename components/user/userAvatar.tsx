import {
  UserAvatarSkeleton,
  LargeUserAvatarSkeleton,
} from '@/components/user/userAvatarSkeleton'

export function UserAvatar({
  avatarURL,
  fallbackAvatar,
}: {
  avatarURL: string | null
  fallbackAvatar: string
}) {
  return (
    <>
      {avatarURL ? (
        <div
          className={`h-full w-full rounded-full p-0.5 ring-2 ring-blue-100`}
        >
          <picture className={`h-full w-full rounded-full bg-blue-100`}>
            <source srcSet={`${avatarURL}`} type='image/webp' />
            <source srcSet={`${fallbackAvatar}`} type='image/png' />
            <img
              src={`${fallbackAvatar}`}
              alt='Avatar Profile Picture'
              className={`h-full w-full rounded-full bg-blue-100`}
            />
          </picture>
        </div>
      ) : (
        <UserAvatarSkeleton />
      )}
    </>
  )
}

export function DarkUserAvatar({
  avatarURL,
  fallbackAvatar,
}: {
  avatarURL: string | null
  fallbackAvatar: string
}) {
  return (
    <>
      {avatarURL ? (
        <div
          className={`h-full w-full rounded-full p-0.5 ring-2 ring-blue-200`}
        >
          <picture className={`h-full w-full rounded-full bg-blue-200`}>
            <source srcSet={`${avatarURL}`} type='image/webp' />
            <source srcSet={`${fallbackAvatar}`} type='image/png' />
            <img
              src={`${fallbackAvatar}`}
              alt='Avatar Profile Picture'
              className={`h-full w-full rounded-full bg-blue-200`}
            />
          </picture>
        </div>
      ) : (
        <LargeUserAvatarSkeleton />
      )}
    </>
  )
}
