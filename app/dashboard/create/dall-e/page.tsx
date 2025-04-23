"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PromptForm from "@/components/image-generation/prompt-form"
import ImageUploadForm from "@/components/image-generation/image-upload-form"
import ImageGallery from "@/components/image-generation/image-gallery"
import { Sparkles, ImageIcon, Wand } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DallEPage() {
  const [activeTab, setActiveTab] = useState("text-to-image")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const router = useRouter()

  // Handle image generation completion
  const handleGenerate = (images: string[]) => {
    setGeneratedImages(images)
    setIsGenerating(false)
  }

  // Handle image deletion
  const handleDeleteImage = (url: string) => {
    setGeneratedImages((prev) => prev.filter((image) => image !== url))
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold">DALL-E Image Generation</h1>
        <p className="text-muted-foreground">Create stunning AI-generated images using OpenAI's DALL-E model</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="text-to-image" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Text-to-Image</span>
                <span className="sm:hidden">Text</span>
              </TabsTrigger>
              <TabsTrigger value="variations" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Variations</span>
                <span className="sm:hidden">Vary</span>
              </TabsTrigger>
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Wand className="h-4 w-4" />
                <span className="hidden sm:inline">Edit Image</span>
                <span className="sm:hidden">Edit</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text-to-image">
              <Card>
                <CardHeader>
                  <CardTitle>Text-to-Image</CardTitle>
                  <CardDescription>Generate images from text descriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <PromptForm onGenerate={handleGenerate} isGenerating={isGenerating} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variations">
              <Card>
                <CardHeader>
                  <CardTitle>Image Variations</CardTitle>
                  <CardDescription>Create variations of an existing image</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploadForm onGenerate={handleGenerate} isGenerating={isGenerating} mode="variations" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="edit">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Image</CardTitle>
                  <CardDescription>Edit an image based on a text prompt</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploadForm onGenerate={handleGenerate} isGenerating={isGenerating} mode="edit" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Tips & Tricks</CardTitle>
              <CardDescription>Get the most out of DALL-E</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Be Specific</h4>
                  <p className="text-muted-foreground">
                    Include details about style, lighting, composition, and subject matter.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Try Different Styles</h4>
                  <p className="text-muted-foreground">
                    Experiment with styles like "photorealistic", "oil painting", "3D render", etc.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Use References</h4>
                  <p className="text-muted-foreground">
                    Mention specific artists or art styles to influence the output.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Iterate</h4>
                  <p className="text-muted-foreground">
                    Use the variations feature to explore different versions of your idea.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Generated Images</CardTitle>
              <CardDescription>Your AI-generated images will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageGallery
                images={generatedImages}
                prompt={activeTab === "text-to-image" ? "AI-generated image" : undefined}
                onDelete={handleDeleteImage}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
