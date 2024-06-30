import AvatarSkeleton from "../skeletons/avatarSkeleton";

export default function DarkAvatar({ avatarURL, fallbackAvatar }: { avatarURL: string | null; fallbackAvatar: string }) {
  return (
    <>
      {avatarURL ? (
        <div className={`w-full h-full p-0.5 rounded-full ring-2 ring-blue-200 `}>
          <picture className={`w-full h-full bg-blue-200 rounded-full`}>
            <source srcSet={`${avatarURL}`} type="image/webp" />
            <source srcSet={`${fallbackAvatar}`} type="image/png" />
            <img
              src={`${fallbackAvatar}`}
              alt="Avatar Profile Picture"
              className={`w-full h-full bg-blue-200 rounded-full`}
            />
          </picture>
        </div>
      ) : (
        <AvatarSkeleton bg="200" />
      )}
    </>
  );
}
