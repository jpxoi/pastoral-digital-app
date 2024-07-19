import { UserInfoProps } from '../../types/interfaces'

export async function fetchUserInfoByEmailFromACR({
  email,
}: {
  email: string
}): Promise<UserInfoProps> {
  console.log(email)
  const res = await fetch(`${process.env.USERS_ENDPOINT}`)
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

export async function fetchUserInfoByEmaildFromAirtable({
  email,
}: {
  email: string
}): Promise<UserInfoProps> {
  const res = await fetch(
    `${process.env.AIRTABLE_API_URL}?filterByFormula=%7BEmail%7D+%3D+%22${email}%22`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    }
  )
  const data = await res.json()
  const userData = data.records[0].fields
  if (userData.length === 0) {
    throw new Error('No se encontró tu información de usuario.')
  }

  const userInfo: UserInfoProps = {
    avatarURL: userData['Custom Avatar']
      ? `${process.env.CDN_URL}/media/pastoral/profile/${userData.ID}.webp`
      : userData['Foto de Perfil'],
    fallbackAvatar: userData['Custom Avatar']
      ? `${process.env.CDN_URL}/media/pastoral/profile/${userData.ID}.png`
      : userData['Foto de Perfil'],
    userID: userData.ID,
    userToken: userData.Token,
    userCustomAvatar: userData['Custom Avatar'],
  }

  console.log('Loaded user info from Airtable for', email)
  return userInfo
}

export async function fetchUserInfoByEmailFromNotion({
  email,
}: {
  email: string
}): Promise<UserInfoProps> {
  const query =
    'filter_properties=%3Bn%3Bc&filter_properties=%3E%3A%5BA&filter_properties=Ax_K&filter_properties=RzG%5C&filter_properties=title'
  const filter = JSON.stringify({
    filter: {
      property: 'Email',
      rich_text: {
        equals: email,
      },
    },
  })

  const res = await fetch(
    `${process.env.NOTION_API_URL}/databases/${process.env.NOTION_DATABASE_ID}/query?${query}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: filter,
    }
  ).catch((error) => {
    console.error('Error:', error)
    throw new Error('No se pudo obtener tu información de usuario.')
  })

  const data = await res.json()

  if (data.length === 0) {
    throw new Error('No se encontró tu información de usuario.')
  }

  const userData = data.results[0].properties

  if (userData.length === 0) {
    throw new Error('No se encontró tu información de usuario.')
  }

  const userToken = userData['Token'].rich_text[0].plain_text
  const userCustomAvatar = userData['Custom Avatar'].checkbox
  const userProfilePicture = userData['Profile Picture'].formula.string
  const userID = userData['ID'].title[0].plain_text

  const userInfo: UserInfoProps = {
    avatarURL: userCustomAvatar
      ? `${process.env.CDN_URL}/media/pastoral/profile/${userID}.webp`
      : userProfilePicture,
    fallbackAvatar: userCustomAvatar
      ? `${process.env.CDN_URL}/media/pastoral/profile/${userID}.png`
      : userProfilePicture,
    userID: userID,
    userToken: userToken,
    userCustomAvatar: userCustomAvatar,
  }

  console.log('Loaded user info from Notion for', email)
  return userInfo
}


export async function fetchUserInfoByEmail({
  email,
}: {
  email: string
}): Promise<UserInfoProps> {
  const query =
    `email=eq.${email}&select=*`

  const res = await fetch(
    `${process.env.SUPABASE_REST_API_URL}/catequistas?${query}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "apiKey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
    }
  ).catch((error) => {
    console.error('Error:', error)
    throw new Error('No se pudo obtener tu información de usuario.')
  })

  const data = await res.json()

  if (data.length === 0) {
    throw new Error('No se encontró tu información de usuario.')
  }

  const userData = data[0]

  const userToken : string = userData.token
  const userCustomAvatar = userData.custom_avatar
  const userProfilePicture = userData.profile_picture as string
  const userID = userData.id

  const userInfo: UserInfoProps = {
    avatarURL: userCustomAvatar
      ? `${process.env.CDN_URL}/media/pastoral/profile/${userID}.webp`
      : userProfilePicture,
    fallbackAvatar: userCustomAvatar
      ? `${process.env.CDN_URL}/media/pastoral/profile/${userID}.png`
      : userProfilePicture,
    userID: userID,
    userToken: userToken,
    userCustomAvatar: userCustomAvatar,
  }

  console.log('Loaded user info from Supabase for', email)
  return userInfo
}