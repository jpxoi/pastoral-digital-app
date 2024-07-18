import AccountSettings from "@/components/settings/accountSettings";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function SettingsPage() {

    return (
      <main className="flex w-full flex-col justify-center lg:flex-row items-center lg:items-start lg:justify-evenly min-h-[78vh] lg:max-h-[80vh] px-4 xl:px-0 mt-4 lg:mt-8 mb-8">
        <AccountSettings />
      </main>
    );
  },
  { returnTo: "/dashboard/settings" }
);
