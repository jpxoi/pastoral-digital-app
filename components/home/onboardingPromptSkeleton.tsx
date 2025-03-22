import { CardContent } from '../ui/card'

export default function OnboardingPromptSkeleton() {
  return (
    <CardContent>
      <div className='flex animate-pulse flex-col space-y-4'>
        <div className='h-4 w-1/2 bg-gray-200'></div>
        <div className='h-4 w-3/4 bg-gray-200'></div>
        <div className='h-4 w-1/2 bg-gray-200'></div>
        <div className='h-4 w-3/4 bg-gray-200'></div>
        <div className='h-4 w-1/2 bg-gray-200'></div>
        <div className='h-4 w-3/4 bg-gray-200'></div>
        <div className='h-4 w-1/2 bg-gray-200'></div>
        <div className='h-4 w-3/4 bg-gray-200'></div>
      </div>
    </CardContent>
  )
}
