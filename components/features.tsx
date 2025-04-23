import { Wand2, Layers, Sparkles, Zap } from "lucide-react"

const features = [
  {
    name: "Text-to-Image Generation",
    description: "Transform your text descriptions into stunning, detailed images with our advanced AI models.",
    icon: Wand2,
  },
  {
    name: "Style Customization",
    description: "Choose from dozens of artistic styles or create your own unique aesthetic for your generated images.",
    icon: Layers,
  },
  {
    name: "Image Enhancement",
    description: "Upscale, refine, and perfect your generated images with our AI enhancement tools.",
    icon: Sparkles,
  },
  {
    name: "Rapid Generation",
    description: "Create high-quality images in seconds, with lightning-fast processing even for complex prompts.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Powerful Image Generation</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Discover how Visiomancer can transform your creative process with our innovative AI technology.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
