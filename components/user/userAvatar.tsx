import {
  UserAvatarSkeleton,
  LargeUserAvatarSkeleton,
} from '@/components/user/userAvatarSkeleton'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client';



export function UserAvatar() {
  const { user, error, isLoading } = useUser();
  return (
    <>
      {!isLoading ? (
        <div
          className={`h-full w-full rounded-full p-0.5 ring-2 ring-blue-100`}
        >
          <Image
            src={user?.picture as string}
            className={`h-full w-full rounded-full bg-blue-100`}
            width={100}
            height={100}
            alt='Avatar'
          />
        </div>
      ) : (
        <UserAvatarSkeleton />
      )}
    </>
  )
}

export function DarkUserAvatar() {
  const { user, error, isLoading } = useUser();
  return (
    <>
      {!isLoading ? (
        <div
          className={`h-full w-full rounded-full`}
        >
          <Image
            src={user?.picture as string}
            className={`h-full w-full rounded-full bg-blue-200`}
            width={100}
            height={100}
            alt='Avatar'
          />
        </div>
      ) : (
        <LargeUserAvatarSkeleton />
      )}
    </>
  )
}
