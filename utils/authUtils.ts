export async function recoverPassword({
  email,
}: {
  email: string
}): Promise<boolean> {
  try {
    const res = await fetch(
      `https://jpxoi.us.auth0.com/dbconnections/change_password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: 'BxVmRmouE9EYcOlBQtBEriRKE8da4u5V',
          email: email,
          connection: 'Username-Password-Authentication',
        }),
      }
    )

    if (res.ok) {
      return true
    } else {
      const data = await res.json()
      throw new Error(data.error)
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
