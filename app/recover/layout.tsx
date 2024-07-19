import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activar Cuenta | Pastoral Digital App',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
