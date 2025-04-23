"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Loader } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  aspectRatio?: "square" | "video" | "vertical"
}

export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = false,
  loop = true,
  muted = true,
  controls = true,
  aspectRatio = "video",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100
      setProgress(currentProgress)
    }
    const handleLoadedData = () => setIsLoading(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadeddata", handleLoadedData)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadeddata", handleLoadedData)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      video.requestFullscreen()
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = pos * video.duration
  }

  const handleMouseEnter = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 2000)
  }

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    vertical: "aspect-[9/16]",
  }[aspectRatio]

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg bg-black", aspectRatioClass, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className="h-full w-full object-cover"
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 animate-in fade-in-50">
          <Loader className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      {controls && (
        <div
          className={`absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-500 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top controls */}
          <div className="flex justify-end">
            {!isLoading && (
              <button
                onClick={toggleMute}
                className="rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:scale-110"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            )}
          </div>

          {/* Center play button */}
          {!isLoading && !isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/30 p-4 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:scale-110 animate-in fade-in-50 zoom-in-95"
            >
              <Play className="h-6 w-6 fill-current" />
            </button>
          )}

          {/* Bottom controls */}
          <div className="space-y-2">
            <div
              className="h-1 cursor-pointer overflow-hidden rounded-full bg-white/30 transition-all duration-300 hover:h-2"
              onClick={handleProgressClick}
            >
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:scale-110"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
              <button
                onClick={handleFullscreen}
                className="rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:scale-110"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
