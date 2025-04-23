"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface PromptFormProps {
  onGenerate: (images: string[]) => void
  isGenerating: boolean
}

export default function PromptForm({ onGenerate, isGenerating }: PromptFormProps) {
  const [prompt, setPrompt] = useState("")
  const [size, setSize] = useState<string>("1024x1024")
  const [quality, setQuality] = useState<string>("standard")
  const [style, setStyle] = useState<string>("vivid")
  const [numImages, setNumImages] = useState<string>("1")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) {
      toast({
        title: "Prompt is required",
        description: "Please enter a description of the image you want to generate.",
        variant: "destructive",
      })
      return
    }

    try {
      // Call the API to generate images
      const response = await fetch("/api/images/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          options: {
            size,
            quality,
            style,
            n: Number.parseInt(numImages),
          },
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to generate images")
      }

      const data = await response.json()

      // Pass the generated image URLs to the parent component
      onGenerate(data.images)

      // Reset the form
      setPrompt("")

      toast({
        title: "Images generated successfully",
        description: `Generated ${data.images.length} images.`,
      })
    } catch (error) {
      console.error("Error generating images:", error)
      toast({
        title: "Error generating images",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] resize-none"
          disabled={isGenerating}
        />
        <p className="text-xs text-muted-foreground text-right">{prompt.length}/1000 characters</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Size</label>
          <Select value={size} onValueChange={setSize} disabled={isGenerating}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1024x1024">Square (1024×1024)</SelectItem>
              <SelectItem value="1024x1792">Portrait (1024×1792)</SelectItem>
              <SelectItem value="1792x1024">Landscape (1792×1024)</SelectItem>
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Quality</label>
          <Select value={quality} onValueChange={setQuality} disabled={isGenerating}>
            <SelectTrigger>
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="hd">HD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Style</label>
          <Select value={style} onValueChange={setStyle} disabled={isGenerating}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vivid">Vivid</SelectItem>
              <SelectItem value="natural">Natural</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isGenerating || !prompt.trim()}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Images
          </>
        )}
      </Button>
    </form>
  )
}
