import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  text?: string
  className?: string
}

export default function LoadingSpinner({
  size = "md",
  showText = false,
  text = "Loading...",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
        <div className="relative z-10 h-full w-full rounded-full bg-background flex items-center justify-center border border-primary/20 shadow-md">
          <Sparkles className={cn("text-primary animate-pulse", iconSizes[size])} />
        </div>
      </div>
      {showText && <p className="text-sm text-muted-foreground mt-2">{text}</p>}
    </div>
  )
}
