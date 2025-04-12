import Loading from '@/app/(auth)/loading'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn fallback={<Loading />} />
}
