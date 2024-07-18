import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración | Pastoral Digital App',
  description:
    'Pastoral Digital es una plataforma digital para uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
