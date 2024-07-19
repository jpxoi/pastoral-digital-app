export default function SuccessMessage({
  message,
  subtitle,
}: {
  message: string
  subtitle?: string
}) {
  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex flex-col justify-center rounded-lg border border-green-700 bg-green-100 p-4 text-green-700'>
        <p className='inline'>{message}</p>
        {subtitle ? (
          <p className='mt-0.5 text-xs text-gray-500'>{subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}
