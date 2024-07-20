import { useUserMenu } from '@/app/context/userMenuContext'
import {
  UserAvatarSkeleton,
  LargeUserAvatarSkeleton,
} from '@/components/user/userAvatarSkeleton'

export function UserAvatar() {
  const { userInfo } = useUserMenu()
  return (
    <>
      {userInfo ? (
        <div
          className={`h-full w-full rounded-full p-0.5 ring-2 ring-blue-100`}
        >
          <picture className={`h-full w-full rounded-full bg-blue-100`}>
            <source srcSet={`${userInfo.avatarURL}`} type='image/webp' />
            <source srcSet={`${userInfo.fallbackAvatar}`} type='image/png' />
            <img
              src={`${userInfo.fallbackAvatar}`}
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

export function DarkUserAvatar() {
  const { userInfo } = useUserMenu()
  return (
    <>
      {userInfo ? (
        <div
          className={`h-full w-full rounded-full p-0.5 ring-2 ring-blue-200`}
        >
          <picture className={`h-full w-full rounded-full bg-blue-200`}>
            <source srcSet={`${userInfo.avatarURL}`} type='image/webp' />
            <source srcSet={`${userInfo.fallbackAvatar}`} type='image/png' />
            <img
              src={`${userInfo.fallbackAvatar}`}
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
