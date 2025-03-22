import { CardContent } from "../ui/card";

export default function OnboardingPromptSkeleton() {
  return (
    <CardContent>
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="bg-gray-200 h-4 w-1/2"></div>
        <div className="bg-gray-200 h-4 w-3/4"></div>
        <div className="bg-gray-200 h-4 w-1/2"></div>
        <div className="bg-gray-200 h-4 w-3/4"></div>
        <div className="bg-gray-200 h-4 w-1/2"></div>
        <div className="bg-gray-200 h-4 w-3/4"></div>
        <div className="bg-gray-200 h-4 w-1/2"></div>
        <div className="bg-gray-200 h-4 w-3/4"></div>
      </div>
    </CardContent>
  )
}
