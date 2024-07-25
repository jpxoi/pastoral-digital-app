import FixedAccountInfo from './fixedAccountInfo'
import EditableAccountInfo from './editableAccountInfo'

export default function PersonalInfoSettings() {
  return (
    <div className='flex w-full flex-col items-start gap-6 rounded-xl bg-white px-8 py-8 shadow-md'>
      <h4 className='text-xl font-medium text-gray-800'>
        Información Personal
      </h4>
      <FixedAccountInfo />
      <div id='separator' className='h-[1px] w-full bg-gray-200' />
      <EditableAccountInfo />
    </div>
  )
}
