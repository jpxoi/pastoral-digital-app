import Image from 'next/image'
import { getSession, Session } from '@auth0/nextjs-auth0'
import { UserInfoProps } from '@/types/interfaces'
import { fetchUserInfoByEmail } from '@/app/utils/fetchUtils'
import PastoralIDDownloader from '@/components/dashboard/pastoralIDDownloader'

export default async function PastoralID() {
  const { user } = (await getSession()) as Session
  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email: user.email,
  })

  return (
    <div className='pass-front group m-0 h-auto min-w-80 rounded-lg p-0 transition-all duration-300 sm:min-w-96 sm:max-w-sm'>
      <div className='group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white drop-shadow-md transition-all duration-300 hover:drop-shadow-2xl'>
        <Image
          id='pastoral_id_img'
          className='m-0 mx-auto h-auto w-full max-w-xs rounded-lg p-0 sm:max-w-sm'
          src={`${process.env.CDN_URL}/media/pastoralid/${userInfo.userID}.png`}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1UwAJDgOebYQBlwAAAABJRU5ErkJggg=='
          alt='Pastoral ID'
          width='450'
          height='575'
        />
        <div className='z-5 absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine' />
        <PastoralIDDownloader
          url={`${process.env.CDN_URL}/media/pastoralid/${userInfo.userID}.png`}
        />
      </div>
    </div>
  )
}
