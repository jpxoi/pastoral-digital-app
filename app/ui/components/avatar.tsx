import AvatarSkeleton from "../skeletons/avatarSkeleton";

export default function Avatar({ avatarURL, fallbackAvatar, bg }: { avatarURL: string | null; fallbackAvatar: string; bg : string }) {
  return (
    <>
      {avatarURL ? (
        <div className={`w-full h-full p-0.5 rounded-full ring-2 ring-blue-100 ring-blue-${bg}`}>
          <picture className={`w-full h-full bg-blue-100 bg-blue-${bg} rounded-full`}>
            <source srcSet={`${avatarURL}`} type="image/webp" />
            <source srcSet={`${fallbackAvatar}`} type="image/png" />
            <img
              src={`${fallbackAvatar}`}
              alt="Avatar Profile Picture"
              className={`w-full h-full bg-blue-100 bg-blue-${bg} rounded-full`}
            />
          </picture>
        </div>
      ) : (
        <AvatarSkeleton bg={bg} />
      )}
    </>
  );
}
