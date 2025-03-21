import { CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function QrScannerHeader() {
  return (
    <CardHeader>
      <CardTitle>Escanear Código QR</CardTitle>
      <CardDescription>
        Escanea el código QR del carnet pastoral para registrar la asistencia
      </CardDescription>
    </CardHeader>
  )
}
