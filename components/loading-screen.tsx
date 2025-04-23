"use client"

import { Sparkles } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative z-10 h-16 w-16 rounded-full bg-background flex items-center justify-center border border-primary/20 shadow-lg">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold flex items-center justify-center">
            Visi
            <Sparkles className="h-4 w-4 mx-0.5 text-primary" />
            nfy
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Loading your experience...</p>
        </div>
        <div className="w-48 h-1.5 bg-muted/50 rounded-full overflow-hidden">
          <div className="h-full bg-primary/70 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  )
}
