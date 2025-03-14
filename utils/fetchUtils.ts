import { UserInfoProps } from '@/types/interfaces'

export async function fetchUserInfoByEmailFromACR({
  email,
}: {
  email: string
}): Promise<UserInfoProps> {
  console.log(email)
  const res = await fetch(`${process.env.USERS_ENDPOINT}`, {
    cache: 'force-cache',
  })
  const data = await res.json()
  const userData = data.filter(
    (row: { [x: string]: string }) => row['Email'] === email
  )

  if (userData.length === 0) {
    throw new Error('No se encontró tu información de usuario.')
  }

  const userInfo: UserInfoProps = {
    avatarURL: userData[0]['Custom Avatar']
      ? `${process.env.CDN_URL}/media/pastoral/profile/${userData[0].ID}.webp`
      : userData[0]['Foto de Perfil'],
    fallbackAvatar: userData[0]['Custom Avatar']
      ? `${process.env.CDN_URL}/media/pastoral/profile/${userData[0].ID}.png`
      : userData[0]['Foto de Perfil'],
    userID: userData[0]['ID'],
    userToken: userData[0]['Token'],
    userCustomAvatar: userData[0]['Custom Avatar'],
  }

  console.log('Loaded user info from ACR_DBS (Google Sheets) for', email)
  return userInfo
}

