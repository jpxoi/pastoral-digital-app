import Loading from '@/app/loading'
import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </>
  )
}
