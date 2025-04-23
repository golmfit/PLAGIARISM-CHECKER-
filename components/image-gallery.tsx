import Image from "next/image"

const galleryImages = [
  {
    src: "/neon-cityscape.png",
    alt: "Futuristic city with neon lights",
    prompt: "A futuristic cyberpunk city with neon lights and flying cars",
  },
  {
    src: "/dragon-citadel.png",
    alt: "Fantasy landscape with dragons",
    prompt: "A magical fantasy landscape with mountains, castles and dragons flying overhead",
  },
  {
    src: "/coral-mermaid-gathering.png",
    alt: "Underwater scene with mermaids",
    prompt: "Deep underwater scene with colorful coral reefs, exotic fish and mermaids",
  },
  {
    src: "/orbital-outpost.png",
    alt: "Space station orbiting planet",
    prompt: "A detailed space station orbiting a ringed planet with stars in the background",
  },
]

export default function ImageGallery() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center mb-16">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Gallery Showcase</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Explore the incredible images created with Visiomancer's AI technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {galleryImages.map((image, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg border">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <p className="text-white text-sm mb-2">Prompt:</p>
              <p className="text-white font-medium">{image.prompt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">Want to see what you can create?</p>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Try Visiomancer Now
        </button>
      </div>
    </section>
  )
}
