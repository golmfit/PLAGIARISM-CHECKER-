import { Wand2, Layers, Sparkles, Zap, Palette, Users } from "lucide-react"

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

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Powerful Features for Creative Minds</h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Discover all the tools you need to bring your imagination to life with our AI-powered image generation
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="mt-20 text-center">
          <div className="inline-block bg-muted/50 rounded-full px-6 py-2 mb-4">
            <span className="text-sm font-medium">Powered by advanced AI models</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your creative process?</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of artists, designers, and creators who are already using Visionfy to bring their ideas to
            life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Start Creating for Free
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
