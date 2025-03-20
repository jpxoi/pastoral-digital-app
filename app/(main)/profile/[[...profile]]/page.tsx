import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => {
  return (
    <main className='container mx-auto flex items-center justify-center p-4 md:p-8'>
      <UserProfile />
    </main>
  )
}

export default UserProfilePage
