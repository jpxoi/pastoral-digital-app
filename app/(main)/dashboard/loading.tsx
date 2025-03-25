import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <div className='flex w-full flex-col items-center justify-start lg:flex-row lg:items-start lg:justify-evenly'>
        <div className='pass-front group m-0 h-auto w-full min-w-80 rounded-lg p-0 transition-all duration-300 sm:min-w-96 sm:max-w-sm'>
          <div className='group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-[#001944] bg-white drop-shadow-md transition-all duration-300 hover:drop-shadow-2xl'>
            <div className='relative h-full w-full'>
              <Skeleton className='m-0 mx-auto aspect-square h-auto w-full items-center justify-center rounded-lg p-0 sm:max-w-sm' />
              <div className='flex h-full flex-col items-center justify-center bg-[#001944] p-2'>
                <p className='text-balance text-xs text-blue-50'>
                  Escanea este QR para registrar tu asistencia
                </p>
              </div>
            </div>
            <div className='z-5 absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine' />
          </div>
        </div>
        <div className='mt-8 flex flex-col items-center justify-start gap-4 lg:ml-4 lg:mt-0 lg:max-h-[80vh] xl:ml-0'>
          <div className='container mx-auto flex h-auto max-w-[100vw] flex-col items-center justify-center'>
            <h1 className='mb-4 text-xl font-bold sm:text-2xl'>
              Registro de Asistencias
            </h1>
            <Card className='relative w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-h-[65vh]'>
              <AttendanceTableSkeleton />
            </Card>
            <p className='mt-4 w-full max-w-full text-sm text-gray-600 sm:max-w-screen-sm md:max-w-screen-md'>
              Las faltas no se registran en la tabla. No obstante, cualquier
              fecha sin registro válido, se considera falta.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
