"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Heart, Share, Maximize2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Simple tooltip component
function SimpleTooltip({
  children,
  content,
  side = "bottom",
}: {
  children: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
}) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  // Position the tooltip based on the side
  const getPosition = () => {
    if (!triggerRef.current) return {}

    const rect = triggerRef.current.getBoundingClientRect()
    const tooltipWidth = 100 // Approximate width
    const tooltipHeight = 30 // Approximate height

    switch (side) {
      case "top":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(-8px)",
          marginBottom: "8px",
        }
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%) translateX(8px)",
          marginLeft: "8px",
        }
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(8px)",
          marginTop: "8px",
        }
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%) translateX(-8px)",
          marginRight: "8px",
        }
    }
  }

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover rounded-md shadow-md pointer-events-none whitespace-nowrap"
          style={getPosition()}
        >
          {content}
          <div
            className={cn(
              "absolute w-2 h-2 bg-popover rotate-45",
              side === "top" && "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
              side === "right" && "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2",
              side === "bottom" && "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
              side === "left" && "right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
            )}
          />
        </div>
      )}
    </div>
  )
}

// Simple dialog component
function SimpleDialog({
  open,
  onOpenChange,
  children,
  className = "",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden" // Prevent scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "" // Restore scrolling
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div
        ref={dialogRef}
        className={cn(
          "relative bg-background rounded-lg shadow-lg max-w-4xl w-[90vw] max-h-[90vh] overflow-auto p-6",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => onOpenChange(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

// Gallery image type
type GalleryImage = {
  id: string
  src: string
  prompt: string
  style: string
  width: number
  height: number
  author: string
  likes: number
  isLiked?: boolean
  aspectRatio: "square" | "portrait" | "landscape"
}

// Generate gallery data
const generateGalleryData = (): GalleryImage[] => {
  const styles = [
    "Photorealistic",
    "Digital Art",
    "Oil Painting",
    "Watercolor",
    "Pixel Art",
    "3D Render",
    "Anime",
    "Sketch",
  ]

  const prompts = [
    "A serene mountain landscape with a lake and forest",
    "Futuristic cityscape with flying cars and neon lights",
    "Mystical forest with glowing mushrooms and fairies",
    "Underwater ancient ruins with mermaids",
    "Steampunk airship flying through clouds",
    "Cyberpunk street scene with rain and reflections",
    "Fantasy castle on a floating island",
    "Dragon soaring over a medieval village",
    "Astronaut standing on an alien planet",
    "Post-apocalyptic city reclaimed by nature",
    "Enchanted library with magical books",
    "Samurai warrior in a cherry blossom garden",
    "Cozy cabin in a snowy forest at night",
    "Pirate ship sailing through a storm",
    "Ancient temple hidden in a jungle",
    "Futuristic space station orbiting a ringed planet",
    "Wizard's tower under a starry sky",
    "Desert oasis with palm trees and camels",
    "Mythical phoenix rising from ashes",
    "Victorian-era street scene with gas lamps",
  ]

  const aspectRatios: ("square" | "portrait" | "landscape")[] = ["square", "portrait", "landscape"]
  const authors = ["AI Artist", "PromptMaster", "PixelDreamer", "VisualAlchemist", "CreativeAI"]

  return Array.from({ length: 24 }, (_, i) => {
    const aspectRatio = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
    const style = styles[Math.floor(Math.random() * styles.length)]
    const prompt = prompts[Math.floor(Math.random() * prompts.length)]

    let width, height
    if (aspectRatio === "square") {
      width = 1000
      height = 1000
    } else if (aspectRatio === "portrait") {
      width = 800
      height = 1200
    } else {
      width = 1200
      height = 800
    }

    return {
      id: `img-${i}`,
      src: `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(`${style} style ${prompt}`)}`,
      prompt,
      style,
      width,
      height,
      author: authors[Math.floor(Math.random() * authors.length)],
      likes: Math.floor(Math.random() * 200),
      aspectRatio,
    }
  })
}

export default function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "large">("masonry")
  const [gridDensity, setGridDensity] = useState<"compact" | "normal" | "spacious">("normal")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setImages(generateGalleryData())
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Listen for grid density changes from the header component
  useEffect(() => {
    const handleGridDensityChange = (event: CustomEvent) => {
      if (event.detail && event.detail.gridDensity) {
        setGridDensity(event.detail.gridDensity)
      }
    }

    window.addEventListener("gridDensityChange", handleGridDensityChange as EventListener)
    return () => {
      window.removeEventListener("gridDensityChange", handleGridDensityChange as EventListener)
    }
  }, [])

  // Listen for view mode changes from the header component
  useEffect(() => {
    const handleViewModeChange = (event: CustomEvent) => {
      if (event.detail && event.detail.viewMode) {
        setViewMode(event.detail.viewMode)
      }
    }

    window.addEventListener("viewModeChange", handleViewModeChange as EventListener)
    return () => {
      window.removeEventListener("viewModeChange", handleViewModeChange as EventListener)
    }
  }, [])

  const toggleLike = (id: string) => {
    setImages(
      images.map((img) =>
        img.id === id
          ? {
              ...img,
              isLiked: !img.isLiked,
              likes: img.isLiked ? img.likes - 1 : img.likes + 1,
            }
          : img,
      ),
    )
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  // Determine grid columns based on density and view mode
  const getGridColumns = () => {
    if (viewMode === "large") {
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    }

    switch (gridDensity) {
      case "compact":
        return "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
      case "normal":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      case "spacious":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    }
  }

  // Determine masonry columns based on density
  const getMasonryColumns = () => {
    switch (gridDensity) {
      case "compact":
        return "columns-3 sm:columns-4 md:columns-6 lg:columns-8"
      case "normal":
        return "columns-2 sm:columns-3 md:columns-4 lg:columns-5"
      case "spacious":
        return "columns-1 sm:columns-2 md:columns-3 lg:columns-4"
      default:
        return "columns-2 sm:columns-3 md:columns-4 lg:columns-5"
    }
  }

  return (
    <section className="container pb-20">
      <div
        className={cn(
          "gap-4 animate-in fade-in-50",
          viewMode === "grid" && getGridColumns(),
          viewMode === "large" && getGridColumns(),
          viewMode === "masonry" && `${getMasonryColumns()} space-y-4`,
          viewMode === "grid" || viewMode === "large" ? "grid" : "",
        )}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "group relative overflow-hidden rounded-lg border border-border/40 bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
              viewMode === "masonry" && "break-inside-avoid mb-4",
            )}
            style={viewMode === "masonry" ? { display: "inline-block", width: "100%" } : {}}
          >
            <div className="relative">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.prompt}
                width={image.width}
                height={image.height}
                className={cn(
                  "w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105",
                  viewMode === "large" && "aspect-video",
                )}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm line-clamp-2 mb-2">{image.prompt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/80">{image.style}</span>
                    <div className="flex gap-1">
                      <SimpleTooltip content={image.isLiked ? "Unlike" : "Like"}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                          onClick={() => toggleLike(image.id)}
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4 transition-all",
                              image.isLiked && "fill-red-500 text-red-500 scale-110",
                            )}
                          />
                          <span className="sr-only">Like</span>
                        </Button>
                      </SimpleTooltip>

                      <SimpleTooltip content="Download">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </SimpleTooltip>

                      <SimpleTooltip content="View details">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                          onClick={() => setSelectedImage(image)}
                        >
                          <Maximize2 className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </SimpleTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {viewMode === "large" && (
              <div className="p-4">
                <p className="font-medium line-clamp-1">{image.prompt}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">{image.style}</span>
                    <span className="text-xs text-muted-foreground">By {image.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className={cn("h-4 w-4", image.isLiked && "fill-red-500 text-red-500")} />
                    <span className="text-xs">{image.likes}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <SimpleDialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">{selectedImage?.prompt}</h2>
            <p className="text-sm text-muted-foreground">
              Generated in {selectedImage?.style} style by {selectedImage?.author}
            </p>
          </div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-6">
            <div className="relative rounded-lg overflow-hidden border">
              {selectedImage && (
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.prompt}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Prompt</h4>
                <p className="text-sm text-muted-foreground">{selectedImage?.prompt}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Style</span>
                    <span>{selectedImage?.style}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>
                      {selectedImage?.width} × {selectedImage?.height}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Created by</span>
                    <span>{selectedImage?.author}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Likes</span>
                    <span>{selectedImage?.likes}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full gap-2" onClick={() => selectedImage && toggleLike(selectedImage.id)}>
                  <Heart className={cn("h-4 w-4", selectedImage?.isLiked && "fill-current")} />
                  {selectedImage?.isLiked ? "Unlike" : "Like"} Image
                </Button>

                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>

                <Button variant="outline" className="w-full gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>

                <div className="rounded-lg border p-3 mt-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      This image was generated using AI. You can create similar images by signing up for Visionfy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SimpleDialog>

      <div className="mt-12 text-center">
        <Button variant="outline" size="lg" className="animate-in fade-in-50">
          Load More
        </Button>
      </div>
    </section>
  )
}
