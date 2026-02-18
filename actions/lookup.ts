'use server'

const endpoint = 'https://api.decolecta.com'
const token = process.env.DECOLECTA_API_TOKEN!

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

  const response = await fetch(`${endpoint}/v1/reniec/dni?numero=${dni}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    return {
      success: false,
      error: 'DNI no encontrado',
    }
  }

  const data = (await response.json()) as {
    first_name: string
    first_last_name: string
    second_last_name: string
    full_name: string
    document_number: string
  }

  const firstName = toTitleCase(data.first_name)
  const firstLastName = toTitleCase(data.first_last_name)
  const secondLastName = toTitleCase(data.second_last_name)
  const fullName = toTitleCase(data.full_name)
  const lastName = [firstLastName, secondLastName].filter(Boolean).join(' ')

  return {
    success: true,
    data: {
      firstName,
      lastName,
      firstLastName,
      secondLastName,
      fullName,
      documentNumber: data.document_number,
    },
  }
}
