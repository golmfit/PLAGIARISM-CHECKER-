"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type SavedImage = {
  id: string
  src: string
  prompt: string
  createdAt: string
}

type FavoritesContextType = {
  savedImages: SavedImage[]
  isSaved: (id: string) => boolean
  toggleSave: (image: SavedImage) => void
  removeFromSaved: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [savedImages, setSavedImages] = useState<SavedImage[]>([])

  // Load saved images from localStorage on initial render
  useEffect(() => {
    const storedImages = localStorage.getItem("visionfy_saved_images")
    if (storedImages) {
      try {
        setSavedImages(JSON.parse(storedImages))
      } catch (error) {
        console.error("Failed to parse saved images:", error)
      }
    }
  }, [])

  // Update localStorage whenever savedImages changes
  useEffect(() => {
    localStorage.setItem("visionfy_saved_images", JSON.stringify(savedImages))
  }, [savedImages])

  const isSaved = (id: string) => {
    return savedImages.some((image) => image.id === id)
  }

  const toggleSave = (image: SavedImage) => {
    if (isSaved(image.id)) {
      removeFromSaved(image.id)
    } else {
      setSavedImages((prev) => [image, ...prev])
    }
  }

  const removeFromSaved = (id: string) => {
    setSavedImages((prev) => prev.filter((image) => image.id !== id))
  }

  return (
    <FavoritesContext.Provider value={{ savedImages, isSaved, toggleSave, removeFromSaved }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
