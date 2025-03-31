import AttendanceCalendarTableSkeleton from '@/components/admin/attendanceCalendarTableSkeleton'

export default function Loading() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <div className='flex flex-col gap-2 text-left'>
        <h1 className='text-xl font-semibold sm:text-2xl'>
          Calendario de Asistencia
        </h1>
      </div>

      <AttendanceCalendarTableSkeleton />
    </main>
  )
}
