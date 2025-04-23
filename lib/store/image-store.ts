// A simple client-side store for generated images
// This would typically be replaced with a database in a real application

export type StoredImage = {
  id: string
  src: string
  prompt: string
  aspectRatio: string
  timestamp: string
  style?: string
  author?: string
  likes?: number
  isLiked?: boolean
}

// Function to save a generated image to localStorage
export function saveGeneratedImage(image: StoredImage): void {
  // Get existing images
  const existingImages = getGeneratedImages()

  // Add new image to the beginning of the array (most recent first)
  const updatedImages = [image, ...existingImages]

  // Save to localStorage
  localStorage.setItem("visionfy_generated_images", JSON.stringify(updatedImages))

  // Dispatch a custom event to notify other components
  window.dispatchEvent(new Event("generatedImagesUpdated"))
}

// Function to get all generated images
export function getGeneratedImages(): StoredImage[] {
  try {
    const storedImages = localStorage.getItem("visionfy_generated_images")
    return storedImages ? JSON.parse(storedImages) : []
  } catch (error) {
    console.error("Error retrieving generated images:", error)
    return []
  }
}

// Function to get recent generated images (limited number)
export function getRecentGeneratedImages(limit = 6): StoredImage[] {
  const allImages = getGeneratedImages()
  return allImages.slice(0, limit)
}

// Function to delete a generated image
export function deleteGeneratedImage(id: string): void {
  const existingImages = getGeneratedImages()
  const updatedImages = existingImages.filter((image) => image.id !== id)
  localStorage.setItem("visionfy_generated_images", JSON.stringify(updatedImages))

  // Dispatch a custom event to notify other components
  window.dispatchEvent(new Event("generatedImagesUpdated"))
}

// Function to like/unlike a generated image
export function toggleLikeGeneratedImage(id: string): void {
  const existingImages = getGeneratedImages()
  const updatedImages = existingImages.map((image) => {
    if (image.id === id) {
      const isLiked = !image.isLiked
      return {
        ...image,
        isLiked,
        likes: isLiked ? (image.likes || 0) + 1 : (image.likes || 1) - 1,
      }
    }
    return image
  })

  localStorage.setItem("visiomancer_generated_images", JSON.stringify(updatedImages))

  // Dispatch a custom event to notify other components
  window.dispatchEvent(new Event("generatedImagesUpdated"))
}
