"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Sparkles } from "lucide-react"

export default function GlobalLoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleStop = () => setIsLoading(false)

    // Add event listeners for route changes
    window.addEventListener("routeChangeStart", handleStart)
    window.addEventListener("routeChangeComplete", handleStop)
    window.addEventListener("routeChangeError", handleStop)

    return () => {
      window.removeEventListener("routeChangeStart", handleStart)
      window.removeEventListener("routeChangeComplete", handleStop)
      window.removeEventListener("routeChangeError", handleStop)
    }
  }, [])

  // Reset loading state when pathname or search params change
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div className="bg-background/80 backdrop-blur-sm border border-border/40 rounded-b-lg shadow-lg px-4 py-2 flex items-center space-x-2">
        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  )
}
