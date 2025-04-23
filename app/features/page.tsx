import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Wand2, Layers, Sparkles, Zap, Palette, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

// Feature data
const features = [
  {
    icon: Wand2,
    title: "Text-to-Image Generation",
    description:
      "Transform your text descriptions into stunning, detailed images with our advanced AI models. Simply describe what you want to see, and watch it come to life.",
  },
  {
    icon: Layers,
    title: "Style Customization",
    description:
      "Choose from dozens of artistic styles or create your own unique aesthetic for your generated images. From photorealistic to abstract, the choice is yours.",
  },
  {
    icon: Sparkles,
    title: "Image Enhancement",
    description:
      "Upscale, refine, and perfect your generated images with our AI enhancement tools. Fix imperfections and increase resolution with a single click.",
  },
  {
    icon: Zap,
    title: "Rapid Generation",
    description:
      "Create high-quality images in seconds, with lightning-fast processing even for complex prompts. No more waiting for your creative vision to materialize.",
  },
  {
    icon: Palette,
    title: "Advanced Editing Tools",
    description:
      "Fine-tune your creations with our suite of editing tools. Adjust colors, composition, lighting, and more to achieve exactly the look you want.",
  },
  {
    icon: Users,
    title: "Collaboration Features",
    description:
      "Share your projects with team members, collect feedback, and collaborate in real-time. Perfect for creative teams and agencies.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[800px] w-[800px] bg-pink-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container py-24">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Powerful Features</h1>
            <p className="text-muted-foreground text-lg">
              Discover all the tools you need to bring your imagination to life with our AI-powered image generation
              platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-3 rounded-lg w-fit mb-4 bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Technical Specifications */}
          <div className="bg-muted/30 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">AI Models</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>State-of-the-art diffusion models</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Regular updates with the latest AI advancements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Custom fine-tuned models for specific styles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Optimized for both speed and quality</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Output Options</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Multiple resolution options (512×512 to 1024×1792)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Various aspect ratios (square, portrait, landscape)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Export in multiple formats (PNG, JPG, WebP)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Transparent background options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience These Features?</h2>
            <p className="text-muted-foreground mb-8">
              Start creating stunning AI-generated images today with our powerful suite of tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/sign-up">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/gallery">View Gallery</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
