"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Bookmark } from "lucide-react"
import Link from "next/link"
import { getRecentGeneratedImages, toggleLikeGeneratedImage, type StoredImage } from "@/lib/store/image-store"

export default function RecentCreations() {
  const [recentImages, setRecentImages] = useState<StoredImage[]>([])

  useEffect(() => {
    // Initial load
    setRecentImages(getRecentGeneratedImages(6))

    // Listen for updates to the generated images
    const handleImagesUpdated = () => {
      setRecentImages(getRecentGeneratedImages(6))
    }

    window.addEventListener("generatedImagesUpdated", handleImagesUpdated)

    return () => {
      window.removeEventListener("generatedImagesUpdated", handleImagesUpdated)
    }
  }, [])

  const handleLikeToggle = (id: string) => {
    toggleLikeGeneratedImage(id)

    // Update the local state to reflect the change immediately
    setRecentImages((prevImages) =>
      prevImages.map((img) => {
        if (img.id === id) {
          const isLiked = !img.isLiked
          return {
            ...img,
            isLiked,
            likes: isLiked ? (img.likes || 0) + 1 : (img.likes || 1) - 1,
          }
        }
        return img
      }),
    )
  }

  const handleDownload = (image: StoredImage) => {
    // In a real app, this would download the actual image
    // For now, just show a toast notification
    alert("Downloading image: " + image.prompt)
  }

  return (
    <div>
      {recentImages.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No images created yet. Start generating!</p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/create">Create Images</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recentImages.map((image) => (
              <div key={image.id} className="aspect-square rounded-md overflow-hidden relative group">
                <img src={image.src || "/placeholder.svg"} alt={image.prompt} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={() => handleDownload(image)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={() => handleLikeToggle(image.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${image.isLiked ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/dashboard/gallery">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
