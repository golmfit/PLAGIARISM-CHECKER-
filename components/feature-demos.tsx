"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sparkles, Wand2, Layers, Palette, Zap } from "lucide-react"
import { VideoPlayer } from "@/components/ui/video-player"

const features = [
  {
    id: "text-to-image",
    title: "Text-to-Image Generation",
    description:
      "Transform your text descriptions into stunning, detailed images with our advanced AI models. Simply describe what you want to see, and watch it come to life.",
    icon: Wand2,
    demo: {
      prompt: "A futuristic cityscape with neon lights, flying cars, and towering skyscrapers at night",
      steps: [
        "Enter your detailed prompt",
        "Select image dimensions and style",
        "Generate multiple variations",
        "Download or refine your favorites",
      ],
      images: ["/neon-dystopia.png", "/neon-skyways.png", "/neon-sprawl.png", "/neon-dystopia.png"],
      video: "/videos/text-to-image-demo.mp4",
      videoPoster: "/neon-dystopia.png",
    },
  },
  {
    id: "style-customization",
    title: "Style Customization",
    description:
      "Choose from dozens of artistic styles or create your own unique aesthetic for your generated images. From photorealistic to abstract, the choice is yours.",
    icon: Layers,
    demo: {
      prompt: "A serene mountain landscape with a lake and forest",
      styles: [
        { name: "Photorealistic", image: "/jagged-peaks-vista.png" },
        {
          name: "Oil Painting",
          image: "/majestic-peaks.png",
        },
        {
          name: "Watercolor",
          image: "/misty-mountain-vista.png",
        },
        { name: "Pixel Art", image: "/pixel-peak-vista.png" },
      ],
      video: "/videos/style-customization-demo.mp4",
      videoPoster: "/jagged-peaks-vista.png",
    },
  },
  {
    id: "image-enhancement",
    title: "Image Enhancement",
    description:
      "Upscale, refine, and perfect your generated images with our AI enhancement tools. Fix imperfections and increase resolution with a single click.",
    icon: Sparkles,
    demo: {
      before: "/grimy-orc-warrior.png",
      after: "/ethereal-sorceress.png",
      improvements: ["4x Resolution Upscaling", "Detail Enhancement", "Noise Reduction", "Color Correction"],
      video: "/videos/image-enhancement-demo.mp4",
      videoPoster: "/ethereal-elf-archer.png",
    },
  },
  {
    id: "rapid-generation",
    title: "Rapid Generation",
    description:
      "Create high-quality images in seconds, with lightning-fast processing even for complex prompts. No more waiting for your creative vision to materialize.",
    icon: Zap,
    demo: {
      prompt: "An astronaut riding a horse on Mars",
      generationTime: "3.2 seconds",
      image: "/mars-rider.png",
      video: "/videos/rapid-generation-demo.mp4",
      videoPoster: "/martian-equestrian.png",
    },
  },
  {
    id: "advanced-editing",
    title: "Advanced Editing Tools",
    description:
      "Fine-tune your creations with our suite of editing tools. Adjust colors, composition, lighting, and more to achieve exactly the look you want.",
    icon: Palette,
    demo: {
      original: "/stoic-elf.png",
      edited: "/shadow-sorceress.png",
      tools: ["Inpainting & Outpainting", "Selective Color Adjustment", "Lighting Controls", "Composition Tools"],
      video: "/videos/advanced-editing-demo.mp4",
      videoPoster: "/ethereal-sorceress.png",
    },
  },
]

export default function FeatureDemos() {
  const [activeTab, setActiveTab] = useState(features[0].id)
  const [selectedStyle, setSelectedStyle] = useState(0)
  const [showEnhanced, setShowEnhanced] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const activeFeature = features.find((feature) => feature.id === activeTab)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 3200)
  }

  const toggleVideoDisplay = () => {
    // First set opacity to 0
    setShowVideo((prev) => !prev)
  }

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">See Our Features in Action</h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Explore interactive demonstrations of our powerful AI image generation capabilities
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex items-center gap-2 transition-all duration-300 data-[state=active]:scale-105"
              >
                <feature.icon className="h-4 w-4" />
                <span className="hidden md:inline">{feature.title.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {activeFeature && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <activeFeature.icon className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">{activeFeature.title}</h3>
              </div>
              <p className="text-muted-foreground">{activeFeature.description}</p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleVideoDisplay}
                  className="mt-2 transition-all duration-300 hover:scale-105 hover:shadow-sm"
                >
                  {showVideo ? "Show Static Demo" : "Watch Video Demo"}
                </Button>
              </div>
            </div>
          )}

          {features.map((feature) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              className="mt-0 transition-all duration-500 animate-in fade-in-50 slide-in-from-bottom-5"
            >
              <div
                className={`transition-all duration-500 ${showVideo ? "scale-100 opacity-100" : "scale-95 opacity-0"} ${!showVideo ? "hidden" : ""}`}
              >
                <div className="rounded-xl overflow-hidden border animate-in fade-in-50 zoom-in-95">
                  <VideoPlayer
                    src={feature.demo.video}
                    poster={feature.demo.videoPoster}
                    aspectRatio="video"
                    autoPlay
                    controls
                  />
                  <div className="bg-background p-4 border-t">
                    <p className="font-medium">{feature.title} Demo</p>
                    <p className="text-sm text-muted-foreground">
                      Watch how our AI platform handles {feature.title.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-500 ${!showVideo ? "scale-100 opacity-100" : "scale-95 opacity-0"} ${showVideo ? "hidden" : ""}`}
              >
                {feature.id === "text-to-image" ? (
                  <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in-50 slide-in-from-bottom-5">
                    <div className="bg-muted/50 rounded-xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <h4 className="font-medium mb-2">Prompt</h4>
                      <div className="bg-background rounded-lg p-4 border mb-4">
                        <p className="text-sm">{feature.demo.prompt}</p>
                      </div>
                      <h4 className="font-medium mb-2">How it works</h4>
                      <ol className="space-y-2 mb-6">
                        {feature.demo.steps.map((step, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm animate-in fade-in-50 slide-in-from-left-5"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                      <Button className="w-full transition-all duration-300 hover:scale-105">Try it yourself</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.demo.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden border group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in-50 zoom-in-95"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Generated image variation ${index + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="transition-all duration-300 hover:scale-105"
                            >
                              View Full Size
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : feature.id === "style-customization" ? (
                  <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in-50 slide-in-from-bottom-5">
                    <div className="bg-muted/50 rounded-xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <h4 className="font-medium mb-2">Base Prompt</h4>
                      <div className="bg-background rounded-lg p-4 border mb-6">
                        <p className="text-sm">{feature.demo.prompt}</p>
                      </div>
                      <h4 className="font-medium mb-3">Choose a Style</h4>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {feature.demo.styles.map((style, index) => (
                          <button
                            key={index}
                            className={`text-sm p-2 rounded-lg border transition-all duration-300 ${
                              selectedStyle === index
                                ? "border-primary bg-primary/10 text-primary scale-105 shadow-sm"
                                : "border-border hover:border-primary/50 hover:scale-105"
                            }`}
                            onClick={() => setSelectedStyle(index)}
                          >
                            {style.name}
                          </button>
                        ))}
                      </div>
                      <Button className="w-full transition-all duration-300 hover:scale-105">
                        Create Your Own Style
                      </Button>
                    </div>
                    <div className="rounded-xl overflow-hidden border transition-all duration-500">
                      <Image
                        src={feature.demo.styles[selectedStyle].image || "/placeholder.svg"}
                        alt={`${feature.demo.styles[selectedStyle].name} style image`}
                        width={600}
                        height={400}
                        className="w-full h-auto transition-all duration-700 ease-in-out"
                      />
                      <div className="bg-background p-4 border-t">
                        <p className="font-medium">{feature.demo.styles[selectedStyle].name} Style</p>
                        <p className="text-sm text-muted-foreground">
                          {feature.demo.prompt} in {feature.demo.styles[selectedStyle].name.toLowerCase()} style
                        </p>
                      </div>
                    </div>
                  </div>
                ) : feature.id === "image-enhancement" ? (
                  <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in-50 slide-in-from-bottom-5">
                    <div className="bg-muted/50 rounded-xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <h4 className="font-medium mb-3">Image Enhancement</h4>
                      <p className="text-sm text-muted-foreground mb-6">
                        Our AI can dramatically improve image quality, resolution, and details with a single click.
                      </p>
                      <div className="space-y-3 mb-6">
                        {feature.demo.improvements.map((improvement, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm animate-in fade-in-50 slide-in-from-left-5"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                              <Check className="h-4 w-4" />
                            </span>
                            {improvement}
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full transition-all duration-300 hover:scale-105"
                        onClick={() => setShowEnhanced(!showEnhanced)}
                        variant={showEnhanced ? "outline" : "default"}
                      >
                        {showEnhanced ? "View Original" : "Enhance Image"}
                      </Button>
                    </div>
                    <div className="rounded-xl overflow-hidden border relative transition-all duration-500">
                      <Image
                        src={showEnhanced ? feature.demo.after : feature.demo.before}
                        alt={showEnhanced ? "Enhanced image" : "Original image"}
                        width={600}
                        height={400}
                        className={`w-full h-auto transition-all duration-700 ${showEnhanced ? "scale-100" : "scale-100"}`}
                      />
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium border transition-all duration-300">
                        {showEnhanced ? "Enhanced" : "Original"}
                      </div>
                      <div className="bg-background p-4 border-t">
                        <p className="font-medium">{showEnhanced ? "After Enhancement" : "Before Enhancement"}</p>
                        <p className="text-sm text-muted-foreground">
                          {showEnhanced ? "4x upscaled with enhanced details" : "Original low-resolution image"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : feature.id === "rapid-generation" ? (
                  <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in-50 slide-in-from-bottom-5">
                    <div className="bg-muted/50 rounded-xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <h4 className="font-medium mb-2">Prompt</h4>
                      <div className="bg-background rounded-lg p-4 border mb-6">
                        <p className="text-sm">{feature.demo.prompt}</p>
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="font-medium">Generation Time</h4>
                          <p className="text-sm text-muted-foreground">From prompt to image</p>
                        </div>
                        <div className="bg-primary/10 text-primary rounded-lg px-3 py-1 font-mono transition-all duration-300">
                          {isGenerating ? "Generating..." : feature.demo.generationTime}
                        </div>
                      </div>
                      <Button
                        className="w-full transition-all duration-300 hover:scale-105"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate Again"
                        )}
                      </Button>
                    </div>
                    <div className="rounded-xl overflow-hidden border relative transition-all duration-500">
                      {isGenerating ? (
                        <div className="aspect-[3/2] flex items-center justify-center bg-muted/30 animate-pulse">
                          <div className="flex flex-col items-center gap-4">
                            <Sparkles className="h-12 w-12 text-primary animate-spin" />
                            <p className="text-muted-foreground">Generating your image...</p>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={feature.demo.image || "/placeholder.svg"}
                          alt="Rapidly generated image"
                          width={600}
                          height={400}
                          className="w-full h-auto animate-in fade-in-50 zoom-in-95"
                        />
                      )}
                      <div className="bg-background p-4 border-t">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Lightning Fast Generation</p>
                          {!isGenerating && (
                            <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 animate-in fade-in-50">
                              {feature.demo.generationTime}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.demo.prompt}</p>
                      </div>
                    </div>
                  </div>
                ) : feature.id === "advanced-editing" ? (
                  <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in-50 slide-in-from-bottom-5">
                    <div className="bg-muted/50 rounded-xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <h4 className="font-medium mb-3">Advanced Editing Tools</h4>
                      <p className="text-sm text-muted-foreground mb-6">
                        Fine-tune your generated images with our professional-grade editing tools.
                      </p>
                      <div className="space-y-3 mb-6">
                        {feature.demo.tools.map((tool, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm animate-in fade-in-50 slide-in-from-left-5"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                              <Check className="h-4 w-4" />
                            </span>
                            {tool}
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full transition-all duration-300 hover:scale-105"
                        onClick={() => setShowEnhanced(!showEnhanced)}
                        variant={showEnhanced ? "outline" : "default"}
                      >
                        {showEnhanced ? "View Original" : "View Edited Version"}
                      </Button>
                    </div>
                    <div className="rounded-xl overflow-hidden border relative transition-all duration-500">
                      <Image
                        src={showEnhanced ? feature.demo.edited : feature.demo.original}
                        alt={showEnhanced ? "Edited image" : "Original image"}
                        width={600}
                        height={400}
                        className={`w-full h-auto transition-all duration-700 ${showEnhanced ? "scale-100" : "scale-100"}`}
                      />
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium border transition-all duration-300">
                        {showEnhanced ? "Edited" : "Original"}
                      </div>
                      <div className="bg-background p-4 border-t">
                        <p className="font-medium">{showEnhanced ? "After Editing" : "Before Editing"}</p>
                        <p className="text-sm text-muted-foreground">
                          {showEnhanced
                            ? "Enhanced with dramatic lighting and details"
                            : "Original generated image without edits"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <Button size="lg" className="group transition-all duration-300 hover:scale-105 hover:shadow-md" asChild>
            <a href="/auth/sign-up">
              Try It Yourself
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function Check(props) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
