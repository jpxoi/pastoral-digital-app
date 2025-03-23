import Loading from '@/app/loading'
import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
      <ClerkLoaded>
        <div className='overflow-y-scroll rounded-xl'>
          <SignUp />
        </div>
      </ClerkLoaded>
    </>
  )
}
