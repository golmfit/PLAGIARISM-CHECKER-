import { AlertTriangle } from "lucide-react"

interface CharacterWarningProps {
  characterCount: number
  characterLimit: number
}

export default function CharacterWarning({ characterCount, characterLimit }: CharacterWarningProps) {
  // Only show when over the limit
  if (characterCount <= characterLimit) {
    return null
  }

  return (
    <div className="fixed z-[100] top-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
      <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-gray-100 dark:bg-gray-800/95 shadow-lg animate-in fade-in-50 slide-in-from-top-5">
        <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-lg">Message too long</p>
          <p className="text-gray-500 dark:text-gray-400">Please shorten message to continue</p>
        </div>
      </div>
    </div>
  )
}
