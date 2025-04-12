import Loading from '@/app/(auth)/loading'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='overflow-y-scroll rounded-xl'>
      <SignUp fallback={<Loading />} />
    </div>
  )
}
