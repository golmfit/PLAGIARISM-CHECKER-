"use client"

import { useState } from "react"
import { useFavorites, type SavedImage } from "@/components/favorites/favorites-provider"
import { Button } from "@/components/ui/button"
import { Search, Grid2X2, LayoutList, Download, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SavedImagesPage() {
  const { savedImages, removeFromSaved } = useFavorites()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<string | null>(null)

  // Filter images based on search query
  const filteredImages = savedImages.filter((image) => image.prompt.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort images based on selection
  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const confirmDelete = (id: string) => {
    setImageToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (imageToDelete) {
      removeFromSaved(imageToDelete)
      setImageToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  const handleDownload = (image: SavedImage) => {
    // In a real app, we would use proper image downloading functionality
    // For now, we'll just log the action
    console.log("Downloading image:", image.src)
    alert("Download started! (This is a simulation)")
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Saved Images</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <LayoutList className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
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
          </SelectContent>
        </Select>
      </div>

      {sortedImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-muted-foreground/60" />
          </div>
          <h3 className="text-xl font-medium mb-2">No saved images found</h3>
          <p className="text-muted-foreground max-w-md">
            {searchQuery.length > 0
              ? "No images match your search. Try a different query."
              : "Images you save will appear here. Start creating and saving images!"}
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
                  <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => handleDownload(image)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => confirmDelete(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedImages.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.prompt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-2">{image.prompt}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(image)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => confirmDelete(image.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this image from your saved collection. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
