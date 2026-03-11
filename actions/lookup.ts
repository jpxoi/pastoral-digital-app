'use server'

const endpoint = 'https://api.yupay.dev'
const token = process.env.YUPAY_API_KEY!

function toTitleCase(str: string): string {
  if (!str) return str
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function lookupDni(dni: string) {
  if (dni.length !== 8 || !/^[0-9]+$/.test(dni)) {
    return {
      success: false,
      error: 'DNI inválido',
    }
  }

  if (!token) {
    return {
      success: false,
      error: 'Token de API no configurado',
    }
  }

  const response = await fetch(
    `${endpoint}/v1/dni/${encodeURIComponent(dni)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    return {
      success: false,
      error: 'DNI no encontrado',
    }
  }

  const data = (await response.json()) as {
    dni: string
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    nombreCompleto: string
  }

  const firstName = toTitleCase(data.nombres)
  const firstLastName = toTitleCase(data.apellidoPaterno)
  const secondLastName = toTitleCase(data.apellidoMaterno)
  const fullName = toTitleCase(data.nombreCompleto)
  const lastName = [firstLastName, secondLastName].filter(Boolean).join(' ')

  return {
    success: true,
    data: {
      firstName,
      lastName,
      firstLastName,
      secondLastName,
      fullName,
      documentNumber: data.dni,
    },
  }
}
