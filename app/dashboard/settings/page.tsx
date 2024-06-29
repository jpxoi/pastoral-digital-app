import ChangeProfilePic from "@/app/ui/components/changeProfilePic";

export default function SettingsPage() {
  return (
    <main className="flex w-full flex-col justify-center lg:flex-row items-center lg:items-start lg:justify-evenly min-h-[80vh] lg:max-h-[80vh] px-4 xl:px-0 mt-4 lg:mt-8 mb-8">
      <ChangeProfilePic />
    </main>
  );
}
