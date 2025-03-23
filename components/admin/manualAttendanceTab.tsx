import { TabsContent } from '@/components/ui/tabs'

export default function ManualAttendanceTab() {
  return (
    <TabsContent value='register' className='space-y-4'>
      <div className='flex flex-col items-center justify-center gap-2 h-52'>
        <h1 className='text-balance text-lg font-bold'>
          Muy Pronto
        </h1>
        <p className='text-sm'>
          Esta funcionalidad estará disponible en futuras actualizaciones.
        </p>
      </div>
    </TabsContent>
  )
}
