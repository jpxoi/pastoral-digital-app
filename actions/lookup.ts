'use server'

const endpoint = 'https://api.json.pe/api/dni'
const token = process.env.JSONPE_API_KEY

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

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dni }),
      cache: 'no-store',
    })

    if (!response.ok) {
      return { success: false, error: 'No se pudo validar el DNI.' }
    }

    const responseBody = (await response.json()) as {
      success?: boolean
      data?: {
        dni?: string
        nombres?: string
        apellidoPaterno?: string
        apellidoMaterno?: string
        nombreCompleto?: string
      }
    }
    const data = responseBody.data

    if (
      responseBody.success === false ||
      !data?.nombres?.trim() ||
      !data.apellidoPaterno?.trim() ||
      (data.dni && data.dni !== dni)
    ) {
      return {
        success: false,
        error: 'No encontramos datos suficientes para validar el DNI.',
      }
    }

    const firstName = toTitleCase(data.nombres)
    const firstLastName = toTitleCase(data.apellidoPaterno)
    const secondLastName = toTitleCase(data.apellidoMaterno ?? '')
    const fullName = toTitleCase(data.nombreCompleto ?? '')
    const lastName = [firstLastName, secondLastName].filter(Boolean).join(' ')

    return {
      success: true,
      data: {
        firstName,
        lastName,
        firstLastName,
        secondLastName,
        fullName,
        documentNumber: data.dni ?? dni,
      },
    }
  } catch {
    return {
      success: false,
      error:
        'No se pudo consultar el DNI. Puedes ingresar tus datos manualmente.',
    }
  }
}
