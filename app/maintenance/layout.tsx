export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='bg-primary fixed inset-0 flex h-screen w-screen flex-col items-center justify-center gap-4 p-4 md:gap-6 md:p-8'>
      {children}
    </main>
  )
}
