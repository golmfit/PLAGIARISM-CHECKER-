"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Bookmark, Share, Trash2, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ImageGalleryProps {
  images: string[]
  prompt?: string
  onDelete?: (url: string) => void
}

export default function ImageGallery({ images, prompt, onDelete }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDownload = async (url: string) => {
    setIsDownloading(url)

    try {
      // Fetch the image
      const response = await fetch(url)
      const blob = await response.blob()

      // Create a download link
      const downloadUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `image-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      toast({
        title: "Image downloaded",
        description: "The image has been downloaded to your device.",
      })
    } catch (error) {
      console.error("Error downloading image:", error)
      toast({
        title: "Download failed",
        description: "Failed to download the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(null)
    }
  }

  const handleSave = async (url: string) => {
    setIsSaving(url)

    try {
      // In a real app, you would save this to the user's collection
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call

      toast({
        title: "Image saved",
        description: "The image has been saved to your collection.",
      })
    } catch (error) {
      console.error("Error saving image:", error)
      toast({
        title: "Save failed",
        description: "Failed to save the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(null)
    }
  }

  const handleShare = async (url: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: prompt || "AI-generated image",
          text: prompt || "Check out this AI-generated image!",
          url: url,
        })
      } else {
        // Fallback to copying the URL
        await navigator.clipboard.writeText(url)
        toast({
          title: "URL copied",
          description: "Image URL copied to clipboard.",
        })
      }
    } catch (error) {
      console.error("Error sharing image:", error)
      toast({
        title: "Share failed",
        description: "Failed to share the image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (url: string) => {
    if (!onDelete) return

    setIsDeleting(url)

    try {
      // In a real app, you might want to confirm deletion
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call

      onDelete(url)

      toast({
        title: "Image deleted",
        description: "The image has been deleted.",
      })
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Delete failed",
        description: "Failed to delete the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No images yet</h3>
        <p className="text-muted-foreground max-w-md">
          {prompt
            ? "Enter a prompt and click 'Generate' to create AI-generated images."
            : "Upload an image and click 'Generate' to create variations or edits."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((url) => (
          <div
            key={url}
            className="group relative aspect-square rounded-lg overflow-hidden border"
            onClick={() => setSelectedImage(url)}
          >
            <Image
              src={url || "/placeholder.svg"}
              alt={prompt || "AI-generated image"}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div className="w-full flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(url)
                    }}
                    disabled={isDownloading === url}
                  >
                    {isDownloading === url ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSave(url)
                    }}
                    disabled={isSaving === url}
                  >
                    {isSaving === url ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bookmark className="h-4 w-4" />}
                  </Button>

                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare(url)
                    }}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>

                {onDelete && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(url)
                    }}
                    disabled={isDeleting === url}
                  >
                    {isDeleting === url ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {prompt && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-1">Prompt</p>
          <p className="text-sm text-muted-foreground">{prompt}</p>
        </div>
      )}
    </div>
  )
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}
