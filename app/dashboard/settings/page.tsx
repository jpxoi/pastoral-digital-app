import AccountSettings from '@/components/settings/accountSettings'
import Notification from '@/components/shared/notification'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default withPageAuthRequired(
  async function SettingsPage() {
    return (
      <main className='mb-8 mt-4 flex min-h-[78vh] w-full flex-col items-center justify-center px-4 lg:mt-8 lg:flex-row lg:items-start lg:justify-evenly xl:px-0'>
        <Notification />
        <AccountSettings />
      </main>
    )
  },
  { returnTo: '/dashboard/settings' }
)
