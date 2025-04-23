"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, X, ImageIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ImageUploadFormProps {
  onGenerate: (images: string[]) => void
  isGenerating: boolean
  mode: "variations" | "edit"
}

export default function ImageUploadForm({ onGenerate, isGenerating, mode }: ImageUploadFormProps) {
  const [image, setImage] = useState<File | null>(null)
  const [mask, setMask] = useState<File | null>(null)
  const [prompt, setPrompt] = useState("")
  const [size, setSize] = useState<string>("1024x1024")
  const [numImages, setNumImages] = useState<string>("1")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [maskPreview, setMaskPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const maskInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create a preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMask(file)

      // Create a preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setMaskPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      toast({
        title: "Image is required",
        description: "Please upload an image.",
        variant: "destructive",
      })
      return
    }

    if (mode === "edit" && !prompt.trim()) {
      toast({
        title: "Prompt is required",
        description: "Please enter a description of the edit you want to make.",
        variant: "destructive",
      })
      return
    }

    try {
      // Create form data
      const formData = new FormData()
      formData.append("image", image)
      if (mask) formData.append("mask", mask)
      if (prompt) formData.append("prompt", prompt)
      formData.append("size", size)
      formData.append("n", numImages)

      // Call the appropriate API endpoint
      const endpoint = mode === "variations" ? "/api/images/variations" : "/api/images/edit"
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `Failed to ${mode === "variations" ? "create variations" : "edit image"}`)
      }

      const data = await response.json()

      // Pass the generated image URLs to the parent component
      onGenerate(data.images)

      // Reset the form
      setImage(null)
      setMask(null)
      setPrompt("")
      setImagePreview(null)
      setMaskPreview(null)

      toast({
        title: mode === "variations" ? "Variations created successfully" : "Image edited successfully",
        description: `Generated ${data.images.length} images.`,
      })
    } catch (error) {
      console.error(`Error ${mode === "variations" ? "creating variations" : "editing image"}:`, error)
      toast({
        title: `Error ${mode === "variations" ? "creating variations" : "editing image"}`,
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeMask = () => {
    setMask(null)
    setMaskPreview(null)
    if (maskInputRef.current) {
      maskInputRef.current.value = ""
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              disabled={isGenerating}
            />
            {imagePreview ? (
              <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-background/80 rounded-full p-1 hover:bg-background"
                  disabled={isGenerating}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="h-24 w-24 flex flex-col items-center justify-center gap-2"
                disabled={isGenerating}
              >
                <Upload className="h-6 w-6" />
                <span className="text-xs">Upload</span>
              </Button>
            )}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {mode === "variations" ? "Upload a square image to create variations." : "Upload an image to edit."}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Supported formats: PNG, JPEG. Max size: 4MB.</p>
            </div>
          </div>
        </div>

        {mode === "edit" && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Mask (Optional)</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={maskInputRef}
                  onChange={handleMaskChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isGenerating || !image}
                />
                {maskPreview ? (
                  <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                    <img
                      src={maskPreview || "/placeholder.svg"}
                      alt="Mask Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeMask}
                      className="absolute top-1 right-1 bg-background/80 rounded-full p-1 hover:bg-background"
                      disabled={isGenerating}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => maskInputRef.current?.click()}
                    className="h-24 w-24 flex flex-col items-center justify-center gap-2"
                    disabled={isGenerating || !image}
                  >
                    <ImageIcon className="h-6 w-6" />
                    <span className="text-xs">Mask</span>
                  </Button>
                )}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Upload a mask to specify which areas to edit. Black areas will be edited, white areas will be
                    preserved.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    If no mask is provided, the entire image will be considered for editing.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Edit Prompt</label>
              <Textarea
                placeholder="Describe the edit you want to make..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[80px] resize-none"
                disabled={isGenerating || !image}
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Size</label>
            <Select value={size} onValueChange={setSize} disabled={isGenerating}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256x256">Small (256×256)</SelectItem>
                <SelectItem value="512x512">Medium (512×512)</SelectItem>
                <SelectItem value="1024x1024">Large (1024×1024)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Images</label>
            <Select value={numImages} onValueChange={setNumImages} disabled={isGenerating}>
              <SelectTrigger>
                <SelectValue placeholder="Number of images" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 image</SelectItem>
                <SelectItem value="2">2 images</SelectItem>
                <SelectItem value="3">3 images</SelectItem>
                <SelectItem value="4">4 images</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isGenerating || !image || (mode === "edit" && !prompt.trim())}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {mode === "variations" ? "Creating Variations..." : "Editing Image..."}
          </>
        ) : (
          <>{mode === "variations" ? "Create Variations" : "Edit Image"}</>
        )}
      </Button>
    </form>
  )
}
