import { ExclamationTriangle } from '../icons/icons24'

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex flex-row justify-center rounded-lg border border-red-700 bg-red-100 p-4 text-red-700'>
        <span className='flex items-center'>
          <ExclamationTriangle />
        </span>
        <p className='ml-3 inline text-left'>{message}</p>
      </div>
    </div>
  )
}
