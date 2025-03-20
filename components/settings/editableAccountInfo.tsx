import { EditIconMicro } from '@/components/icons/icons16'
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function EditableAccountInfo() {
  const user = await currentUser()
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col items-start justify-center gap-1'>
          <h5 className='text-xs font-medium text-gray-600'>Nombres</h5>
          <p className='text-sm text-gray-800'>{user?.firstName as string}</p>
        </div>

        <div className='flex flex-col items-start justify-center gap-1'>
          <h5 className='text-xs font-medium text-gray-600'>Apellidos</h5>
          <p className='text-sm text-gray-800'>{user?.lastName as string}</p>
        </div>
      </div>

      <div className='flex flex-row items-center justify-between gap-1'>
        <div className='flex flex-col items-start justify-center'>
          <h5 className='text-xs font-medium text-gray-600'>
            Nombre de Usuario
          </h5>
          <p className='text-sm text-gray-800'>{user?.username as string}</p>
        </div>
        <button
          className='group flex cursor-help flex-row items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-gray-50'
          disabled
        >
          <EditIconMicro />
          Editar
          <div
            id='tooltip'
            className={`absolute z-10 mt-16 hidden rounded-md bg-gray-100 p-2 text-xs text-gray-600 shadow-md group-hover:block`}
          >
            <p>Muy pronto podrás editar tu apelativo.</p>
          </div>
        </button>
      </div>
    </div>
  )
}
