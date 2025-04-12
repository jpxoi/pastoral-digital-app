import Background from '@/components/shared/background'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-center p-4 max-sm:pb-8'>
      <Background />
      {children}
    </main>
  )
}
