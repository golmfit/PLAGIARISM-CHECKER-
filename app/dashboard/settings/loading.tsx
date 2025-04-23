import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2"></div>
        <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
      </div>

      <div className="h-10 w-full max-w-md bg-muted rounded animate-pulse mb-8"></div>

      <div className="flex flex-col items-center justify-center py-20">
        <LoadingSpinner size="lg" showText text="Loading settings..." />
      </div>
    </div>
  )
}
