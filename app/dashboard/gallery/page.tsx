"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Grid2X2, LayoutList, Search, Filter, Download, Bookmark, MoreHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFavorites, type SavedImage } from "@/components/favorites/favorites-provider"
import { toast } from "@/components/ui/use-toast"
import {
  getGeneratedImages,
  deleteGeneratedImage,
  toggleLikeGeneratedImage,
  type StoredImage,
} from "@/lib/store/image-store"

// Simple dropdown menu component
function SimpleDropdownMenu({
  children,
  trigger,
  align = "right",
}: {
  children: React.ReactNode
  trigger: React.ReactNode
  align?: "left" | "right"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-background border border-border ${align === "right" ? "right-0" : "left-0"}`}
        >
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  )
}

// Menu item component
function MenuItem({
  onClick,
  children,
  className = "",
  destructive = false,
}: {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  destructive?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center px-4 py-2 text-sm hover:bg-accent ${destructive ? "text-destructive hover:text-destructive" : ""} ${className}`}
    >
      {children}
    </button>
  )
}

// Menu separator component
function MenuSeparator() {
  return <div className="border-t border-border my-1"></div>
}

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [images, setImages] = useState<StoredImage[]>([])
  const [sortBy, setSortBy] = useState("newest")

  const { savedImages, isSaved, toggleSave } = useFavorites()

  // Load images from our store
  useEffect(() => {
    // Initial load
    setImages(getGeneratedImages())

    // Listen for updates to the generated images
    const handleImagesUpdated = () => {
      setImages(getGeneratedImages())
    }

    window.addEventListener("generatedImagesUpdated", handleImagesUpdated)

    return () => {
      window.removeEventListener("generatedImagesUpdated", handleImagesUpdated)
    }
  }, [])

  // Filter images based on search query
  const filteredImages = images.filter((image) => image.prompt.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort images based on selection
  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "oldest":
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      case "liked":
        return (b.isLiked ? 1 : 0) - (a.isLiked ? 1 : 0)
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    }
  })

  const handleSaveToggle = (image: StoredImage) => {
    const savedImage: SavedImage = {
      id: image.id,
      src: image.src,
      prompt: image.prompt,
      createdAt: image.timestamp,
    }

    toggleSave(savedImage)

    toast({
      title: isSaved(image.id) ? "Image removed from saved" : "Image saved to collection",
      description: isSaved(image.id)
        ? "The image has been removed from your collection"
        : "The image has been added to your collection",
      duration: 3000,
    })
  }

  const handleLikeToggle = (id: string) => {
    toggleLikeGeneratedImage(id)

    // Update the local state to reflect the change immediately
    setImages((prevImages) =>
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

  const handleDeleteImage = (id: string) => {
    deleteGeneratedImage(id)

    toast({
      title: "Image deleted",
      description: "The image has been removed from your gallery",
      duration: 3000,
    })
  }

  const handleDownload = (image: StoredImage) => {
    // In a real app, this would download the actual image
    // For now, just show a toast notification
    toast({
      title: "Downloading image",
      description: "Your image download has started",
      duration: 3000,
    })
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Your Gallery</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <LayoutList className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by prompt..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="liked">Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sortedImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-muted-foreground/60" />
          </div>
          <h3 className="text-xl font-medium mb-2">No images found</h3>
          <p className="text-muted-foreground max-w-md">
            {searchQuery.length > 0
              ? "No images match your search. Try a different query."
              : "You haven't created any images yet. Go to the Create page to generate some!"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-md overflow-hidden border border-border"
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.prompt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white text-sm line-clamp-2 mb-4">{image.prompt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => handleDownload(image)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleLikeToggle(image.id)}
                    >
                      <Bookmark className={`h-4 w-4 ${image.isLiked ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <SimpleDropdownMenu
                    trigger={
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <MenuItem onClick={() => handleSaveToggle(image)}>
                      {isSaved(image.id) ? "Remove from saved" : "Save to collection"}
                    </MenuItem>
                    <MenuItem onClick={() => {}}>Regenerate</MenuItem>
                    <MenuItem onClick={() => {}}>Share</MenuItem>
                    <MenuSeparator />
                    <MenuItem onClick={() => handleDeleteImage(image.id)} destructive>
                      Delete
                    </MenuItem>
                  </SimpleDropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedImages.map((image) => (
            <div key={image.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border">
              <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                <img src={image.src || "/placeholder.svg"} alt={image.prompt} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm line-clamp-2">{image.prompt}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(image.timestamp).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleDownload(image)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleLikeToggle(image.id)}>
                  <Bookmark className={`h-4 w-4 ${image.isLiked ? "fill-current" : ""}`} />
                </Button>

                <SimpleDropdownMenu
                  trigger={
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  }
                >
                  <MenuItem onClick={() => handleSaveToggle(image)}>
                    {isSaved(image.id) ? "Remove from saved" : "Save to collection"}
                  </MenuItem>
                  <MenuItem onClick={() => {}}>Regenerate</MenuItem>
                  <MenuItem onClick={() => {}}>Share</MenuItem>
                  <MenuSeparator />
                  <MenuItem onClick={() => handleDeleteImage(image.id)} destructive>
                    Delete
                  </MenuItem>
                </SimpleDropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedImages.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="animate-in fade-in-50">
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
